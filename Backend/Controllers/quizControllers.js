const Deck = require('../models/deck')
const User = require('../models/user')
const Question = require('../models/question');
const Quiz = require('../models/quiz')
const { generateQuestionFromFlashcard } = require('../utils/openaiHelpers');

const mongoose = require('mongoose')


// Get all quizzes for a user
const getQuizzes = async (req, res) => {
    try {
        // Find the user by their clerkId and populate only the quizzes array with selected fields
        const user = await User.findOne({ clerkId: req.params.userId }).populate({
            path: 'quizzes',
            select: 'name description createdAt deckId questions',
            populate: {
                path: 'deckId',
                select: 'name' // Only get the deck name
            }
        });
    
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Format the quizzes data to include deck name, quiz ID, and number of questions
        const quizzes = user.quizzes.map(quiz => ({
            _id: quiz._id,                           // Include the quiz ID
            name: quiz.name,
            description: quiz.description,
            deckId: quiz.deckId._id,        // Include the deck ID if it exists
            numQuestions: quiz.questions.length, // Include the number of questions
            createdAt: quiz.createdAt
        }));
    
        // Return the formatted quizzes
        res.json(quizzes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


const addQuizToUser = async (req, res) => {
    const { userId } = req.params;
    const { deckId, name, description, semester, professor } = req.body;
  
    console.log("Request body:", req.body);
  
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
    
        // Step 3: Delete the quiz itself
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    
        // Step 4: Remove the quiz reference from the user's quiz list
        await User.findOneAndUpdate(
            { clerkId: quiz.createdBy }, // Find the user by clerkId (assuming createdBy holds clerkId)
            { $pull: { quizzes: quiz._id } } // Remove the quiz ID from the user's quizzes array
        );
    
        res.status(200).json({
            message: 'Quiz and associated questions deleted successfully',
            quiz: deletedQuiz,
            questionsDeleted: questionDeletionResult.deletedCount
        });
    } catch (err) {
        console.error("Error in deleteQuiz:", err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    addQuizToUser,
    getQuizzes,
    deleteQuiz
}