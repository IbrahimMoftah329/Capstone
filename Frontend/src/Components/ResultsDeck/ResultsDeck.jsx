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
    // Set the first deck as the default selected deck if available
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
          console.log(data);
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
    <div className='search-results-page'>
      {/* <div className='results-title'>Search Results</div> */}

          {/* This is the filter bar to switch between results home, deck, and quizzes */}
          <div className='filter-bar'>
            <button className='filter-button' onClick={onShowHome}>All Results</button>
            <button className='filter-button active' onClick={onShowDeck}>Decks</button>
            <button className='filter-button' onClick={onShowQuiz}>Quizzes</button>
          </div>

          <div className = 'results-container'>
            {/* This is the deck results list */}
            <div className='results-list'>
              <div className='results-list-inner'>
                <div className ='deck-quiz'>Decks</div>
                  {filteredResults.length > 0 ? (
                    filteredResults.map(deck => (
                      <div className='result-deck-item' onClick={() => handleDeckSelect(deck)}>
                        <div className='deck-name'>{deck.name}</div>
                        <div className='deck-info'>
                          {deck.__v} Cards | Professor: {deck.professor}
                        </div>
                        <button className = 'add_favorite' onClick={(e) => {e.stopPropagation(), toggleFavoriteDeck(deck._id)}}>Favorite</button>
                      </div>
                    ))
                  ) : (
                    <p className='no-results'>No results found.</p>
                  )}
              </div>
            </div>
                
            {/* This is a preview of the deck details */}
            <div className='deck-details'>
              <div className='deck-details-inner'>
                <div className = 'deck-quiz'>Preview</div>
                  {filteredResults.length > 0 && selectedDeck ? (
                  <>
                    <h2 className='deck-name'>{selectedDeck.name}</h2>          
                    {flashcards.length > 0 ? (
                      <div>
                        {flashcards.map((flashcard) => (
                          <div className = 'result-flashcard-content'>
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
