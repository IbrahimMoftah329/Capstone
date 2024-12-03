const Deck = require('../models/deck')
const User = require('../models/user')

const mongoose = require('mongoose')


// Get all favorited decks by a single user
const getDecks = async (req, res) => {
  try {
    // Extract the userId from the URL params
    const { userId } = req.params;
    
    // Find the user by userId
    console.log('trying to find the user and populate the favorite decks array');
    // const user = await User.findOrCreateUserByClerkId(userId).populate('favoriteDecks'); // Populate the favoriteDecks field
    const user = await User.findOrCreateUserByClerkId(userId);
    const populatedUser = await User.findOne({ clerkId: userId }).populate('decks');
    
    if (!user) {
      console.log('no user was found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the favoriteDecks array exists or not
    if (!user.favoriteDecks || user.favoriteDecks.length === 0) {
        console.log("There is no favorite decks array.");
        return res.status(200).json({ message: 'No favorite decks found for this user.' });
    }

    // Return the populated favoriteDecks array
    res.status(200).json(user.favoriteDecks);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};





module.exports = {
  getDecks
}