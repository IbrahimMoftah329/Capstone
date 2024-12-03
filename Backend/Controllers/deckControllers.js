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



// In your controller file
const toggleFavDeck = async (req, res) => { 
    console.log('Toggle Favorite Deck - Backend Route Hit');
    console.log('Request Parameters:', req.params);
    console.log('Request Body:', req.body);

    try { 
        const { userId } = req.params; // Extract userId from params
        const { deckId } = req.body; 

    
        // Find the user based on the userId sent from the frontend 
        const user = await User.findOrCreateUserByClerkId(userId); 

        if (!user) { 
            console.warn('User not found for ID:', userId);
            return res.status(404).json({ message: 'User not found' }); 
        } 

        if (!user.favoriteDecks.includes(deckId)) { 
            user.favoriteDecks.push(deckId);
            await user.save(); 
            console.log('Deck added to favorites');
            // return res.status(200).json({ message: 'Deck added to favorites', favoriteDecks: user.favoriteDecks }); 
            return res.status(200).json({ message: 'Deck added to favorites' }); 
        } else if (user.favoriteDecks.includes(deckId)) { 
            console.log('Deck already in favorites, attempting to remove it');
            
            // user.favoriteDecks.push(user.favoriteDecks.filter(favDeck => favDeck !== deckId)); 
            // user.favoriteDecks.push(...user.favoriteDecks.filter(favDeck => favDeck !== deckId));
            const index = user.favoriteDecks.indexOf(deckId);
            if (index !== -1) {
              user.favoriteDecks.splice(index, 1); // Removes the element at the found index
            }


            
            await user.save(); 
            console.log('Deck removed from favorites');
            return res.status(200).json({ message: 'Deck removed from favorites', favoriteDecks: user.favoriteDecks }); 
          // return res.status(400).json({ message: 'Deck is already in your favorites' }); 
        } 

        
        // else if (action === 'remove') { 
        //     // Remove the deckId from the favoriteDecks array if it exists 
            // if (user.favoriteDecks.includes(deckId)) { 
            //     user.favoriteDecks = user.favoriteDecks.filter(favDeck => favDeck !== deckId); 
            //     await user.save(); 
            //     console.log('Deck removed from favorites');
            //     return res.status(200).json({ message: 'Deck removed from favorites', favoriteDecks: user.favoriteDecks }); 
        //     } else { 
        //         console.log('Deck not in favorites');
        //         return res.status(400).json({ message: 'Deck is not in your favorites' }); 
        //     } 
        // } 
        
        // else { 
        //     console.warn('Invalid action');
        //     return res.status(400).json({ message: 'Invalid action' }); 
        // } 
    } catch (error) { 
        console.error('Error toggling favorite status:', error); 
        res.status(500).json({ message: 'Error toggling favorite status', error: error.message }); 
    } 
};



const toggleFavQuiz = async (req, res) => {
  try {
    const updatedDeck = await Deck.findByIdAndUpdate(deckId, req.body, { new: true });
    if (!updatedDeck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.status(200).json(updatedDeck);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
  getAllDecks,
  addDeckToUser,
  getDecks,
  getDeck,
  deleteDeck,
  updateDeck,
  toggleFavDeck,
  toggleFavQuiz
}