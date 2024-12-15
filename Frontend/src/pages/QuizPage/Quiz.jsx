import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';
import { useUser } from '@clerk/clerk-react';

const getSemesterSuit = (semester) => {
    const suits = {
        'Winter': { symbol: '♠', color: '#000000' },
        'Spring': { symbol: '♦', color: '#e31b23' },
        'Summer': { symbol: '♣', color: '#000000' },
        'Fall': { symbol: '♥', color: '#e31b23' }
    };
    
    const season = semester ? semester.split(' ')[0] : 'Winter';
    return suits[season] || suits['Winter'];
};

const Quiz = () => {
    const location = useLocation();
    const { quiz } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const navigate = useNavigate();
    const { isSignedIn, user } = useUser();

    // Determine suit based on deck
    const suit = getSemesterSuit(quiz?.semester);

    useEffect(() => {
        if (!isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    // Fetch questions (existing logic remains the same)
    const getQuestions = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/questions/quiz/${quiz._id}/questions`)
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => console.error('Error fetching questions:', error));
    };

    useEffect(() => {
        getQuestions();
    }, []);

    if (!quiz) return <div>Error: Quiz data not found.</div>;

    const handleOptionChange = (questionId, optionIndex) => {
        setAnswers({
            ...answers,
            [questionId]: optionIndex
        });
    };

    const allQuestionsAnswered = questions.length > 0 && 
        questions.every(question => answers.hasOwnProperty(question._id));

    const handleQuizSubmit = async () => {
        // Existing submit logic remains the same
        if (!allQuestionsAnswered) {
            alert("Please answer all questions before submitting.");
            return;
        }
    
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
                    userId: user.id,
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
                <div 
                    key={question._id} 
                    className="question-block"
                    data-suit={suit.symbol}
                    style={{ 
                        '--suit-color': suit.color 
                    }}
                >
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

            <button 
                className="submit-button" 
                onClick={handleQuizSubmit}
                disabled={!allQuestionsAnswered}
            >
                Submit Quiz
            </button>
        </div>
    );
};

export default Quiz;