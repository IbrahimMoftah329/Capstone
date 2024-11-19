import React, { useState, useEffect } from 'react';
import { BsSuitDiamondFill } from "react-icons/bs";
import './DashShuffle.css';
import { useUser } from '@clerk/clerk-react';

const DashShuffle = () => {
    const [decks, setDecks] = useState([]);
    const [shuffledCards, setShuffledCards] = useState([]);
    const [displayedCards, setDisplayedCards] = useState([]); // 4x4 grid cards
    const [remainingCards, setRemainingCards] = useState([]); // Remaining cards not on the grid
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedDeckName, setSelectedDeckName] = useState('');
    const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    // Fetch decks from the server
    const getDecks = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/user/${user.id}/decks`)
            .then((response) => response.json())
            .then((data) => {
                setDecks(data);
                setIsLoading(false);
            })
            .catch((error) => console.error("Error fetching decks:", error));
    };

    // Fetch flashcards for the selected deck
    const getFlashcards = (deckId, deckName) => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deckId}/flashcards`)
            .then((response) => response.json())
            .then((data) => {
                const cards = [];
                data.forEach((flashcard) => {
                    cards.push({ id: flashcard.id, type: 'question', content: flashcard.question });
                    cards.push({ id: flashcard.id, type: 'answer', content: flashcard.answer });
                });
                const shuffled = cards.sort(() => Math.random() - 0.5);
                setShuffledCards(shuffled);
                setDisplayedCards(shuffled.slice(0, 16)); // Display the first 16 cards
                setRemainingCards(shuffled.slice(16)); // Store remaining cards
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

    // Handle card selection
    const handleCardClick = (index) => {
        if (selectedCards.length === 2 || !displayedCards[index]) return;

        const newSelectedCards = [...selectedCards, index];
        setSelectedCards(newSelectedCards);

        if (newSelectedCards.length === 2) {
            const [firstCard, secondCard] = newSelectedCards;
            const first = displayedCards[firstCard];
            const second = displayedCards[secondCard];

            if (first.id === second.id && first.type !== second.type) {
                // Cards match correctly
                setTimeout(() => {
                    handleMatch(firstCard, secondCard);
                }, 500);
            } else {
                // Cards do not match
                setTimeout(() => {
                    setSelectedCards([]);
                }, 1000);
            }
        }
    };

    // Handle matched cards
    const handleMatch = (firstIndex, secondIndex) => {
        const newDisplayedCards = [...displayedCards];
        newDisplayedCards[firstIndex] = remainingCards[0] || null;
        newDisplayedCards[secondIndex] = remainingCards[1] || null;

        setDisplayedCards(newDisplayedCards.filter(Boolean)); // Remove nulls
        setRemainingCards(remainingCards.slice(2)); // Update remaining cards
        setSelectedCards([]);
    };

    // Close flashcard modal
    const closeFlashcardModal = () => {
        setIsFlashcardModalOpen(false);
        setShuffledCards([]);
        setDisplayedCards([]);
        setRemainingCards([]);
        setSelectedDeckName('');
        setSelectedCards([]);
    };

    return (
        <div className="shuffle-content">
            <h1 className="shuffle-title">Shuffle <BsSuitDiamondFill /></h1>
            <div className="shuffle-top">
                <p className="shuffle-description">View and manage your shuffled decks here.</p>
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

            {/* Modal for displaying shuffled flashcards */}
            {isFlashcardModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Match the Cards from {selectedDeckName}</h2>
                        {displayedCards.length === 0 ? (
                            <p>No cards remaining.</p>
                        ) : (
                            <div className="flashcard-grid">
                                {displayedCards.map((card, index) => (
                                    <div
                                        key={index}
                                        className={`flashcard-card ${
                                            selectedCards.includes(index) ? 'selected' : ''
                                        }`}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <h3>{card.type === 'question' ? 'Q:' : 'A:'}</h3>
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
    );
};

export default DashShuffle;

