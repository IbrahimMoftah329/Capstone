const express = require('express');
const router = express.Router();

const { 
    addFlashcardToDeck, 
    getFlashcard, 
    updateFlashcard, 
    deleteFlashcard,
    getAllFlashcardsInDeck
} = require('../Controllers/flashcardControllers');


// Route to add a new flashcard to a deck
router.post('/deck/:deckId/flashcard', addFlashcardToDeck);

// Route to get a flashcard by ID
router.get('/:flashcardId', getFlashcard);

// Route to get all flashcards in a deck
router.get('/deck/:deckId/flashcards', getAllFlashcardsInDeck);

// Route to update a flashcard by ID
router.patch('/:flashcardId', updateFlashcard);

// Route to delete a flashcard by ID
router.delete('/:flashcardId', deleteFlashcard);

module.exports = router;