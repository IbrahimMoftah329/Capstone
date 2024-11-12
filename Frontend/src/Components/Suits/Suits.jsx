import React from 'react'
import './Suits.css'

const SEMESTER_SUITS = {
    'Winter 2025' : {symbol: '♠', color: '#000000'},
    'Winter 2024': { symbol: '♠', color: '#000000' },
    'Winter 2023': { symbol: '♠', color: '#000000' },
    'Winter 2022': { symbol: '♠', color: '#000000' },
    'Fall 2025': { symbol: '♥', color: '#e31b23' },
    'Fall 2024': { symbol: '♥', color: '#e31b23' },
    'Fall 2023': { symbol: '♥', color: '#e31b23' },
    'Fall 2022': { symbol: '♥', color: '#e31b23' },
    'Summer 2025': { symbol: '♣', color: '#000000' },
    'Summer 2024': { symbol: '♣', color: '#000000' },
    'Summer 2023': { symbol: '♣', color: '#000000' },
    'Summer 2022': { symbol: '♣', color: '#000000' },
    'Spring 2025': { symbol: '♦', color: '#e31b23' },
    'Spring 2024': { symbol: '♦', color: '#e31b23' },
    'Spring 2023': { symbol: '♦', color: '#e31b23' },
    'Spring 2022': { symbol: '♦', color: '#e31b23' }
  };
  
  const getDefaultSuit = () => ({ symbol: '♠', color: '#000000' });


  const Suits = ({ deck, flashcards, currentCardIndex, isFlipped, onFlip }) => {
    const suit = SEMESTER_SUITS[deck?.semester] || getDefaultSuit();
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