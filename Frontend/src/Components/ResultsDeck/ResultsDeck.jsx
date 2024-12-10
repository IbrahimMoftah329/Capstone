import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './ResultsDeck.css';


const ResultsDeck = ({ onShowHome, onShowDeck, onShowQuiz }) => {
  const location = useLocation();
  const { filteredResults } = location.state || { filteredResults: [] };
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const { user } = useUser();             // Get user context from Clerk
  const userId = user ? user.id : null;   // Get the logged-in user's ID

  useEffect(() => {
    if (filteredResults.length > 0) {
      const firstDeck = filteredResults[0];
      setSelectedDeck(firstDeck);
      getFlashcards(firstDeck);
    }
  }, [filteredResults]);

  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
    getFlashcards(deck);
  };


  const getFlashcards = async (deck) => {
    if (deck && deck._id) {
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deck._id}/flashcards`);
        const data = await response.json();
        if (response.ok) {
          setFlashcards(data);
        }
      } catch (error) {
        console.error("Error fetching flashcards", error);
      }
    }
  };

  // Function used to send a post request of the deck._id to the backend server for adding/removing a favorite deck
  const toggleFavoriteDeck = async (deckID) => {
    try {
      // Check if there is a user logged in, if not prompt them to log in
      if (!userId) {
        alert('Please log in to add this deck to your favorites.');
        return;
      }
        
      // This response will send a POST to the server url with just the deck._id as the body, the backend server will handle the add/remove favorites
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${userId}/favDeck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        deckId: deckID,
        }),
      });
    } catch (error) {
      console.error('Error toggling favorite status', error);
    }
  };

  return (
    <div className='search-deck-page'>
      <div className='results-container-deck'>
        <div className='filter-bar-deck'>
          <button className='filter-button-deck' onClick={onShowHome}>All Results</button>
          <button className='filter-button-deck active' onClick={onShowDeck}>Decks</button>
          <button className='filter-button-deck' onClick={onShowQuiz}>Quizzes</button>
        </div>

        <div className='content-grid'>
          {/* Decks Column */}
          <div className='decks-column'>
            <div className='section-header'>
              <h2>Available Decks</h2>
              <span>{filteredResults.length} decks found</span>
            </div>
            <div className='decks-list'>
              {filteredResults.map(deck => (
                <div
                  key={deck._id}
                  className={`deck-card ${selectedDeck?._id === deck._id ? 'active' : ''}`}
                  onClick={() => handleDeckSelect(deck)}
                >
                  <h3>{deck.name}</h3>
                  <div className='deck-meta'>
                    <span>{deck.__v} Cards</span>
                    <span>•</span>
                    <span>Professor: {deck.professor}</span>
                  </div>
                  <button className = 'add_favorite' onClick={(e) => {e.stopPropagation(), toggleFavoriteDeck(deck._id)}}>Favorite</button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Column */}
          <div className='preview-column'>
            <div className='section-header'>
              <h2>Preview</h2>
            </div>
            <div className='preview-content'>
              {selectedDeck ? (
                <>
                  <div className='preview-header'>
                    <h3>{selectedDeck.name}</h3>
                    <div className='preview-meta'>
                      <span>{flashcards.length} Cards</span>
                      <span>•</span>
                      <span>Professor: {selectedDeck.professor}</span>
                    </div>
                  </div>
                  <div className='flashcards-list'>
                    {flashcards.map((card, index) => (
                      <div key={index} className='flashcard'>
                        <div className='flashcard-header'>Card {index + 1}</div>
                        <div className='flashcard-content'>
                          <div className='question'>{card.question}</div>
                          <div className='answer'>{card.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className='empty-state'>
                  <p>Select a deck to view its contents</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDeck;