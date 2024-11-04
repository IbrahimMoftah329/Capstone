const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',  // Reference to the Quiz model
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    options: [
        {
            text: { type: String, required: true }, // Option text
            isCorrect: { type: Boolean, default: false } // Marks the correct answer
        }
    ],
    explanation: {
        type: String,
        required: false // Optional explanation for the answer
    },
}, { timestamps: true });

// Ensure only one option is marked as correct
questionSchema.pre('save', function (next) {
    const correctAnswers = this.options.filter(option => option.isCorrect).length;
    if (correctAnswers !== 1) {
        return next(new Error("There must be exactly one correct answer."));
    }
    next();
});

// Check if the model is already compiled to prevent OverwriteModelError
module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);
