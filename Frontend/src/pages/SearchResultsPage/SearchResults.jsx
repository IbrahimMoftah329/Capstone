
import './SearchResults.css';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ResultsDeck from '../../Components/ResultsDeck/ResultsDeck';
import ResultsQuiz from '../../Components/ResultsQuiz/ResultsQuiz';
import ResultsHome from '../../Components/ResultsHome/ResultsHome';

const SearchResults = () => {
  const location = useLocation();
    const { filteredResults, filteredDecks, filteredQuizzes, initialView } = location.state || {};
    
    // Default to 'home' if initialView is not passed
    const [currentView, setCurrentView] = useState(initialView || 'home');

    const showResultsHome = () => setCurrentView('home');
    const showResultsDeck = () => setCurrentView('deck');
    const showResultsQuiz = () => setCurrentView('quiz');

    useEffect(() => {
        if (!location.state) {
            setCurrentView('home'); // Reset to home view if no state is passed
        }
    }, [location.state]);

    return (
        <div>
            {currentView === 'home' && (
                <ResultsHome 
                    onShowDeck = {showResultsDeck} 
                    onShowQuiz = {showResultsQuiz}
                    filteredResults={filteredResults} 
                    filteredQuizzes={filteredQuizzes} 
                />
            )}
            {currentView === 'deck' && (
                <ResultsDeck 
                    onShowHome = {showResultsHome}
                    onShowDeck = {showResultsDeck}
                    onShowQuiz = {showResultsQuiz}
                    decks = {filteredResults}
                />
            )}
            {currentView === 'quiz' && (
                <ResultsQuiz
                    onShowHome = {showResultsHome}
                    onShowDeck = {showResultsDeck} 
                    onShowQuiz = {showResultsQuiz}
                    quizzes={filteredQuizzes}
                />
            )}
        </div>
    );
};

export default SearchResults;



/*
Personal Notes:

Features to implement:
- favorites button in results home page items
- creator name and profile picture in results home page items
- preview button on results home page items
- improve scroll bar for modal preview 



*/