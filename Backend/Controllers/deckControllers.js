const Deck = require('../models/deck')
const Flashcard = require('../models/flashcard');
const User = require('../models/user')
const Quiz = require('../models/quiz')

const mongoose = require('mongoose')

// Get all decks from all users
const getAllDecks = async (req, res) => {
  try {
    // Fetch all decks from the database
    const decks = await Deck.find()   // This will display all decks, and the unique object id given to each flashcard within that deck
    
    // The line below can be used instead of the line above this one if you would like the populate flashcards,
    // meaning "http://localhost:4000/api/decks/alldecks" will show the contents for each flashcard within each deck
    // const decks = await Deck.find().populate('flashcards'); // Optionally populate flashcards if needed
    
    res.status(200).json(decks);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Get all decks for a user
const getDecks = async (req, res) => {
  try {
    const user = await User.findOrCreateUserByClerkId(req.params.userId);
    const populatedUser = await User.findOne({ clerkId: user.clerkId }).populate('decks');

    res.json(populatedUser.decks);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Get a single deck by ID, including associated flashcards
const getDeck = async (req, res) => {
  const { deckId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return res.status(404).json({ error: "Invalid deck ID" });
  }

  try {
    const deck = await Deck.findById(deckId).populate('flashcards');
    if (!deck) {
      return res.status(404).json({ error: "No such deck exists" });
    }

    res.status(200).json(deck);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addDeckToUser = async (req, res) => {
  try {
    const user = await User.findOrCreateUserByClerkId(req.params.userId);
    const newDeck = new Deck({ ...req.body, clerkId: req.params.userId, university: user.university, });
    const savedDeck = await newDeck.save();

    user.decks.push(savedDeck._id);
    await user.save();

    res.json(savedDeck);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    // Step 1: Find the deck to verify it exists and get the user
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Step 2: Delete all flashcards associated with this deck
    const flashcardDeletionResult = await Flashcard.deleteMany({ deckId });

    // Step 3: Delete the deck itself
    const deletedDeck = await Deck.findByIdAndDelete(deckId);

    // Step 4: Remove the deck reference from the user's deck list
    await User.findOneAndUpdate(
      { clerkId: deck.clerkId }, // Find the user by clerkId
      { $pull: { decks: deck._id } } // Remove the deck ID from the user's decks array
    );

    // Step 5: Remove the deckId from all users' favoriteDecks
    await User.updateMany(
      { favoriteDecks: deckId }, // Find all users who have the deckId in their favoriteDecks
      { $pull: { favoriteDecks: deckId } } // Remove the deckId from their favoriteDecks array
    );
    
    res.status(200).json({ message: 'Deck and associated flashcards deleted successfully, deck also removed from favorites of all users.', deck: deletedDeck });
  } catch (err) {
    console.error("Error in deleteDeck:", err);
    res.status(500).send(err.message);
  }
};


const updateDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    // Step 1: Update the deck and confirm it exists
    const updatedDeck = await Deck.findByIdAndUpdate(deckId, req.body, { new: true });
    if (!updatedDeck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    // console.log('Deck updated:', updatedDeck);

    // Step 2: Check which fields were updated
    const updatedFields = {};
    if (req.body.professor) updatedFields.professor = req.body.professor;
    if (req.body.semester) updatedFields.semester = req.body.semester;
    if (req.body.university) updatedFields.university = req.body.university;
    if (req.body.name) updatedFields.deckName = req.body.name;
    // console.log('Updated fields for quizzes:', updatedFields);

    // Step 3: If any relevant fields were updated, propagate changes to quizzes
    if (Object.keys(updatedFields).length > 0) {
      const quizzesUpdateResult = await Quiz.updateMany(
        { deckId: deckId }, 
        { $set: updatedFields }
      );
      // console.log('Quizzes update result:', quizzesUpdateResult);
    } else {
      console.log('No relevant fields updated for quizzes.');
    }

    res.status(200).json(updatedDeck);
  } catch (err) {
    console.error('Error in updateDeck:', err);
    res.status(500).send(err.message);
  }
}

// Backend function that will be called at the specified url, which will add/remove a deck id from the corresponding user array
const toggleFavDeck = async (req, res) => { 
    // console.log('Toggle Favorite Deck - Backend Route Hit');
    // console.log('Request Parameters:', req.params);
    // console.log('Request Body:', req.body);

    try { 
      const { userId } = req.params; // Extract userId from params
      const { deckId } = req.body; 

      // Find the user based on the userId sent from the frontend 
      const user = await User.findOrCreateUserByClerkId(userId); 

      if (!user) { 
        console.warn('User not found for ID:', userId);
        return res.status(404).json({ message: 'User not found' }); 
      } 

      // This if statement checks if the deckId is within the favoriteDecks array for a user, if not, add it
      if (!user.favoriteDecks.includes(deckId)) { 
        user.favoriteDecks.push(deckId);
        
        await user.save(); 
        return res.status(200).json({ message: 'Deck added to favorites' }); 
      } else if (user.favoriteDecks.includes(deckId)) {
        // The next three lines use .splice() the modify the array and remove the deckId that is already within the favoriteDecks array
        const index = user.favoriteDecks.indexOf(deckId);
        if (index !== -1) {
          user.favoriteDecks.splice(index, 1); // Removes the element at the found index
        }
        
        await user.save();
        return res.status(200).json({ message: 'Deck removed from favorites' }); 
      } else { 
          // If unable to add or remove, there's something else wrong, idk what it could be
          console.warn('Invalid action');
          return res.status(400).json({ message: 'Invalid action' }); 
      } 
    } catch (error) { 
        res.status(500).json({ message: 'Error toggling favorite status', error: error.message }); 
    } 
};


// Get all favorited decks by a single user
const getFavDecks = async (req, res) => {
  try {
    // Extract the userId from the URL params
    const { userId } = req.params;
    
    // Find the user by userId
    const user = await User.findOrCreateUserByClerkId(userId);
    
    if (!user) {
      console.log('no user was found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the favoriteDecks array exists or not, and if the array is empty
    if (!user.favoriteDecks || user.favoriteDecks.length === 0) {
        console.log("There is no favorite decks array.");
        return res.status(200).json({ message: 'No favorite decks found for this user.' });
    }

    res.status(200).json(user.favoriteDecks);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllDecks,
  getAllDecks,
  addDeckToUser,
  getDecks,
  getDeck,
  deleteDeck,
  updateDeck,
  toggleFavDeck,
  getFavDecks
}