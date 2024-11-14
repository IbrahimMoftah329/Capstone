
import './SearchResults.css';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ResultsDeck from '../../Components/ResultsDeck/ResultsDeck';
import ResultsQuiz from '../../Components/ResultsQuiz/ResultsQuiz';
import ResultsHome from '../../Components/ResultsHome/ResultsHome';

const SearchResults = () => {
  const location = useLocation();
    const { filteredResults, filteredQuizzes, initialView } = location.state || {};
    
    // Default to 'home' if initialView is not passed
    const [currentView, setCurrentView] = useState(initialView || 'home');

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
                    onShowDeck={showResultsDeck} 
                    onShowQuiz={showResultsQuiz} 
                    filteredResults={filteredResults} 
                    filteredQuizzes={filteredQuizzes} 
                />
            )}
            {currentView === 'deck' && (
                <ResultsDeck results={filteredResults} />
            )}
            {currentView === 'quiz' && (
                <ResultsQuiz quizzes={filteredQuizzes} />
            )}
        </div>
    );
};

export default SearchResults;
