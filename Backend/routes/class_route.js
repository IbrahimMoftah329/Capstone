const express = require('express');
const Class = require('../models/class'); // Import the class model

const router = express.Router();

// GET all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single class
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const classItem = await Class.findById(id);
        if (!classItem) return res.status(404).json({ mssg: 'Class not found' });
        res.status(200).json(classItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new class
router.post('/', async (req, res) => {
    const { className, topics } = req.body;

    try {
        const classItem = await Class.create({ className, topics });
        res.status(201).json(classItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a class
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const classItem = await Class.findByIdAndDelete(id);
        if (!classItem) return res.status(404).json({ mssg: 'Class not found' });
        res.status(200).json({ mssg: 'Class deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a class
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const classItem = await Class.findByIdAndUpdate(id, req.body, { new: true });
        if (!classItem) return res.status(404).json({ mssg: 'Class not found' });
        res.status(200).json(classItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
