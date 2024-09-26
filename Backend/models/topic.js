const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashcardSchema = require('./flashcard'); // Import the flashcard schema

const topicSchema = new Schema({
  topicName: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: Number, required: true },
  professor: { type: String, required: true },
  flashcards: [flashcardSchema] // Reference to the flashcard schema
});

module.exports = topicSchema;
