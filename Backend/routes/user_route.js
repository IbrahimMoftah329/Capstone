const express = require('express');
const User = require('../models/user'); // Import the user model

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ mssg: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const { username, campus, major, classes } = req.body;

    try {
        const user = await User.create({ username, campus, major, classes });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ mssg: 'User not found' });
        res.status(200).json({ mssg: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a user
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) return res.status(404).json({ mssg: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
