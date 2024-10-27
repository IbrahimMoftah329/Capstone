const mongoose = require('mongoose')

const Schema = mongoose.Schema


const deckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  clerkId: {
    type: String,
    required: true,
    ref: 'User'
  },
  semester: {
    type: String,
    required: false
  },
  professor: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  flashcards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard'
  }] // Reference to the flashcard schema
}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;