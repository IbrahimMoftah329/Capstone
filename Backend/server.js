require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const flashcardRoutes = require('./routes/flashCardRoute')
const userRoutes = require('./routes/userRoute')
const deckRoutes = require('./routes/deckRoute')
const quizRoute = require('./routes/quizRoute');
const questionRoutes = require('./routes/questionRoute');
const quizAttemptRoutes = require('./routes/quizAttemptRoute');

const helmet = require('helmet');
const cors = require('cors');
const nodemailer = require('nodemailer');

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
app.use('/api/quizzes', quizRoute);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', quizAttemptRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', quizAttemptRoutes);

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


// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route to send email
app.post('/api/send-email', async (req, res) => {
    const { to, subject, text, userEmail, userName } = req.body;

    // Debug: Log incoming email request data
    console.log("Incoming email request data:", req.body);

    // Email options for the main recipient (e.g., CardMates team)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to, // Main recipient
        subject,
        text,
    };

    // Confirmation email options for the user
    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail, // User's email
        subject: "Confirmation: Your message was sent to CardMates",
        text: `Hello ${userName},\n\nThank you for reaching out to us. Your message has been successfully sent. We will get back to you shortly.\n\nBest regards,\nThe CardMates Team`,
    };

    try {
        // Send email to main recipient
        const mainEmailInfo = await transporter.sendMail(mailOptions);
        console.log('Main email sent:', mainEmailInfo.response);

        // Send confirmation email to the user
        const userEmailInfo = await transporter.sendMail(userMailOptions);
        console.log('Confirmation email sent:', userEmailInfo.response);

        res.status(200).send('Emails sent successfully');
    } catch (error) {
        console.error("Error sending emails:", error);
        res.status(500).send('Error sending emails');
    }
});