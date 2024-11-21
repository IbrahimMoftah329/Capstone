import React from 'react'
import './Suits.css'

const getSemesterInfo = (semester) => {
    if (!semester) return { symbol: '♠', color: '#000000' };

    // Split semester string into season and year
    const [season] = semester.split(' ');

    // Define fixed suits for each season
    const seasonSuits = {
        'Winter': { symbol: '♠', color: '#000000' },
        'Spring': { symbol: '♦', color: '#e31b23' },
        'Summer': { symbol: '♣', color: '#000000' },
        'Fall': { symbol: '♥', color: '#e31b23' }
    };

    // Return the suit for the season or default if season not found
    return seasonSuits[season] || { symbol: '♠', color: '#000000' };
};

const Suits = ({ deck, flashcards, currentCardIndex, isFlipped, onFlip }) => {
    const suit = getSemesterInfo(deck?.semester);
    return (
        <div className="study-mode-suit">
            <div className="card-info-suit">
                Card {currentCardIndex + 1} of {flashcards.length}
            </div>

            <div className="flashcard-scene-suit">
                <div 
                    className={`flashcard-study-suit ${isFlipped ? 'is-flipped' : ''}`} 
                    onClick={onFlip}
                    style={{ '--suit-color': suit.color }}
                >
                    <div className="flashcard-face-suit flashcard-face-front-suit">
                        <div className="inner-border"></div>
                        <div className="suit-top">{suit.symbol}</div>
                        <div className="flashcard-content-suit">
                            {flashcards[currentCardIndex].question}
                        </div>
                        <div className="suit-bottom">{suit.symbol}</div>
                    </div>
                    <div className="flashcard-face-suit flashcard-face-back">
                        <div className="inner-border"></div>
                        <div className="suit-top">{suit.symbol}</div>
                        <div className="flashcard-content-suit">
                            {flashcards[currentCardIndex].answer}
                        </div>
                        <div className="suit-bottom">{suit.symbol}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Suits;