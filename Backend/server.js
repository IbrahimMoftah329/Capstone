require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const flashcardRoutes = require('./routes/flashcard_route') // Import flashcard routes
const classRoutes = require('./routes/class_route')         // Import class routes
const topicRoutes = require('./routes/topic_route')         // Import topic routes
const userRoutes = require('./routes/user_route')           // Import user routes


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
app.use('/api/flashcards', flashcardRoutes) // Register flashcard routes
app.use('/api/classes', classRoutes)        // Register class routes
app.use('/api/topics', topicRoutes)         // Register topic routes
app.use('/api/users', userRoutes)           // Register user routes


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


