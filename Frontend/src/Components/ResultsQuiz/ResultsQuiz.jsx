import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsQuiz.css';

const ResultsQuiz = ({ onShowHome, onShowDeck, onShowQuiz }) => {
    const location = useLocation();
    const { filteredQuizzes } = location.state || { filteredQuizzes: [] };
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (filteredQuizzes.length > 0) {
            const firstQuiz = filteredQuizzes[0];
            setSelectedQuiz(firstQuiz);
            getQuestions(firstQuiz);
        }
    }, [filteredQuizzes]);

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        getQuestions(quiz);
    };

    const getQuestions = async (quiz) => {
        if (quiz?._id) {
            try {
                const response = await fetch(`http://localhost:4000/api/questions/quiz/${quiz._id}/questions`);
                const data = await response.json();
                if (response.ok) {
                    setQuestions(data);
                }
            } catch (error) {
                console.error("Error fetching questions", error);
            }
        }
    };

    return (
        <div className='search-quiz-page'>
            <div className='results-container-quiz'>
                <div className='filter-bar-quiz'>
                    <button className='filter-button-quiz' onClick={onShowHome}>All Results</button>
                    <button className='filter-button-quiz' onClick={onShowDeck}>Decks</button>
                    <button className='filter-button-quiz active' onClick={onShowQuiz}>Quizzes</button>
                </div>

                <div className='content-grid'>
                    {/* Quiz List Column */}
                    <div className='quizzes-column'>
                        <div className='section-header'>
                            <h2>Available Quizzes</h2>
                            <span>{filteredQuizzes.length} quizzes found</span>
                        </div>
                        <div className='quizzes-list'>
                            {filteredQuizzes.map(quiz => (
                                <div
                                    key={quiz._id}
                                    className={`quiz-card ${selectedQuiz?._id === quiz._id ? 'active' : ''}`}
                                    onClick={() => handleQuizSelect(quiz)}
                                >
                                    <h3>{quiz.name}</h3>
                                    <div className='quiz-meta'>
                                        <span>Professor: {quiz.professor}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Column */}
                    <div className='preview-column'>
                        <div className='section-header'>
                            <h2>Preview</h2>
                        </div>
                        <div className='preview-content'>
                            {selectedQuiz ? (
                                <>
                                    <div className='preview-header'>
                                        <h3>{selectedQuiz.name}</h3>
                                        <div className='preview-meta'>
                                            <span>Professor: {selectedQuiz.professor}</span>
                                        </div>
                                    </div>
                                    <div className='questions-list'>
                                        {questions.map((question, index) => (
                                            <div key={question._id} className='question-card'>
                                                <div className='question-header'>Question {index + 1}</div>
                                                <div className='question-content'>
                                                    <div className='question-text'>{question.questionText}</div>
                                                    <div className='options-list'>
                                                        {question.options.map((option, optIndex) => (
                                                            <div key={optIndex} className='option-item'>
                                                                {option.text}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className='empty-state'>
                                    <p>Select a quiz to view its contents</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsQuiz;