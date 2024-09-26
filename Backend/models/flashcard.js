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
});

 module.exports = flashcardSchema