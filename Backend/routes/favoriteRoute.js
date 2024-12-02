const express = require('express');
const router = express.Router();

const {
    addFavDeckToUser,
    addFavQuizToUser,
    deleteFavDeck,
    deleteFavQuiz,
    getDecks,
    getAllDecks
    
} = require('../Controllers/favoriteControllers')

// Route to get all favorited decks of all users
router.get('/allfavdecks', getAllDecks);

// Route to get all favorited decks of a single user
router.get('/:userId/favoriteDecks', getDecks);

// Route to POST a new favorite deck to a user
router.post('/:userId/addDeck', addFavDeckToUser);

// Route to POST a new favorite deck to a user
router.post('/:userId/quiz', addFavQuizToUser);

// Route to DELETE a favorited deck
router.delete('/:deckId', deleteFavDeck);

// Route to DELETE a favorited quiz
router.delete('/:quizId', deleteFavQuiz);

module.exports = router;