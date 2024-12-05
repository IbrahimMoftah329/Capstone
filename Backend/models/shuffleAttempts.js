const mongoose = require('mongoose');

const shuffleAttemptSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' },
    deckId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Deck' },
    deckName: { type: String, required: true },
    timeElapsed: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('shuffleAttempt', shuffleAttemptSchema);
