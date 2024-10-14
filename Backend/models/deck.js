const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashcardSchema = require('./flashcard').schema; // Import the flashcard schema
const User = require('./user').schema
//import User from './user.js';

const deckSchema = new Schema({
  topicName: { 
    type: String, 
    required: true 
},
  semester: { 
    type: String, 
    required: false 
},
  year: { 
    type: Number, 
    required: false 
},
  professor: { 
    type: String, 
    required: false 
},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
  flashcards: [flashcardSchema] // Reference to the flashcard schema
});

const Deck = mongoose.model('deck', deckSchema);
module.exports = Deck;
