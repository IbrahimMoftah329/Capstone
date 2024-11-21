// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can't favorite the same deck twice
favoriteSchema.index({ userId: 1, deckId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
