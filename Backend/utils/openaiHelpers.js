const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Question = require('../models/Question'); // Ensure correct path to the Question model

const generateQuestionFromFlashcard = async (flashcard, quizId) => {
    const prompt = `
Generate a multiple-choice question from the following:
Question: ${flashcard.question}
Answer: ${flashcard.answer}

Format:
Question: <generated question>
Options:
A. <option 1>
B. <option 2>
C. <option 3>
D. <option 4>
Correct Option: <A, B, C, or D>
Explanation: <Explanation for correct answer>`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini-2024-07-18',
                messages: [
                    { role: 'system', content: 'You are a helpful quiz question creating assistant.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();
        const questionText = data.choices[0].message.content;

        // Parse options from response text (Assume the function works as expected)
        const options = parseOptions(questionText);

        // Extract Explanation
        const explanationMatch = questionText.match(/Explanation:\s(.+)/);
        const explanation = explanationMatch ? explanationMatch[1] : "No explanation provided";

        // Create and save the Question document
        const question = new Question({
            quizId: quizId, // Use the passed `quizId`
            questionText: questionText,
            options: options,
            explanation: explanation
        });

        await question.save();
        return question;
    } catch (error) {
        console.error('Error generating question:', error);
        return null;
    }
};

// Helper function to parse options from OpenAI response (Assuming this function works correctly)
function parseOptions(responseText) {
    const options = [];
    const optionLabels = ['A', 'B', 'C', 'D'];

    optionLabels.forEach(label => {
        const regex = new RegExp(`${label}\\.\\s(.+)`);
        const match = responseText.match(regex);
        if (match) {
            options.push({ text: match[1], isCorrect: false });
        }
    });

    const correctOptionMatch = responseText.match(/Correct Option:\s([A-D])/);
    if (correctOptionMatch) {
        const correctOptionLabel = correctOptionMatch[1];
        const correctIndex = optionLabels.indexOf(correctOptionLabel);
        if (correctIndex !== -1) {
            options[correctIndex].isCorrect = true;
        }
    }

    return options;
}

module.exports = { generateQuestionFromFlashcard };