const express = require('express');
const router = express.Router();

const {
    getAllQuizzes,
    getQuizzes,
    getQuiz,
    addQuizToUser,
    deleteQuiz,
    
} = require('../Controllers/quizControllers')

// Route to GET all quizzes from all users
router.get('/allquizzes', getAllQuizzes)

// Route to GET all user quizs
router.get('/user/:userId/quizzes', getQuizzes);

// Route to GET a single quiz by ID
router.get('/:quizId', getQuiz);

// Route to POST a new quiz to a user
router.post('/user/:userId/quiz', addQuizToUser);

// Route to DELETE a quiz
router.delete('/:quizId', deleteQuiz);

module.exports = router;