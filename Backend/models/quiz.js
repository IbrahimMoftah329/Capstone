const mongoose = require('mongoose')

const Schema = mongoose.Schema

const quizSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    semester: {
        type: String,
        required: false
    },
    professor: {
        type: String,
        required: false
    },
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',  // Reference to the Deck model
        required: true
    },
    createdBy: {
        type: String,
        ref: 'User', // Reference to the User model
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question' // Reference to the Question model, if using separate question documents
    }],
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;