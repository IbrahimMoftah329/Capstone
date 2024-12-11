import React, { useState, useEffect } from 'react';
import { GiCardJoker } from "react-icons/gi";
import './DashShuffle.css';
import { useUser } from '@clerk/clerk-react';

const DashShuffle = () => {
    const [decks, setDecks] = useState([]);
    const [shuffledCards, setShuffledCards] = useState([]);
    const [displayedCards, setDisplayedCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedDeckName, setSelectedDeckName] = useState('');
    const [selectedDeckId, setSelectedDeckId] = useState('');
    const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
    const [isAttemptsModalOpen, setIsAttemptsModalOpen] = useState(false); // New state for Attempts modal
    const [isLoading, setIsLoading] = useState(true);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isGameCompleted, setIsGameCompleted] = useState(false);
    const [deckAttempts, setDeckAttempts] = useState([]); // State for specific deck attempts
    const { user } = useUser();


    // Card suits for randomization
    const suits = ['♠', '♥', '♦', '♣'];
    const [cardSuits, setCardSuits] = useState([]);

    const getDecks = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/user/${user.id}/decks`)
            .then((response) => response.json())
            .then((data) => {
                setDecks(data);
                setIsLoading(false);
            })
            .catch((error) => console.error("Error fetching decks:", error));
    };
        // Save a shuffle attempt
        const saveAttempt = async () => {
            const newAttempt = {
                userId: user.id,
                deckId: selectedDeckId,
                deckName: selectedDeckName,
                timeElapsed,
            };

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/shuffle/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newAttempt),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error saving attempt:', errorData);
                } else {
                    console.log('Attempt saved successfully');
                }
            } catch (error) {
                console.error('Error saving attempt:', error);
            }
        };
  // Fetch attempts for a specific deck
  const getDeckAttempts = async (deckId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/shuffle/user/${user.id}/deck/${deckId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            setDeckAttempts(data);
            setIsAttemptsModalOpen(true); // Open the modal
        } else {
            console.error('Expected an array but got:', typeof data);
            setDeckAttempts([]);
        }
    } catch (error) {
        console.error('Error fetching deck attempts:', error);
        setDeckAttempts([]); // Fallback to an empty array on error
    }
};

const getFlashcards = (deckId, deckName) => {
    fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deckId}/flashcards`)
        .then((response) => response.json())
        .then((data) => {
            const cards = [];
            data.forEach((flashcard) => {
                cards.push({ 
                    id: flashcard._id, 
                    type: 'question', 
                    content: flashcard.question,
                });
                cards.push({ 
                    id: flashcard._id, 
                    type: 'answer', 
                    content: flashcard.answer,
                });
            });
            const shuffled = cards.sort(() => Math.random() - 0.5);
            
            // Generate random suits for the cards
            const randomSuits = shuffled.map(() => 
                suits[Math.floor(Math.random() * suits.length)]
            );
            
            setCardSuits(randomSuits);
            setShuffledCards(shuffled);
            setDisplayedCards(shuffled.slice(0, 16));
            setRemainingCards(shuffled.slice(16));
            setSelectedDeckName(deckName);
            setSelectedDeckId(deckId); // Make sure to set the deck ID
            setIsFlashcardModalOpen(true);
            setTimeElapsed(0); // Reset timer
            setIsTimerRunning(true); // Start timer
        })
        .catch((error) => console.error("Error fetching flashcards:", error));
};

 // Timer logic
 useEffect(() => {
    let timer;
    if (isTimerRunning) {
        const startTime = Date.now() - (timeElapsed * 10); // Convert to milliseconds
        timer = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000; // Convert back to seconds
            setTimeElapsed(Number(elapsedTime.toFixed(2))); // Round to 2 decimal places
        }, 10); // Update every 10ms for smoother display
    }
    return () => clearInterval(timer);
}, [isTimerRunning]);


const handleCardClick = (index) => {
    if (selectedCards.length === 2 || !displayedCards[index] || displayedCards[index].matched) return;

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
        const [firstCard, secondCard] = newSelectedCards;
        const first = displayedCards[firstCard];
        const second = displayedCards[secondCard];

        if (first.id === second.id && first.type !== second.type) {
            setTimeout(() => {
                handleMatch(firstCard, secondCard);
            }, 500);
        } else {
            setTimeout(() => {
                setSelectedCards([]);
            }, 1000);
        }
    }
};

const handleMatch = (firstIndex, secondIndex) => {
    const newDisplayedCards = [...displayedCards];
    newDisplayedCards[firstIndex] = { matched: true };
    newDisplayedCards[secondIndex] = { matched: true };

    setDisplayedCards(newDisplayedCards);
    setSelectedCards([]);

    // Check if all cards are matched
    const allMatched = newDisplayedCards.every((card) => card.matched || !card);
    if (allMatched) {
        setIsTimerRunning(false); // Stop timer when game is completed
        setIsGameCompleted(true);
        saveAttempt();
    }
};
const closeFlashcardModal = () => {
    setIsTimerRunning(false); // Stop the timer when closing modal
    setIsFlashcardModalOpen(false);
    setShuffledCards([]);
    setDisplayedCards([]);
    setRemainingCards([]);
    setSelectedDeckName('');
    setSelectedDeckId('');
    setSelectedCards([]);
    setTimeElapsed(0);
    setIsGameCompleted(false);
};

const closeAttemptsModal = () => {
    setIsAttemptsModalOpen(false);
    setDeckAttempts([]);
};

useEffect(() => {
    if (user) {
        getDecks();
    }
}, [user]);

        return (
            <div className="shuffle-page-containers">
                <div className="shuffle-contents">
                    <h1 className="shuffle-title">Shuffle <GiCardJoker /></h1>
                    <div className="shuffle-top">
                        <p className="shuffle-description">View your shuffled decks here.</p>
                        <br></br>
                        <div className="shuffle-list">
                            {isLoading ? (
                                <p>Loading decks...</p>
                            ) : decks.length === 0 ? (
                                <p>No decks available. Create one to start shuffling!</p>
                            ) : (
                                decks.map((deck) => (
                                    <div key={deck._id} className="shuffle-item">
                                        <h3>{deck.name}</h3>
                                        <p>{deck.flashcards.length} cards</p>
                                        <div className="shuffle-buttons">
                                            <button
                                                className="shuffle-button"
                                                onClick={() => getFlashcards(deck._id, deck.name)}
                                            >
                                                Shuffle
                                            </button>
                                            <button
                                                className="shuffle-button"
                                                onClick={() => getDeckAttempts(deck._id)}
                                            >
                                                Attempts
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
    
                    {isFlashcardModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Match the Cards from {selectedDeckName}</h2>
                                <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
                                {isGameCompleted ? (
                                    <div className="completion-content">
                                        <h2>Congratulations!</h2>
                                        <p>You completed the deck in {timeElapsed.toFixed(2)} seconds!</p>
                                        <button onClick={closeFlashcardModal}>Close</button>
                                    </div>
                                ) : (
<div className="shuffle-flashcard-grid">
    {displayedCards.map((card, index) => {
        const suit = cardSuits[index] || '♠';
        const isRedSuit = suit === '♥' || suit === '♦';
        return (
            <div
                key={index}
                className={`shuffle-flashcard-card ${
                    selectedCards.includes(index) ? 'selected' : ''
                } ${card.matched ? 'matched' : ''} ${isRedSuit ? 'red-suit' : ''}`}
                onClick={() => handleCardClick(index)}
            >
                {!card.matched ? (
                    <>
                        <div className="card-corners">
                            <span className="suit">{suit}</span>
                        </div>
                        <div className="shuffle-flashcard-card-content">
                            <h3>{card.type === 'question'}</h3>
                            <p>{card.content}</p>
                        </div>
                        <div className="card-corners-bottom-right">
                            <span className="suit">{suit}</span>
                        </div>
                    </>
                ) : null}
            </div>
        );
    })}
</div>
                                )}
                                {!isGameCompleted && (
                                    <div className="modal-buttons">
                                        <button type="button" onClick={closeFlashcardModal}>Close</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
 {isAttemptsModalOpen && (
   <div className="modal-attempts">
       <div className="modal-attempts-content">
           <h2 className="leaderboard-title">Your Top Times</h2>
           <div className="leaderboard-container">
               {deckAttempts.length === 0 ? (
                   <p className="no-attempts">No attempts recorded yet. Be the first!</p>
               ) : (
                   <div className="podium-leaderboard">
                       {[...deckAttempts]
                           .sort((a, b) => a.timeElapsed - b.timeElapsed)
                           .slice(0, 3)
                           .map((attempt, index) => {
                               const displayOrder = index === 0 ? 1 : index === 1 ? 2 : 3;
                               return (
                                   <div 
                                       key={index} 
                                       className={`podium-entry position-${displayOrder}`}
                                       style={{'--animation-order': displayOrder}}
                                   >
                                       <div className="podium-platform">
                                           <div className="score-content">
                                               <div className="medal">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</div>
                                               <div className="time">{attempt.timeElapsed}s</div>
                                               <div className="date">{new Date(attempt.createdAt).toLocaleDateString()}</div>
                                           </div>
                                           <div className="platform-block">
                                               <span className="rank-number">{index + 1}</span>
                                           </div>
                                       </div>
                                   </div>
                               );
                           })}
                   </div>
               )}
           </div>
           <button className="close-button" onClick={closeAttemptsModal}>Close</button>
       </div>
   </div>
)}
                </div>
            </div>
        );
    };

export default DashShuffle;
