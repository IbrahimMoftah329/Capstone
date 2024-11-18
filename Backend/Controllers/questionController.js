const Question = require('../models/Question');

const mongoose = require('mongoose')

const getQuestionsByQuizId = async (req, res) => {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
        return res.status(404).json({ error: "Invalid quiz ID" });
    }

    try {
        const questions = await Question.find({ quizId }); // Find all questions for the given quiz ID
        if (!questions) {
            return res.status(404).json({ error: 'Questions not found for this quiz' });
        }
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getQuestionsByQuizId,
};