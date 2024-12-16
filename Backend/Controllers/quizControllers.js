const Deck = require('../models/deck')
const User = require('../models/user')
const Question = require('../models/Question');
const Quiz = require('../models/quiz')
const QuizAttempt = require('../models/quizAttempt');
const { generateQuestionFromFlashcard } = require('../utils/openaiHelpers');


// Get all quizzes from all users in quizcontrollers.js
const getAllQuizzes = async (req, res) => {    
    try {
        // const quizzes = await Quiz.find().populate('questions');
        const quizzes = await Quiz.find()
        res.status(200).json(quizzes)
    } catch (err) {
        res.status(500).send(err.message);
      }
};


// Get all quizzes for a user
const getQuizzes = async (req, res) => {
    try {
        // Find the user by their clerkId and populate only the quizzes array with selected fields
        const user = await User.findOne({ clerkId: req.params.userId }).populate({
            path: 'quizzes',
            select: 'name description semester professor deckId deckName questions createdAt',
            populate: {
                path: 'deckId',
                select: 'name', // Only get the deck name
                options: { strictPopulate: false } // Avoid errors if deckId is missing
            }
        });
    
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Format the quizzes data to include deck name, quiz ID, and other specified fields
        const quizzes = user.quizzes.map(quiz => ({
            _id: quiz._id,                           // Include the quiz ID
            name: quiz.name,
            description: quiz.description,
            semester: quiz.semester,
            professor: quiz.professor,
            university: quiz.university,
            // deckId: quiz.deckId._id,                 // Include the deck ID if it exists
            // deckName: quiz.deckId.name,              // Include deck name from populated data
            deckId: quiz.deckId ? quiz.deckId._id : 'N/A',  // If there is no deckId, it will default to 'N/A'
            deckName: quiz.deckId && quiz.deckId.name ? quiz.deckId.name : 'N/A',   // If there is no deckId or deckName, it will default to 'N/A'
            createdAt: quiz.createdAt,
            numQuestions: quiz.questions.length, // Include the number of questions
        }));
    
        // Return the formatted quizzes
        res.json(quizzes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single quiz by ID, optionally excluding the population of questions
const getQuiz = async (req, res) => {
    const { quizId } = req.params;

    try {
        // The line below can be used to populate the questions for a quiz as well
        // const quiz = await Quiz.findById(quizId).populate('questions');
        
        const quiz = await Quiz.findById(quizId);
        
        // If quiz is not found, return a 404 error
        if (!quiz) {
            return res.status(404).json({ error: "No such quiz exists" });
        }

        res.status(200).json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
};

const addQuizToUser = async (req, res) => {
    const { userId } = req.params;
    const { deckId, name, description, semester, professor, university, deckName } = req.body;
    
    try {
        if (!name || !description || !deckId) {
            return res.status(400).json({ error: 'Missing required fields: name, description, or deckId' });
        }
    
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        const deck = await Deck.findById(deckId).populate('flashcards');
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
    
        const quiz = new Quiz({
            name,
            description,
            deckId,
            semester,
            professor,
            university,
            deckName,
            createdBy: user.clerkId,
            questions: [],
        });
    
        await quiz.save();
    
        const questionIds = [];
  
        // Pass `quiz._id` to `generateQuestionFromFlashcard`
        for (const flashcard of deck.flashcards) {
            const question = await generateQuestionFromFlashcard(flashcard, quiz._id);
            if (question) {
                questionIds.push(question._id);
            }
        }
  
        quiz.questions = questionIds;
        await quiz.save();
    
        user.quizzes.push(quiz._id);
        await user.save();
    
        res.status(201).json({ message: 'Quiz created and added to user successfully', quiz });
    } catch (error) {
        console.error('Error in addQuizToUser:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
  
    try {
        // Step 1: Find the quiz to verify it exists and get the user
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
    
        // Step 2: Delete all questions associated with this quiz
        const questionDeletionResult = await Question.deleteMany({ quizId: quiz._id });

        // Step 3: Delete all quiz attempts associated with this quiz
        const attemptDeletionResult = await QuizAttempt.deleteMany({ quizId: quiz._id });

        // Step 4: Delete the quiz itself
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    
        // Step 5: Remove the quiz reference from the user's quiz list
        await User.findOneAndUpdate(
            { clerkId: quiz.createdBy }, // Find the user by clerkId (assuming createdBy holds clerkId)
            { $pull: { quizzes: quiz._id } } // Remove the quiz ID from the user's quizzes array
        );

        // Step 5: Remove the deckId from all users' favoriteQuizzes
        await User.updateMany(
            { favoriteQuizzes: quizId }, // Find all users who have the deckId in their favoriteDecks
            { $pull: { favoriteQuizzes: quizId } } // Remove the deckId from their favoriteDecks array
        );
    
        res.status(200).json({
            message: 'Quiz, associated questions, and attempts deleted successfully',
            quiz: deletedQuiz,
            questionsDeleted: questionDeletionResult.deletedCount,
            attemptsDeleted: attemptDeletionResult.deletedCount,
        });
    } catch (err) {
        console.error("Error in deleteQuiz:", err);
        res.status(500).send(err.message);
    }
};


// Backend function that will be called at the specified url, which will add/remove a quiz id from the corresponding user array
const toggleFavQuiz = async (req, res) => { 
    // console.log('Toggle Favorite Quiz - Backend Route Hit');
    // console.log('Request Parameters:', req.params);
    // console.log('Request Body:', req.body);

    try { 
        const { userId } = req.params;
        const { quizId } = req.body; 

        // Find the user based on the userId sent from the frontend 
        const user = await User.findOrCreateUserByClerkId(userId); 

        if (!user) { 
          console.warn('User not found for ID:', userId);
          return res.status(404).json({ message: 'User not found' }); 
        } 

        // This if statement checks if the quizId is within the favoriteQuizzes array for a user, if not, add it
        if (!user.favoriteQuizzes.includes(quizId)) { 
            user.favoriteQuizzes.push(quizId);
            
            await user.save(); 
            return res.status(200).json({ message: 'Quiz added to favorites' }); 
            
        } else if (user.favoriteQuizzes.includes(quizId)) {

            // The next three lines use .splice() the modify the array and remove the quizId that is already within the favoriteQuizzes array
            const index = user.favoriteQuizzes.indexOf(quizId);
            if (index !== -1) {
              user.favoriteQuizzes.splice(index, 1); // Removes the element at the found index
            }
            await user.save();
            return res.status(200).json({ message: 'Quiz removed from favorites' }); 

        } else { 
            // If unable to add or remove, there's something else wrong, idk what it could be
            console.warn('Invalid action');
            return res.status(400).json({ message: 'Invalid action' }); 
        } 
    } catch (error) { 
        res.status(500).json({ message: 'Error toggling favorite status', error: error.message }); 
    } 
};


// Get all favorited quizzes by a single user
const getFavQuizzes = async (req, res) => {
    try {
      // Extract the userId from the URL params
      const { userId } = req.params;
      
      // Find the user by userId
      const user = await User.findOrCreateUserByClerkId(userId);
      
      if (!user) {
        console.log('no user was found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the favoriteQuizzes array exists or not, and if the array is empty
      if (!user.favoriteQuizzes || user.favoriteQuizzes.length === 0) {
          console.log("There is no favorite quizzes array.");
          return res.status(200).json({ message: 'No favorite quizzes found for this user.' });
      }
  
      res.status(200).json(user.favoriteQuizzes);
    } catch (err) {
      // Handle any errors that occur during the database operation
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };


module.exports = {
    getAllQuizzes,
    addQuizToUser,
    getQuizzes,
    getQuiz,
    deleteQuiz,
    toggleFavQuiz,
    getFavQuizzes
};