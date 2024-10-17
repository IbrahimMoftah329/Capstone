require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const flashcardRoutes = require('./routes/flashCardRoute')
const userRoutes = require('./routes/userRoute')
const deckRoutes = require('./routes/deckRoute')


// express app
const app = express()

// middleware
"parses request data to json which allows you see that/access the data "
app.use(express.json())

"logs the incoming request"
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/flashcards', flashcardRoutes)
app.use('/api/users', userRoutes)
app.use('/api/decks', deckRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests 
        app.listen(process.env.PORT, () =>{
        console.log('connected to db & listening on port', process.env.PORT)
        })
    }) 
    .catch((error) => {
        console.log(error)
    })


