require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
<<<<<<< HEAD
const flashcardRoutes = require('./routes/flashcards')
const userRoutes = require('./routes/userRoute')
=======

const flashcardRoutes = require('./routes/flashcard_route') // Import flashcard routes
const classRoutes = require('./routes/class_route')         // Import class routes
const topicRoutes = require('./routes/topic_route')         // Import topic routes
const userRoutes = require('./routes/user_route')           // Import user routes
>>>>>>> 08131a741ec6bdba09dd9e373b6f23492544ebc4


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
<<<<<<< HEAD
app.use('/api/flashcards', flashcardRoutes)
app.use('/api/users', userRoutes)
=======
app.use('/api/flashcards', flashcardRoutes) // Register flashcard routes
app.use('/api/classes', classRoutes)        // Register class routes
app.use('/api/topics', topicRoutes)         // Register topic routes
app.use('/api/users', userRoutes)           // Register user routes

>>>>>>> 08131a741ec6bdba09dd9e373b6f23492544ebc4

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


