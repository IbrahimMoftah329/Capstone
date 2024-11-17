const express = require('express');
const router = express.Router();

const { 
    getQuizAttempts,
    getQuizAttemptResults, 
    saveQuizAttempt, 
    deleteQuizAttempt,
} = require('../Controllers/quizAttemptController');


// Route to GET all user attempts
router.get('/user/:userId/attempts', getQuizAttempts);

// Route to GET a single attempt by ID GOOD
router.get('/attempt/:attemptId', getQuizAttemptResults);

// Route to POST a new attempt to a user GOOD
router.post('/attempt', saveQuizAttempt);

// Route to DELETE a attempt
router.delete('/:attemptId', deleteQuizAttempt);

module.exports = router;