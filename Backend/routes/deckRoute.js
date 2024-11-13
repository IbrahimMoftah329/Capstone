const express = require('express');
const router = express.Router();

const {
    getAllDecks,
    getDecks,
    getDeck,
    addDeckToUser,
    deleteDeck,
    updateDeck
    
} = require('../Controllers/deckControllers')


// Route to GET all decks from all users
router.get('/alldecks', getAllDecks);

// Route to GET all user decks
router.get('/user/:userId/decks', getDecks);

// Route to GET a single deck by ID
router.get('/:deckId', getDeck);

// Route to POST a new deck to a user
router.post('/user/:userId/deck', addDeckToUser);

// Route to DELETE a deck
router.delete('/:deckId', deleteDeck);

// Route to UPDATE a deck
router.patch('/:deckId', updateDeck);

module.exports = router;