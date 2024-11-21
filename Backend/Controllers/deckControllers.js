const Deck = require('../models/deck')
const Flashcard = require('../models/flashcard');
const User = require('../models/user')

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
    const newDeck = new Deck({ ...req.body, clerkId: req.params.userId });
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
    
    res.status(200).json({ message: 'Deck and associated flashcards deleted successfully', deck: deletedDeck });
  } catch (err) {
    console.error("Error in deleteDeck:", err);
    res.status(500).send(err.message);
  }
};


const updateDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    const updatedDeck = await Deck.findByIdAndUpdate(deckId, req.body, { new: true });
    if (!updatedDeck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.status(200).json(updatedDeck);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


module.exports = {
  getAllDecks,
  addDeckToUser,
  getDecks,
  getDeck,
  deleteDeck,
  updateDeck
}