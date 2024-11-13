import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { BsSuitDiamondFill } from "react-icons/bs";
import './DashShuffle.css'; // Ensure proper path for CSS

const DashShuffle = () => {
    const { isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]); // State to store flashcards
    const [shuffledCards, setShuffledCards] = useState([]); // State to store shuffled cards
    const [selectedCards, setSelectedCards] = useState([]); // Cards that are selected for matching
    const [matchedCards, setMatchedCards] = useState([]); // State to store matched cards
    const [gameOver, setGameOver] = useState(false); // Game over state

    if (!isSignedIn) return null; // Ensure user is signed in before displaying content

    // Fetch flashcards for shuffle game
    const getFlashcards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${user._id}/flashcards`)
            .then((response) => response.json())
            .then((data) => {
                setFlashcards(data); // Update flashcards state with data
                shuffleCards(data); // Call shuffleCards function to shuffle the fetched cards
            });
    };

    // Shuffle cards and select 8 for the game
    const shuffleCards = (cards) => {
        const selectedCards = cards.slice(0, 8).map(card => ({
            id: card._id,
            question: card.question,
            answer: card.answer
        }));

        // Duplicate cards to form pairs (one question and one answer for each)
        const pairs = [...selectedCards, ...selectedCards];
        const shuffled = pairs.sort(() => Math.random() - 0.5); // Shuffle the pairs randomly
        setShuffledCards(shuffled); // Update the shuffledCards state with randomized cards
    };

    useEffect(() => {
        if (isSignedIn) {
            getFlashcards(); // Fetch flashcards on component mount
        }
    }, [isSignedIn]);

    // Handle card selection for matching
    const handleCardClick = (index) => {
        if (selectedCards.length === 2 || matchedCards.includes(index)) return; // Prevent multiple selections or re-clicking matched cards

        const newSelectedCards = [...selectedCards, index];
        setSelectedCards(newSelectedCards); // Update the selected cards

        if (newSelectedCards.length === 2) {
            const [firstCard, secondCard] = newSelectedCards;
            // Check if the question matches the answer (i.e., pair)
            if (
                shuffledCards[firstCard].question === shuffledCards[secondCard].answer ||
                shuffledCards[firstCard].answer === shuffledCards[secondCard].question
            ) {
                // If cards match, add them to matchedCards and reset selected cards
                setMatchedCards([...matchedCards, firstCard, secondCard]);
                setSelectedCards([]);
            } else {
                // If cards don't match, reset selected cards after a delay
                setTimeout(() => {
                    setSelectedCards([]);
                }, 1000);
            }
        }
    };

    // UseEffect to check if the game is over (all cards matched)
    useEffect(() => {
        if (matchedCards.length === shuffledCards.length) {
            setGameOver(true); // Set gameOver to true when all cards are matched
        }
    }, [matchedCards, shuffledCards]);

    return (
        <div className="shuffle-content">
            <h1 className="content-title">Shuffle <BsSuitDiamondFill /></h1>
            <div className="shuffle-box">
                {shuffledCards.length === 0 ? (
                    <p className="loading">Loading...</p>
                ) : gameOver ? (
                    <div className="game-over">Congratulations! You've matched all the cards!</div>
                ) : (
                    <div className="card-container">
                        {shuffledCards.map((card, index) => (
                            <div
                                key={index}
                                className={`card ${selectedCards.includes(index) || matchedCards.includes(index) ? 'pop-up' : ''}`}
                                onClick={() => handleCardClick(index)}
                            >
                                <div className="card-front">
                                    <p>{selectedCards.includes(index) || matchedCards.includes(index) ? card.answer : card.question}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashShuffle;
