const express = require('express');
const router = express.Router();

const { 
    getQuestionsByQuizId 

} = require('../controllers/questionController');

// Route to GET questions for a specific quiz
router.get('/quiz/:quizId/questions', getQuestionsByQuizId);

module.exports = router;