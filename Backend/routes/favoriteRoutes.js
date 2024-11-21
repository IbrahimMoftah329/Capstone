// routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// Toggle favorite status
router.post('/toggle', favoriteController.toggleFavorite);

// Get all favorites for a user
router.get('/user/:userId', favoriteController.getFavorites);

// Check if a deck is favorited by a user
router.get('/check/:userId/:deckId', favoriteController.checkFavoriteStatus);

module.exports = router;