const Deck = require('../models/deck');
const Flashcard = require('../models/flashcard');

// Get a flashcard by ID
const getFlashcard = async (req, res) => {
  const { flashcardId } = req.params;

  try {
    const flashcard = await Flashcard.findById(flashcardId);
    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(200).json(flashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all flashcards in a deck
const getAllFlashcardsInDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    // Find the deck by ID and populate flashcards
    const deck = await Deck.findById(deckId).populate('flashcards');
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Return the flashcards in the deck
    res.status(200).json(deck.flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new flashcard to a deck
const addFlashcardToDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Create and save the new flashcard
    const newFlashcard = new Flashcard({ ...req.body, deckId });
    const savedFlashcard = await newFlashcard.save();

    // Add the new flashcard reference to the deck
    deck.flashcards.push(savedFlashcard._id);
    await deck.save();

    res.status(201).json(savedFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a flashcard by ID
const updateFlashcard = async (req, res) => {
  const { flashcardId } = req.params;

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(flashcardId, req.body, { new: true });
    if (!updatedFlashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(200).json(updatedFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a flashcard by ID
const deleteFlashcard = async (req, res) => {
  const { flashcardId } = req.params;

  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(flashcardId);
    if (!deletedFlashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    // Remove the flashcard reference from the deck's flashcards array
    await Deck.findByIdAndUpdate(deletedFlashcard.deckId, { $pull: { flashcards: flashcardId } });
    res.status(200).json({ message: 'Flashcard deleted successfully', flashcard: deletedFlashcard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getFlashcard,
  addFlashcardToDeck,
  updateFlashcard,
  deleteFlashcard,
  getAllFlashcardsInDeck,
};
