const Leaderboard = require('../models/leaderboard');
const Deck = require('../models/deck');
const User = require('../models/user');

// Add or Update a User's Attempt
const addOrUpdateUserAttempt = async (req, res) => {
    const { userId, deckId } = req.params;
    const { deckName, timeElapsed } = req.body;

    if (!deckName || !timeElapsed) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Ensure the user exists
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Ensure the deck exists
        const deck = await Deck.findById(deckId);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }

        // Check if there's an existing attempt for this user and deck
        const existingAttempt = await Leaderboard.findOne({ userId, deckId });

        if (existingAttempt) {
            // Update the existing attempt
            existingAttempt.timeElapsed = timeElapsed;
            existingAttempt.timestamp = new Date();
            const updatedAttempt = await existingAttempt.save();
            return res.status(200).json(updatedAttempt);
        }

        // Create a new attempt if none exists
        const newAttempt = new Leaderboard({
            userId,
            deckId,
            deckName,
            timeElapsed,
        });

        const savedAttempt = await newAttempt.save();
        res.status(201).json(savedAttempt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get User's Last Attempts for a Specific Deck
const getUserLastAttempts = async (req, res) => {
    const { userId, deckId } = req.params;

    try {
        // Ensure the user exists
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Ensure the deck exists
        const deck = await Deck.findById(deckId);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }

        // Fetch all leaderboard entries for this user and deck
        const attempts = await Leaderboard.find({ userId, deckId }).sort({ timestamp: -1 });
        if (!attempts.length) {
            return res.status(404).json({ error: 'No attempts found for this user on this deck.' });
        }

        res.status(200).json(attempts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addOrUpdateUserAttempt,
    getUserLastAttempts,
};
