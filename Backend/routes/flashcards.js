const express  = require('express')
const Flashcard = require('../models/flashcard')
const router = express.Router()

// GET all flashcards
router.get('/', (req, res) => {
    res.json({mssg: 'GET all flashcards'})
})

// GET a single flashcard
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single flashcard'})
})

// POST a new flashcard
router.post('/', async (req, res) => {
    const {prompt, answer} = req.body

    try{
        const flashcard = await Flashcard.create({prompt, answer})

        res.status(200).json(flashcard)

    } catch(error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a Flashcard
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a flashcard'})
})

// UPDATE a flashcard
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE new flashcard'})
})

module.exports = router

