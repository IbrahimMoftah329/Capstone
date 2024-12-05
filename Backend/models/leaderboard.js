const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User', // Reference to the user (via Clerk ID)
    },
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck', // Reference to the Deck model
        required: true,
    },
    deckName: {
        type: String,
        required: true, // Store the deck name directly for quick access
    },
    timeElapsed: {
        type: Number,
        required: true, // Time taken to complete the deck, in seconds
    },
    timestamp: {
        type: Date,
        default: Date.now, // When this record was created
    },
});

// Create an index for faster queries by userId and timeElapsed
leaderboardSchema.index({ userId: 1, timeElapsed: 1 });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
