import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResultsDeck from '../../Components/ResultsDeck/ResultsDeck';
import ResultsQuiz from '../../Components/ResultsQuiz/ResultsQuiz';
import ResultsHome from '../../Components/ResultsHome/ResultsHome';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { filteredResults, filteredQuizzes, initialView } = location.state || {};
  const [currentView, setCurrentView] = useState(initialView || 'home');
  const showResultsDeck = () => setCurrentView('deck');
  const showResultsQuiz = () => setCurrentView('quiz');
  
  useEffect(() => {
    if (!location.state) {
      setCurrentView('home');
    }
  }, [location.state]);

  return (
    <div className="page-container">
      <div className="content-wrapper">
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
    </div>
  );
};

export default SearchResults;