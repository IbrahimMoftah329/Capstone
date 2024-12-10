const express = require('express');
const router = express.Router();

const {
    getAllQuizzes,
    getQuizzes,
    getQuiz,
    addQuizToUser,
    deleteQuiz,
    toggleFavQuiz,
    getFavQuizzes
    
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

// Route to toggle a quiz for favorited or not
router.post('/:userId/favQuiz', toggleFavQuiz);

// Route to get all favorited quizzes of a single user
router.get('/:userId/getFavQuizzes', getFavQuizzes);

module.exports = router;