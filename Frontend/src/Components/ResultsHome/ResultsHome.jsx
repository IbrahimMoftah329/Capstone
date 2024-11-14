// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './ResultsHome.css';


// const ResultsHome = ({ onShowDeck, onShowQuiz }) => {
//     const location = useLocation();
//     const { filteredResults, filteredQuizzes, initialView } = location.state || { 
//         filteredResults: [], 
//         filteredQuizzes: [],
//         initialView: 'home'
//     };
//     const [selectedQuiz, setSelectedQuiz] = useState(null);
//     const [questions, setQuestions] = useState([]);


//     return (
//         <div className='search-results-page'>
//             <div>
//                 <h1>Welcome to Results Home</h1>
//                 <button onClick={onShowDeck}>Show Results Deck</button>
//                 <button onClick={onShowQuiz}>Show Results Quiz</button>
//             </div>
//         </div>
//     );
// };

// export default ResultsHome;


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

            {/* Content */}
            <div className='content-container'>
                {/* First Row */}
                <div className='content-row'>
                    <div className='content-box'>Hello</div>
                    <div className='content-box'>Hello</div>
                    <div className='content-box'>Hello</div>
                    <div className='content-box'>Hello</div>
                </div>
                
                {/* Second Row */}
                <div className='content-row'>
                    <div className='content-box'>Hello</div>
                    <div className='content-box'>Hello</div>
                    <div className='content-box'>Hello</div>
                    <div className='content-box'>Hello</div>
                </div>
            </div>
        </div>
    );
};

export default ResultsHome;