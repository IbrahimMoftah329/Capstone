const QuizAttempt = require('../models/quizAttempt');
const Quiz = require('../models/quiz');
const Question = require('../models/question');
const User = require('../models/user');

const getQuizAttempts = async (req, res) => {
    try {
        // console.log("Received request for user ID:", req.params.userId);

        // Find the user based on their Clerk ID to get their MongoDB user ID
        const user = await User.findOne({ clerkId: req.params.userId });
        // console.log("Found user:", user);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        // Find all quiz attempts by user ID and populate quiz and question data
        const attempts = await QuizAttempt.find({ userId: user._id })
            .populate({
                path: 'quizId',
                select: 'name', // Populate only the quiz name
                options: { strictPopulate: false } // Force population even if references are missing
            })
            .populate({
                path: 'answers.questionId',
                select: 'questionText', // Populate only the question text for answers
                options: { strictPopulate: false } // Force population even if references are missing
            });

        // console.log("Raw attempts data:", attempts);

        // Format the attempts data to include necessary fields and the `answers` array
        const formattedAttempts = attempts.map(attempt => {
            console.log("Processing attempt:", attempt._id);
            return {
                attemptId: attempt._id,
                quizId: attempt.quizId ? attempt.quizId._id : null, // Check for populated quizId
                quizName: attempt.quizId ? attempt.quizId.name : attempt.quizName, // Use quizName as fallback if quizId is missing
                score: attempt.score,
                createdAt: attempt.createdAt,
                totalQuestions: attempt.answers.length, // Get the length of answers for displaying score
                answers: attempt.answers.map(answer => ({
                    questionId: answer.questionId ? answer.questionId._id : null,
                    questionText: answer.questionId ? answer.questionId.questionText : null,
                    userAnswer: answer.userAnswer,
                    isCorrect: answer.isCorrect
                }))
            };
        });

        // console.log("Formatted attempts:", formattedAttempts);

        // Return the formatted attempts
        res.json(formattedAttempts);
    } catch (err) {
        console.error("Error fetching quiz attempts:", err);
        res.status(500).send(err.message);
    }
};

// Save a new quiz attempt
const saveQuizAttempt = async (req, res) => {
    const { userId: clerkUserId, quizId, answers } = req.body;

    try {
        // Find the user by Clerk's `user.id` (`clerkId` in your schema)
        const user = await User.findOne({ clerkId: clerkUserId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find the quiz and populate questions
        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        let score = 0;
        const attemptAnswers = answers.map(answer => {
            const question = quiz.questions.find(q => q._id.toString() === answer.questionId);
            if (!question) return null;

            const correctOption = question.options.find(option => option.isCorrect);
            const isCorrect = correctOption && correctOption.text === answer.userAnswer;
            if (isCorrect) score += 1;

            return {
                questionId: answer.questionId,
                userAnswer: answer.userAnswer,
                isCorrect,
            };
        }).filter(Boolean);

        const attempt = new QuizAttempt({ userId: user._id, quizId, answers: attemptAnswers, score });
        await attempt.save();
        res.status(201).json(attempt);
    } catch (error) {
        console.error('Error saving quiz attempt:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get quiz attempt results
const getQuizAttemptResults = async (req, res) => {
    const { attemptId } = req.params;
    try {
        const attempt = await QuizAttempt.findById(attemptId).populate('quizId');
        if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
        res.json(attempt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a quiz attempt by attemptId
const deleteQuizAttempt = async (req, res) => {
    const { attemptId } = req.params;

    try {
        // Attempt to find and delete the quiz attempt by ID
        const deletedAttempt = await QuizAttempt.findByIdAndDelete(attemptId);
        
        // Check if the attempt was found and deleted
        if (!deletedAttempt) {
            return res.status(404).json({ message: 'Attempt not found' });
        }

        // Return a success message
        res.status(200).json({ message: 'Attempt deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz attempt:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    getQuizAttempts,
    getQuizAttemptResults, 
    saveQuizAttempt, 
    deleteQuizAttempt,
};
