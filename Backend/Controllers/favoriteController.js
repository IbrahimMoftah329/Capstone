// controllers/favoriteController.js
const Favorite = require('../models/Favorite');
const Deck = require('../models/deck');

exports.toggleFavorite = async (req, res) => {
  try {
    const { userId, deckId } = req.body;

    // Check if the deck exists
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    // Check if favorite already exists
    const existingFavorite = await Favorite.findOne({ userId, deckId });

    if (existingFavorite) {
      // Remove favorite if it exists
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.json({ message: 'Favorite removed', isFavorited: false });
    } else {
      // Add new favorite
      const favorite = new Favorite({ userId, deckId });
      await favorite.save();
      return res.json({ message: 'Favorite added', isFavorited: true });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Error toggling favorite' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all favorites for the user and populate deck details
    const favorites = await Favorite.find({ userId })
      .populate('deckId')
      .sort({ createdAt: -1 });

    // Transform the data to match the expected format
    const favoriteDecks = favorites.map(favorite => ({
      _id: favorite.deckId._id,
      name: favorite.deckId.name,
      professor: favorite.deckId.professor,
      __v: favorite.deckId.__v,
      createdAt: favorite.createdAt
    }));

    res.json(favoriteDecks);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

exports.checkFavoriteStatus = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    const favorite = await Favorite.findOne({ userId, deckId });
    res.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({ message: 'Error checking favorite status' });
  }
};