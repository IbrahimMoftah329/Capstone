import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsHome.css';


const ResultsHome = ({ onShowDeck, onShowQuiz }) => {
    const location = useLocation();
    const { filteredResults, filteredQuizzes, initialView } = location.state || { 
        filteredResults: [], 
        filteredQuizzes: [],
        initialView: 'home'
    };
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    return (
        <div className='search-results-page'>
            {/* Filter Bar */}
            <div className='filter-bar'>
                <button className='filter-button active'>All Results</button>
                <button className='filter-button' onClick={onShowDeck}>Decks</button>
                <button className='filter-button' onClick={onShowQuiz}>Quizzes</button>
            </div>
            
            <div className='results-home-container'>

                {/* Content */}
                <div className='content-container'>
                    {/* First Row */}
                    <div className='content-row' style = {{backgroundColor: '#ffffff'}}>
                        <div className = 'row-description'>
                            <div className = 'deck-quiz'>Decks</div>
                            <button className = 'view-results' onClick={onShowDeck}>View all</button>
                        </div>
                            <div className='deck-row'>                            
                                {filteredResults.length > 0 ? (
                                filteredResults.slice(0, 4).map(deck => (
                                <div className='result-deck-item' onClick={() => handleDeckSelect(deck)}>
                                    <div className='deck-name'>{deck.name}</div>
                                    <div className='deck-info'>
                                        {deck.__v} Cards | Professor: {deck.professor}
                                    </div>
                                </div>
                                ))
                                ) : (
                                    <p className='no-results'>No results found.</p>
                                )}
                            </div>
                    </div>
                    
                    {/* Second Row */}
                    <div className='content-row' style = {{backgroundColor: '#e0e0e0'}}>
                        <div className = 'row-description'>
                            <div className = 'deck-quiz'>Quizzes</div>
                            <button className = 'view-results' onClick={onShowQuiz}>View all</button>
                        </div>

                        <div className = 'quiz-row'>
                            {filteredQuizzes.length > 0 ? (
                                filteredQuizzes.slice(0, 4).map(quiz => (
                            <div className='result-deck-item' onClick={() => handleQuizSelect(quiz)}>
                                <div className='deck-name'>{quiz.name}</div>
                                <div className='deck-info'>
                                    Professor: {quiz.professor}
                                </div>
                            </div>
                            ))
                            ) : (
                                <p className='no-results'>No results found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsHome;