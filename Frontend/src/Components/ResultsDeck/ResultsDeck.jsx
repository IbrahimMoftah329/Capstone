import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './ResultsDeck.css';

const ResultsDeck = () => {
  const location = useLocation();
  const { filteredResults } = location.state || { filteredResults: [] };
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    loadFavorites();
    
    if (filteredResults.length > 0) {
      const firstDeck = filteredResults[0];
      setSelectedDeck(firstDeck);
      getFlashcards(firstDeck);
    }
  }, [filteredResults]);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favoriteDecks');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
    getFlashcards(deck);
  };

  const toggleFavorite = async (e, deck) => {
    e.stopPropagation();
    
    // Get the latest favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteDecks');
    const currentFavorites = savedFavorites ? JSON.parse(savedFavorites) : {};
    
    const newFavorites = {
      ...currentFavorites,
      [deck._id]: !currentFavorites[deck._id]
    };

    // If adding to favorites, store the full deck data
    if (newFavorites[deck._id]) {
      const favoritedDecksData = localStorage.getItem('favoritedDecksData') || '{}';
      const decksData = JSON.parse(favoritedDecksData);
      decksData[deck._id] = deck;
      localStorage.setItem('favoritedDecksData', JSON.stringify(decksData));
    }

    // Update localStorage and state
    localStorage.setItem('favoriteDecks', JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('favoritesUpdated', {
      detail: { favorites: newFavorites }
    }));
  };

  const getFlashcards = async (deck) => {
    if (deck && deck._id) {
      try {
        const response = await fetch(`http://localhost:4000/api/flashcards/deck/${deck._id}/flashcards`);
        const data = await response.json();
        if (response.ok) {
          setFlashcards(data);
        }
      } catch (error) {
        console.error("Error fetching flashcards", error);
      }
    }
  };

  return (
    <div className='search-results-page'>
      <div className='results-title'>Search Results</div>
      <div className='results-container'>
        <div className='results-list'>
          <div className='results-list-inner'>
            <div className='deck-quiz'>Decks</div>
            {filteredResults.length > 0 ? (
              filteredResults.map(deck => (
                <div 
                  key={deck._id}
                  className='result-deck-item' 
                  onClick={() => handleDeckSelect(deck)}
                >
                  <div className='deck-info-container'>
                    <div className='deck-name'>{deck.name}</div>
                    <div className='deck-info'>
                      {deck.__v} Cards | Professor: {deck.professor}
                    </div>
                  </div>
                  <div 
                    className="favorite-icon-wrapper"
                    onClick={(e) => toggleFavorite(e, deck)}
                  >
                    {favorites[deck._id] ? (
                      <FaHeart className="favorite-icon favorite-active" color="#ff0000" size={20} />
                    ) : (
                      <FaRegHeart className="favorite-icon" color="#e31b23" size={20} />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className='no-results'>No results found.</p>
            )}
          </div>
        </div>

        <div className='deck-details'>
          <div className='deck-details-inner'>
            <div className='deck-quiz'>Preview</div>
            {filteredResults.length > 0 && selectedDeck ? (
              <>
                <h2 className='deck-name'>{selectedDeck.name}</h2>          
                {flashcards.length > 0 ? (
                  <div>
                    {flashcards.map((flashcard) => (
                      <div key={flashcard._id} className='result-flashcard-content'>
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
      </div>
    </div>
  );
};

export default ResultsDeck;