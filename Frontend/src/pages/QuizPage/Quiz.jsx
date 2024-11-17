import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';
import { useUser } from '@clerk/clerk-react';

const Quiz = () => {
    const location = useLocation();
    const { quiz } = location.state || {}; // Retrieve quiz from location.state
    const [questions, setQuestions] = useState([]); // State for flashcards
    const [answers, setAnswers] = useState({}); // Stores user answers as questionId: selectedOptionIndex

    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    const { user } = useUser();

    // Function to fetch questions for the given quiz
    const getQuestions = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/questions/quiz/${quiz._id}/questions`)
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data); // Store fetched questions
            })
            .catch((error) => console.error('Error fetching questions:', error));
    };


    useEffect(() => {
        getQuestions();
    }, []);

    // Display a loading message or error if quiz data is missing
    if (!quiz) return <div>Error: Quiz data not found.</div>;

    // Handle option change for each question
    const handleOptionChange = (questionId, optionIndex) => {
        setAnswers({
            ...answers,
            [questionId]: optionIndex
        });
    };

    // Check if all questions have been answered
    const allQuestionsAnswered = questions.length > 0 && questions.every(question => answers.hasOwnProperty(question._id));

    const handleQuizSubmit = async () => {
        if (!allQuestionsAnswered) {
            alert("Please answer all questions before submitting.");
            return;
        }
    
        // Calculate score and format answers with `isCorrect` field
        const formattedAnswers = questions.map(question => {
            const correctOptionIndex = question.options.findIndex(option => option.isCorrect);
            const userAnswerText = question.options[answers[question._id]].text;
            const isCorrect = correctOptionIndex === answers[question._id];
            
            return {
                questionId: question._id,
                userAnswer: userAnswerText,
                isCorrect: isCorrect,
            };
        });
    
        const score = formattedAnswers.filter(answer => answer.isCorrect).length;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/attempts/attempt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id, // Clerk's `user.id` as `clerkId` in backend
                    quizId: quiz._id,
                    answers: formattedAnswers,
                    score: score
                }),
            });
    
            if (!response.ok) {
                console.error('Failed to submit quiz attempt. Status:', response.status);
                return;
            }
    
            const attempt = await response.json();
            navigate(`/results/${attempt._id}`, { state: { attempt, quiz } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <div className="quiz-page">
            <h1>{quiz.name}</h1>

            {questions.map((question, index) => (
                <div key={question._id} className="question-block">
                    <h3>Question {index + 1}: {question.questionText}</h3>
                    <div className="options">
                        {question.options.map((option, optionIndex) => (
                            <React.Fragment key={optionIndex}>
                                <input
                                    type="radio"
                                    id={`option-${question._id}-${optionIndex}`}
                                    name={`question-${question._id}`}
                                    value={optionIndex}
                                    checked={answers[question._id] === optionIndex}
                                    onChange={() => handleOptionChange(question._id, optionIndex)}
                                />
                                <label htmlFor={`option-${question._id}-${optionIndex}`}>
                                    {option.text}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}

            <button className="submit-button" onClick={handleQuizSubmit}>Submit Quiz</button>
        </div>
    );
};

export default Quiz;