const express = require('express');
const router = express.Router();

const {
    getDecks,
    addDeckToUser,
    deleteDeck,
    updateDeck
    
} = require('../Controllers/deckControllers')




// Route to GET all user decks
router.get('/user/:userId/decks', getDecks);

// Route to POST a new deck to a user
router.post('/user/:userId/deck', addDeckToUser);

// Route to DELETE a topic
router.delete('/:deckId', deleteDeck);

// Route to UPDATE a topic
router.patch('/:deckId', updateDeck);

module.exports = router;
