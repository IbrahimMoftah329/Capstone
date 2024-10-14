const express = require('express');
const Topic = require('../models/topic'); // Import the topic model

const router = express.Router();

// GET all topics
router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single topic
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const topic = await Topic.findById(id);
        if (!topic) return res.status(404).json({ mssg: 'Topic not found' });
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new topic
router.post('/', async (req, res) => {
    const { topicName, semester, year, professor, flashcards } = req.body;

    try {
        const topic = await Topic.create({ topicName, semester, year, professor, flashcards });
        res.status(201).json(topic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a topic
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const topic = await Topic.findByIdAndDelete(id);
        if (!topic) return res.status(404).json({ mssg: 'Topic not found' });
        res.status(200).json({ mssg: 'Topic deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a topic
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const topic = await Topic.findByIdAndUpdate(id, req.body, { new: true });
        if (!topic) return res.status(404).json({ mssg: 'Topic not found' });
        res.status(200).json(topic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
