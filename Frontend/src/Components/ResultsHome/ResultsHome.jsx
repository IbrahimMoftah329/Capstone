import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './ResultsHome.css';


const ResultsHome = ({ onShowDeck, onShowQuiz }) => {
    const location = useLocation();
    const { user } = useUser();             // Get user context from Clerk
    const userId = user ? user.id : null;   // Get the logged-in user's ID


    const { filteredResults, filteredDecks, filteredQuizzes, initialView } = location.state || { 
        filteredResults: [],
        filteredDecks: [], 
        filteredQuizzes: [],
        initialView: 'home'
    };

    // Usestate used for updating the favorite decks and quizzes for a user
    const [favDeck, setFavDeck] = useState(user?.favoriteDecks || '');
    const [favQuiz, setFavQuiz] = useState(user?.favoriteQuizzes || '');

    // Usestate for retrieving the flashcard question and answer for a given deck
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [flashcards, setFlashcards] = useState([])

    // Usestate for retrieving the questions and answers for a given quiz
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    // Usestates for showing the preview of decks and quizzes
    const [isDeckOpen, setDeckOpen] = useState(false);
    const [isQuizOpen, setQuizOpen] = useState(false);


    // Allows user to exit the modal with the ESC key on their keyboard
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                if (isDeckOpen) closeDeckModal();
                if (isQuizOpen) closeQuizModal();
            }
        };

        if (isDeckOpen || isQuizOpen) {
            document.addEventListener('keydown', handleEscKey);
            return () => document.removeEventListener('keydown', handleEscKey);
        }
    }, [isDeckOpen, isQuizOpen]);

    // Handles opening the Deck modal with the preview button
    const handleDeckPreview = (deck) => {
        setDeckOpen(true);
        setFlashcards(deck);
        setSelectedDeck(deck);
        getFlashcards(deck);
    }
    
    const closeDeckModal = () => {
        setDeckOpen(false);
    }

    // Handles opening the Quiz modal with the preview button
    const handleQuizPreview = (quiz) => {
        setQuizOpen(true);
        setQuestions(quiz);
        setSelectedQuiz(quiz);
        getQuestions(quiz);
    }

    const closeQuizModal = () => {
        setQuizOpen(false);

    }

    // Retrieves each flashcard using the deck id to be displayed during preview
    
    const getFlashcards = async (deck) => {
        if (deck && deck._id) {
          try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deck._id}/flashcards`, {method: "GET",})
            const data = await response.json();
            if (response.ok) {
              setFlashcards(data);
              console.log(data);
            }
          } catch (error) {
            console.error("Error fetching flashcards", error);
          }
        }
    };    
    
    // Retrieves each quiestion using the quiz id to be displayed during preview
    const getQuestions = async (quiz) => {
        if (quiz && quiz._id) {
        try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/questions/quiz/${quiz._id}/questions`, {method: "GET",});
        const data = await response.json();
        if (response.ok) {
            setQuestions(data);
            console.log(data);
        }
        } catch (error) {
            console.error("Error fetching quiz questions", error);
        }
        }
    };


    const toggleFavoriteDeck = async (deckID) => {
        try {

            // Check if there is a user logged in, if not prompt them to log in
            if (!userId) {
                alert('Please log in to add this deck to your favorites.');
                return;
            }


            const response = await fetch(`http://localhost:4000/api/decks/${userId}/favDeck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deckId: deckID,
                }),
            });

            if (response.ok) {
                // const result = await response.json();
                console.log('POST request sent to server.');
            } else {
                console.error('Failed to toggle favorite status');
            }
        } catch (error) {
            console.error('Error toggling favorite status', error);
        }
    };

    

    return (
        <div className='search-results-page'>            
            <div className='results-home-container'>
                <div className='filter-bar'>
                    <button className='filter-button active'>All Results</button>
                    <button className='filter-button' onClick={onShowDeck}>Decks</button>
                    <button className='filter-button' onClick={onShowQuiz}>Quizzes</button>
                </div>

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
                                <div className='result-deck-item-home'>
                                    <div className='deck-name-home'>{deck.name}</div>
                                    <div className='deck-info'>
                                        {deck.__v} Cards | Professor: {deck.professor}
                                    </div>

                                    <div className='buttons'>
                                        <button className = 'preview' onClick={() => handleDeckPreview(deck)}>Preview</button>
                                        <button className = 'add_favorite' onClick={() => toggleFavoriteDeck(deck._id)}>Favorite</button>
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
                            <div className='result-deck-item-home'>
                                <div className='deck-name-home'>{quiz.name}</div>
                                <div className='deck-info'>
                                    Professor: {quiz.professor}
                                </div>
                                <div className='buttons'>
                                    <button className = 'preview' onClick={() => handleQuizPreview(quiz)}>Preview</button>
                                    {/* <button className = 'add_favorite' onClick={() => addFavoriteQuiz(quiz)}>Favorite</button> */}
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


            {/* Modal to show the Deck details */}
            {isDeckOpen && (
                <div className = 'modal'>
                    <div className = 'modal-content'>
                        <div className='modal-header'>
                            <button className = 'modal-button' onClick = {closeDeckModal}>X</button>
                        </div>


                        {filteredResults.length > 0 ? (
                        <>
                        <h2 className='deck-name'>{selectedDeck.name}</h2>          
                        {flashcards.length > 0 ? (
                        <div>
                            {flashcards.map((flashcard) => (
                                <div className = 'result-flashcard-content'>
                                    <p className='flashcard-question'>{flashcard.question}</p>
                                    <p className='flashcard-answer'>{flashcard.answer}</p>
                                </div>
                            ))}
                        </div>
                        ) : (
                        <p>No flashcards available.</p>
                        )}
                        </>
                        ) : (
                            <p className='no-results'>No results found.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Modal to show the Quiz details */}
            {isQuizOpen && (
                <div className = 'modal'>
                <div className = 'modal-content'>
                    
                    <div className='modal-header'>
                        <button className = 'modal-button' onClick = {closeQuizModal}>X</button>
                    </div>
                    
                    <div className='quiz-details-home'>
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

            )}

        </div>
    );
};

export default ResultsHome;