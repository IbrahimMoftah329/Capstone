const express = require('express');
const router = express.Router();

const {
    addOrUpdateUserAttempt,
    getUserLastAttempts,
} = require('../Controllers/leaderboardControllers');

// Route to POST or UPDATE a leaderboard entry for a user's attempt on a specific deck
router.post('/user/:userId/deck/:deckId/attempt', addOrUpdateUserAttempt);

// Route to GET all attempts for a specific user on a specific deck
router.get('/user/:userId/deck/:deckId/attempts', getUserLastAttempts);

module.exports = router;
