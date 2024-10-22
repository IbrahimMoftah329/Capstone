require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const flashcardRoutes = require('./routes/flashCardRoute')
const userRoutes = require('./routes/userRoute')
const deckRoutes = require('./routes/deckRoute')
const helmet = require('helmet');
const cors = require('cors');

// express app
const app = express();

// middleware
"parses request data to json which allows you see that/access the data "
app.use(express.json())

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable cross-origin resource sharing
app.use(express.json()); // Parses incoming requests with JSON payloads

// Logs incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/flashcards', flashcardRoutes)
app.use('/api/users', userRoutes)
app.use('/api/decks', deckRoutes)

// Ensure essential environment variables are set
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error('Error: Environment variables MONGO_URI or PORT are not set.');
    process.exit(1); // Exit with failure
}

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