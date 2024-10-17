const Deck = require('../models/deck')
const User = require('../models/user')

const mongoose = require('mongoose')


// get all decks for a user
const getDecks = async(req, res) => {

    try {
        const user = await User.findById(req.params.userId).populate('decks');
        res.json(user.decks);
      } catch (err) {
        res.status(500).send(err.message);
      }
}

// get a single Deck
/**
const getDeck = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid object ID"})
    }

    const deck = await Deck.findById(id)

    if(!deck){
        res.status(404).json({error: "no such deck exists"})
    }

    res.status(200).json(deck)
}
*/ 


// create a new user
const addDeckToUser = async (req, res) => {
    try {
        const newDeck = new Deck({ ...req.body, userId: req.params.userId });
        const savedDeck = await newDeck.save();

        await User.findByIdAndUpdate(req.params.userId, { $push: { decks: savedDeck._id } });
        res.json(savedDeck);
  } catch (err) {
    res.status(500).send(err.message);
  }
  
}

// delete a user
const deleteDeck = async(req, res) => {
    const { deckId } = req.params;

    try {
      const deletedDeck = await Deck.findByIdAndDelete(deckId);
      if (!deletedDeck) {
        return res.status(404).json({ error: 'Deck not found' });
      }
  
      await User.findByIdAndUpdate(deletedDeck.userId, { $pull: { decks: deckId } });
      res.status(200).json({ message: 'Deck deleted successfully', deck: deletedDeck });
    } catch (err) {
      res.status(500).send(err.message);
    }
}

// update a user
const updateDeck = async(req, res) => {
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
    addDeckToUser,
    getDecks,
    //getDeck,
    deleteDeck,
    updateDeck
}