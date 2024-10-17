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

// create a new user
const createDeck = async (req, res) => {
    const {topicName, semester, year, professor, description,} = req.body

    try{
        const deck = await Deck.create({topicName, semester, year, professor, description})

        res.status(200).json(deck)

    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a user
const deleteDeck = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid object ID"})
    }

    const deck = await Deck.findOneAndDelete({_id: id})

    if(!deck){
        res.status(404).json({error: "no such deck exists"})
    }

    res.status(200).json(deck)
}

// update a user
const updateDeck = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid object ID"})
    }

    const deck = await Deck.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!deck){
        res.status(404).json({error: "no such user exists"})
    }

    res.status(200).json(deck)
}


module.exports = {
    createDeck,
    getDecks,
    getDeck,
    deleteDeck,
    updateDeck
}