import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';
import { useUser } from '@clerk/clerk-react';

const Results = () => {
    const location = useLocation();
    const { attempt, quiz } = location.state || {};
    const [questions, setQuestions] = useState(quiz?.questions || []); // Load questions from quiz or set as empty array

    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/");
        }
        window.scrollTo(0, 0);
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

    // Fetch questions if they were not passed in location.state
    // useEffect(() => {
    //     if (!questions.length && quiz) {
    //         getQuestions();
    //     }
    // }, [questions, quiz]);
    useEffect(() => {
        getQuestions();
    }, []);
    

    if (!attempt || !quiz) return <div>Error: Results not found.</div>;

    if (!attempt || !attempt.answers) {
        return <div>Error: No attempt data found</div>;
    }

    // Updated function to navigate to dashboard library
    const navigateToLibrary = () => {
        navigate(`/dashboard/library`);
    };

    return (
        <div className="results-page">
            <h1>Quiz Results</h1>
            <p className="score" >Score: {attempt.score} / {questions.length}</p>
            {attempt.answers.map((result, index) => {
                const question = questions.find(q => q._id === result.questionId);
                const correctAnswer = question?.options.find(option => option.isCorrect)?.text;

                return (
                    <div 
                        key={result.questionId} 
                        className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}
                    >
                        <h3>Question {index + 1}: {question?.questionText}</h3>
                        <p>Your Answer: {result.userAnswer}</p>
                        <p>Correct Answer: {correctAnswer}</p>
                        {result.isCorrect ? <p>✅ Correct!</p> : <p>❌ Incorrect</p>}
                        {question?.explanation && (
                            <p className="explanation"><strong>Explanation:</strong> {question.explanation}</p>
                        )}
                    </div>
                );
            })}

            <button className="submit-button" onClick={navigateToLibrary}>Return To Library</button>
        </div>
    );
};

export default Results;
