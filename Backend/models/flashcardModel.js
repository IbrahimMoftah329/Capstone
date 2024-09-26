const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashcardSchema = new Schema ({
    prompt: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,  // assuming difficulty is on a scale, e.g., 1 to 5
        max: 5
    },
    set: {
        type: String,
        required: true,
    },
    questionBank: {
        type: [String],  // List of questions stored as an array of strings
        default: [],
    }, 
});

module.exports = mongoose.model('Flashcard', flashcardSchema)