const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashcardSchema = new Schema ({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    deckId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Deck', 
        required: true
    }
}, { timestamps: true });

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
module.exports = Flashcard