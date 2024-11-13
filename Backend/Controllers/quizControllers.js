const Deck = require('../models/deck')
const User = require('../models/user')
const Question = require('../models/question');
const Quiz = require('../models/quiz')
const QuizAttempt = require('../models/quizAttempt');
const { generateQuestionFromFlashcard } = require('../utils/openaiHelpers');


// Get all quizzes from all users in quizcontrollers.js
const getAllQuizzes = async (req, res) => {    
    try {
        const quizzes = await Quiz.find().populate('questions');
        // const quizzes = await Quiz.find()
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
                select: 'name' // Only get the deck name
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
            deckId: quiz.deckId._id,                 // Include the deck ID if it exists
            deckName: quiz.deckId.name,              // Include deck name from populated data
            createdAt: quiz.createdAt,
            numQuestions: quiz.questions.length, // Include the number of questions
        }));
    
        // Return the formatted quizzes
        res.json(quizzes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single quiz by ID, including associated questions
const getQuiz = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await quiz.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ error: "No such quiz exists" });
        }

        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addQuizToUser = async (req, res) => {
    const { userId } = req.params;
    const { deckId, name, description, semester, professor, deckName } = req.body;
    
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
    
        res.status(200).json({
            message: 'Quiz, associated questions, and attempts deleted successfully',
            quiz: deletedQuiz,
            questionsDeleted: questionDeletionResult.deletedCount,
            attemptsDeleted: attemptDeletionResult.deletedCount
        });
    } catch (err) {
        console.error("Error in deleteQuiz:", err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllQuizzes,
    addQuizToUser,
    getQuizzes,
    getQuiz,
    deleteQuiz
};