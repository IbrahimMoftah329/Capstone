const ShuffleAttempt = require('../models/shuffleAttempts');
const User = require('../models/user');
const Deck = require('../models/deck');

// Add a new shuffle attempt
const addShuffleAttempt = async (req, res) => {
    const { userId, deckId, deckName, timeElapsed } = req.body;

    if (!userId || !deckId || !deckName || timeElapsed == null) {
        return res.status(400).json({ error: 'All fields are required (userId, deckId, deckName, timeElapsed).' });
    }

    try {
        // Verify the user exists
        const userExists = await User.findOne({ clerkId: userId });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Verify the deck exists
        const deckExists = await Deck.findById(deckId);
        if (!deckExists) {
            return res.status(404).json({ error: 'Deck not found.' });
        }

        // Create a new shuffle attempt
        const newAttempt = new ShuffleAttempt({
            userId,
            deckId,
            deckName,
            timeElapsed,
        });

        // Save the attempt
        const savedAttempt = await newAttempt.save();

        res.status(201).json(savedAttempt);
    } catch (error) {
        console.error("Error adding shuffle attempt:", error);
        res.status(500).json({ error: 'Failed to add shuffle attempt.' });
    }
};

// Get all shuffle attempts for a user
const getUserShuffleAttempts = async (req, res) => {
    const { userId } = req.params;

    try {
        const attempts = await ShuffleAttempt.find({ userId }).sort({ timeElapsed: 1 });
        res.status(200).json(attempts); // Ensure this is always an array
    } catch (error) {
        console.error('Error fetching shuffle attempts:', error);
        res.status(500).json([]); // Return an empty array on error
    }
};


// Delete a shuffle attempt by ID
const deleteShuffleAttempt = async (req, res) => {
    const { attemptId } = req.params;

    try {
        // Find and delete the attempt
        const deletedAttempt = await ShuffleAttempt.findByIdAndDelete(attemptId);

        if (!deletedAttempt) {
            return res.status(404).json({ error: 'Attempt not found.' });
        }

        res.status(200).json({ message: 'Attempt deleted successfully.', attempt: deletedAttempt });
    } catch (error) {
        console.error("Error deleting shuffle attempt:", error);
        res.status(500).json({ error: 'Failed to delete shuffle attempt.' });
    }
};

// Get a specific shuffle attempt by ID
const getShuffleAttemptById = async (req, res) => {
    const { attemptId } = req.params;

    try {
        // Find the specific attempt
        const attempt = await ShuffleAttempt.findById(attemptId);

        if (!attempt) {
            return res.status(404).json({ error: 'Attempt not found.' });
        }

        res.status(200).json(attempt);
    } catch (error) {
        console.error("Error fetching shuffle attempt:", error);
        res.status(500).json({ error: 'Failed to fetch shuffle attempt.' });
    }
};

const getUserDeckShuffleAttempts = async (req, res) => {
    const { userId, deckId } = req.params;

    try {
        // Fetch all shuffle attempts for the given user and deck
        const attempts = await ShuffleAttempt.find({ userId, deckId }).sort({ timeElapsed: 1 });

        if (!attempts.length) {
            return res.status(404).json({ error: 'No attempts found for this deck and user.' });
        }

        res.status(200).json(attempts);
    } catch (error) {
        console.error('Error fetching shuffle attempts for deck:', error);
        res.status(500).json({ error: 'Failed to fetch shuffle attempts for this deck.' });
    }
};


module.exports = {
    addShuffleAttempt,
    getUserShuffleAttempts,
    deleteShuffleAttempt,
    getShuffleAttemptById,
    getUserDeckShuffleAttempts
};
