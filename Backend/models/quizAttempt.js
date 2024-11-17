const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizAttemptSchema = new Schema({
    quizId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Quiz', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    quizName: {
        type: String,
        required: false
    },
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
            userAnswer: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ],
    score: { 
        type: Number, 
        required: true 
    },
}, { timestamps: true });

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
module.exports = QuizAttempt;
