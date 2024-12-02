const Deck = require('../models/deck')
const User = require('../models/user')

const mongoose = require('mongoose')


// Get all favorited decks for a user
const getDecks = async (req, res) => {
  try {
    const user = await User.findOrCreateUserByClerkId(req.params.userId);
    const populatedUser = await User.findOne({ clerkId: user.clerkId }).populate('favoriteDecks');

    res.json(populatedUser.favoriteDecks);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Get all favorited decks for all users
const getAllDecks = async (req, res) => {
  try {
    const user = await User.find({}).sort({createdAt: -1})

    res.status(200).json(user.favoriteDecks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// Used to add a deck._id to the user's favoriteDecks array
const addFavDeckToUser = async (req, res) => {
  try {
    // Step 1: Find the user by their userId
    const user = await User.findOrCreateUserByClerkId(req.params.userId);
    const deckToAdd = req.body.deckId;
    
    // Check if the deck is already in favorites to prevent duplicates
    if (!user.favoriteDecks.includes(deckToAdd)) {
      // Step 2: Add the deck._id to the user's favoriteDecks array
      user.favoriteDecks.push(deckToAdd);

      // Step 3: Save the updated user document
      await user.save();
    }

    // Step 4: Send the response with a success message
    res.json({ message: 'Deck added to favorites', user });
  } catch (err) {
    // If an error occurs, send a 500 status with the error message
    console.error(err);
    res.status(500).send(err.message);
  }
};

// Used to add an object id to the users favorited quizzes array
const addFavQuizToUser = async (req, res) => {
  try {
    const user = await User.findOrCreateUserByClerkId(req.params.userId);
    const newDeck = new Deck({ ...req.body, clerkId: req.params.userId });
    const savedDeck = await newDeck.save();

    user.favoritedDecks.push(savedDeck._id);
    await user.save();

    res.json(savedDeck);
  } catch (err) {
    res.status(500).send(err.message);
  }
};




// Used to remove an object id from the users favorited decks array
const deleteFavDeck = async (req, res) => {
  try {
    console.log('Hello')
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Used to remove an object id from the users favorited quizzes array
const deleteFavQuiz = async (req, res) => {
  try {
    console.log('Hello')
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
  addFavDeckToUser,
  addFavQuizToUser,
  deleteFavDeck,
  getDecks,
  deleteFavQuiz,
  getAllDecks
}