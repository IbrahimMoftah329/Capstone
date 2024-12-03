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
    const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);


    const getDecks = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/user/${user.id}/decks`)
            .then((response) => response.json())
            .then((data) => {
                setDecks(data);
                setIsLoading(false);
            })
            .catch((error) => console.error("Error fetching decks:", error));
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
                setShuffledCards(shuffled);
                setDisplayedCards(shuffled.slice(0, 16));
                setRemainingCards(shuffled.slice(16));
                setSelectedDeckName(deckName);
                setIsFlashcardModalOpen(true);
            })
            .catch((error) => console.error("Error fetching flashcards:", error));
    };

    useEffect(() => {
        if (user) {
            getDecks();
        }
    }, [user]);

    const handleCardClick = (index) => {
        if (selectedCards.length === 2 || !displayedCards[index]) return;

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
        newDisplayedCards[firstIndex] = remainingCards[0] || null;
        newDisplayedCards[secondIndex] = remainingCards[1] || null;
        setDisplayedCards(newDisplayedCards.filter(Boolean));
        setRemainingCards(remainingCards.slice(2));
        setSelectedCards([]);
    };

    const closeFlashcardModal = () => {
        setIsFlashcardModalOpen(false);
        setShuffledCards([]);
        setDisplayedCards([]);
        setRemainingCards([]);
        setSelectedDeckName('');
        setSelectedCards([]);
    };

    return (
        <div className="shuffle-page-containers">
            <div className="shuffle-contents">
                <h1 className="shuffle-title">Shuffle <GiCardJoker /></h1>  
                <p>View your shuffled decks here.</p>  
                <br></br>
                <div className="library-content-bottoms">
                    <div className="shuffle-top">
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
                                        <br></br>
                                        <button
                                            className="shuffle-button"
                                            onClick={() => getFlashcards(deck._id, deck.name)}
                                        >
                                            Shuffle
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {isFlashcardModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            {displayedCards.length === 0 ? (
                                <p>No cards remaining.</p>
                            ) : (
                                <div className="shuffle-flashcard-grid">
                                    {displayedCards.map((card, index) => (
                                        <div
                                            key={index}
                                            className={`shuffle-flashcard-card ${
                                                selectedCards.includes(index) ? 'selected' : ''
                                            }`}
                                            onClick={() => handleCardClick(index)}
                                        >
                                            <p>{card.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="modal-buttons">
                                <button type="button" onClick={closeFlashcardModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashShuffle;