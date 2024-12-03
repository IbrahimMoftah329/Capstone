const express = require('express');
const router = express.Router();

const {
    
    getDecks
    
} = require('../Controllers/favoriteControllers')


// Route to get all favorited decks of a single user
router.get('/:userId/favoriteDecks', getDecks);

module.exports = router;