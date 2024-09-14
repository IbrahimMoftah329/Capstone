const express  = require('express')

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
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new flashcard'})
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

