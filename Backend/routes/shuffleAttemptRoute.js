const express = require('express');
const router = express.Router();
const {
    addShuffleAttempt,
    getUserShuffleAttempts,
    deleteShuffleAttempt,
    getShuffleAttemptById,
    getUserDeckShuffleAttempts
} = require('../Controllers/shuffleAttemptsController');

// Add a new shuffle attempt
router.post('/', addShuffleAttempt);

// Get all shuffle attempts for a user
router.get('/user/:userId', getUserShuffleAttempts);

// Delete a shuffle attempt by ID
router.delete('/:attemptId', deleteShuffleAttempt);

// Get a shuffle attempt by ID
router.get('/:attemptId', getShuffleAttemptById);

// Route to get all shuffle attempts for a specific deck by a user
router.get('/user/:userId/deck/:deckId', getUserDeckShuffleAttempts);

module.exports = router;
