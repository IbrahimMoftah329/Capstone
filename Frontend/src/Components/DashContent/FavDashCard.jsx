import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './DashCard.css';
import nextArrow from '../../assets/arrow.jpg';
import backArrow from '../../assets/arrow2.jpg';

const FavDashCard = () => {
    const location = useLocation();
    const { deck } = location.state || {}; // Retrieve the passed deck information
    const [flashcards, setFlashcards] = useState([]); // State for flashcards

    const [isStudyMode, setIsStudyMode] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => { getFlashcards() }, []);

    const getFlashcards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deck._id}/flashcards`)
            .then((response) => response.json())
            .then((data) => {
                setFlashcards(data);
            })
    };

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

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flashcard-content">
            <h1 className="content-title">{deck.name}</h1>
            <div className="flashcard-box">
                <p className="content-description" style={{ paddingBottom: "10px", paddingRight: "35px" }}>{deck.description}</p> {/* Use deck description */}
                <p>Created on: {
                    new Date(deck.createdAt).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric'
                    })
                }</p> {/* Show creation date */}
                <p>Professor: {deck.professor}</p> {/* Show creation date */}
                <p>Semester: {deck.semester}</p> {/* Show creation date */}
                <p>Number of Flashcards: {deck.flashcards.length} cards</p>

                {/* Start Study Mode Button */}
                <button className="study-button" onClick={startStudy}>Start Study Mode</button>
                
                <h2 style={{ paddingTop: "10px" }}>Flashcards:</h2>
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
                                    <div className="card-info">Card {currentCardIndex + 1} of {flashcards.length}</div>
                                    <div className="flashcard" onClick={flipCard}>
                                        <div className="flashcard-contents">
                                            {isFlipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}
                                        </div>
                                    </div>

                                    <div className="card-buttons-studymode">
                                        <button className="prev-button-studymode" onClick={previousCard} disabled={currentCardIndex === 0}>
                                            <img src={backArrow} alt="previous" />
                                        </button>
                                        <button className="restart-button-studymode" onClick={() => { setCurrentCardIndex(0); setIsFlipped(false); }}>Restart</button>
                                        <button className="exit-button-studymode" onClick={() => setIsStudyMode(false)}>Exit</button>
                                        <button className="next-buttons-studymode" onClick={nextCard} disabled={currentCardIndex === flashcards.length - 1}>
                                            <img src={nextArrow} alt="next" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FavDashCard;
