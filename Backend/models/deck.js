const mongoose = require('mongoose')

const Schema = mongoose.Schema


const deckSchema = new Schema({
  Title: { 
    type: String, 
    required: true 
},
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
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
  description: {
  type: String,
  required: false
},
  flashcards: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Flashcard' }] // Reference to the flashcard schema
}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
