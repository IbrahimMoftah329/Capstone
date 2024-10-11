require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const flashcardRoutes = require('./routes/flashcards');
const helmet = require('helmet');
const cors = require('cors');

// express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable cross-origin resource sharing
app.use(express.json()); // Parses incoming requests with JSON payloads

// Logs incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/flashcards', flashcardRoutes);

// Ensure essential environment variables are set
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error('Error: Environment variables MONGO_URI or PORT are not set.');
    process.exit(1); // Exit with failure
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });
    }) 
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});