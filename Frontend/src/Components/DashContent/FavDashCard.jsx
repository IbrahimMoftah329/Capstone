import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import nextArrow from '/Users/ninapham/Desktop/OCT /Capstone/Frontend/src/assets/arrow.jpg';
// import backArrow from '/Users/ninapham/Desktop/OCT /Capstone/Frontend/src/assets/arrow2.jpg';
import nextArrow from '../../assets/arrow.jpg';
import backArrow from '../../assets/arrow2.jpg';
import './DashCard.css'; // Optional CSS file for styling
import { useUser } from '@clerk/clerk-react';
import Suits from '../Suits/Suits';

const DashCard = () => {
    const location = useLocation();
    const { deck } = location.state || {}; // Retrieve the passed deck information
    const [flashcards, setFlashcards] = useState([]); // State for flashcards
    const {isSignedIn, user } = useUser();
    const [isStudyMode, setIsStudyMode] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!isSignedIn) {
        return;
    }

    const getFlashcards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deck._id}/flashcards`)
            .then((response) => response.json())
            .then((data) => {
                setFlashcards(data);
            })
    };

    useEffect(() => {
        getFlashcards();
    }, []);


    {/*study mode functions*/}

    const startStudy = () => {
        if (flashcards.length === 0) {
            alert('Please add some flashcards first!');
            return;
        }
        setIsStudyMode(true);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const nextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const previousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    // Function to exit the study mode
    const exitStudyMode = () => {
        setIsStudyMode(false);
        setCurrentCardIndex(0); // Optionally reset the index when exiting
        setIsFlipped(false); // Reset the flip state
    };

    // Function to start/restart the study mode
    const restartStudy = () => {
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const flipCard = () => {
        setIsFlipped((prevIsFlipped) => !prevIsFlipped); // Toggle isFlipped state on each call
    };

    // Event listener for keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isStudyMode) {
                if (event.key === 'ArrowLeft') {
                    previousCard();
                } else if (event.key === 'ArrowRight') {
                    nextCard();
                } else if (event.key === ' ') {
                    event.preventDefault(); // Prevent page scrolling on spacebar press
                    flipCard();
                } else if (event.key === 'Escape') {
                    exitStudyMode(); // Exit study mode on Esc key
                } else if (event.key.toLowerCase() === 'r') {
                    restartStudy(); // Restart study mode on R key
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isStudyMode, currentCardIndex, isFlipped]);

    return (
        <div className="flashcard-content">
            <h1 className="content-title">{deck ? deck.name : "Deck Details"}</h1>
            <div className="flashcard-box">
                <p className="content-description">{deck?.description}</p> {/* Use deck description */}
                <p>Created on: {deck?.createdAt}</p> {/* Show creation date */}
                <p>Professor: {deck?.professor}</p> {/* Show creation date */}
                <p>Semester: {deck?.semester}</p> {/* Show creation date */}
                <h2>Flashcards</h2>
                <div className="flashcard-list" style={{ width: '100%' }}>
                    {flashcards.map((card) => (
                        <div key={card._id} className="flashcard-item">
                            <div className="flashcard-prompt">
                                <p>{card.question}</p>
                            </div>
                            <div className="flashcard-response">
                                <p>{card.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Study Mode Flashcard Modal */}
                {isStudyMode && (
                    <div className="study-mode-modal">
                        <div className="study-mode-modal-content">
                             <div className="study-mode-container">
                                <div className="study-mode">
                                    <h2>Study Flashcards</h2>
                                    {/* Suits Component */}
                                    <Suits deck={deck} flashcards={flashcards} currentCardIndex={currentCardIndex} isFlipped={isFlipped} onFlip={flipCard}/>
                                    {/* Carousel Navigation */}
                                    <div className="carousel-indicators">
                                        {flashcards.map((_, index) => (
                                        <button key={index} className={`carousel-dot ${index === currentCardIndex ? 'active' : ''}`} onClick={() => { 
                                            setCurrentCardIndex(index);
                                            setIsFlipped(false);
                                        }}/>
                                        ))}
                                    </div>

                                    {/* Control Buttons */}
                                    <div className="card-buttons-studymode">
                                        <button className="prev-button-studymode" onClick={previousCard} disabled={currentCardIndex === 0}>
                                        <img src={backArrow} alt="previous" />
                                        </button>
                                        <button className="restart-button-studymode" onClick={() => { 
                                            setCurrentCardIndex(0); 
                                            setIsFlipped(false); 
                                        }}
                                        >
                                            Restart
                                        </button>
                                        <button 
                                            className="exit-button-studymode" 
                                            onClick={() => setIsStudyMode(false)}
                                        >
                                            Exit
                                        </button>

                                        <button 
                                            className="next-buttons-studymode" 
                                            onClick={nextCard} 
                                            disabled={currentCardIndex === flashcards.length - 1}
                                        >
                                            <img src={nextArrow} alt="next" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Regular Study Button (when modal is closed) */}
                {!isStudyMode && (
                    <button className="study-button" onClick={startStudy}>
                        Study Flashcards
                    </button>
                )}
                
            </div>
        </div>
    );
};

export default DashCard;
