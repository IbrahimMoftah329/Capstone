import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsQuiz.css';


const ResultsQuiz = ({ onShowHome, onShowDeck, onShowQuiz }) => {
    const location = useLocation();
    const { filteredResults, filteredQuizzes, initialView } = location.state || { 
        filteredResults: [], 
        filteredQuizzes: [],
        initialView: 'home'
    };
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
        // You can now choose whether to use filteredResults or filteredQuizzes
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
        if (quiz && quiz._id) {
        try{
          const response = await fetch(`http://localhost:4000/api/questions/quiz/${quiz._id}/questions`);
          const data = await response.json();
          if (response.ok) {
            setQuestions(data);
            console.log(data);
          }
    
        } catch (error) {
          console.error("Error fetching flashcards", error);
        }
      }
    };
  
    return (
      <div className='search-results-page'>
        {/* <div className='results-title'>Search Results</div> */}
          {/* This is the filter bar to switch between results home, deck, and quizzes */}
          <div className='filter-bar'>
            <button className='filter-button' onClick={onShowHome}>All Results</button>
            <button className='filter-button' onClick={onShowDeck}>Decks</button>
            <button className='filter-button active' onClick={onShowQuiz}>Quizzes</button>
          </div>

            <div className = 'results-container'>
              <div className='results-list'>
                <div className='results-list-inner'>
                <div className ='deck-quiz'>Quizzes</div>
                  {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map(quiz => (
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
              

              <div className='quiz-details'>
                    <div className='quiz-details-inner'>
                        <div className='deck-quiz'>Preview</div>
                        {filteredQuizzes.length > 0 && selectedQuiz ? (
                            <>
                            <h2 className='quiz-name'>{selectedQuiz.name}</h2>          
                            {questions.length > 0 ? (
                            
                            <div>
                                {questions.map((question, index) => (
                                <div key={question._id} className='result-flashcard-content'>
                                    <p className='flashcard-question'>
                                        {index + 1}. {question.questionText}
                                    </p>
                                
                                    <ul style={{ 
                                        listStyle: 'none', 
                                        padding: '0 0 0 20px', 
                                        margin: '10px 0' 
                                        }}>
                                        {question.options.map((option, optIndex) => (
                                        <li 
                                            key={option._id}
                                                style={{ 
                                            padding: '5px 0',
                                            marginBottom: '5px',
                                            borderRadius: '5px',
                                            background: '#f0f0f0'
                                            }}
                                            >
                                            {/* {String.fromCharCode(65 + optIndex)}. {option.text} */}
                                            {option.text}
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                                ))}
                            </div>
                            ) : (
                                <p>No questions available.</p>
                            )}
                            </>
                        ) : (
                            <p className='no-results'>No results found.</p>
                        )}
                    </div>
                </div>
            </div>
      </div>
    );
};

export default ResultsQuiz;