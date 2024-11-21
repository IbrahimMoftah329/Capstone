import React, { useState, useEffect } from 'react';
import { IoIosHeart } from "react-icons/io";
import './DashContent.css';

const DashFav = () => {
  const [favoritedDecks, setFavoritedDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteDecks = () => {
      try {
        // Get favorite flags
        const savedFavorites = localStorage.getItem('favoriteDecks');
        if (!savedFavorites) {
          setFavoritedDecks([]);
          setLoading(false);
          return;
        }

        const favorites = JSON.parse(savedFavorites);
        
        // Get stored deck data
        const savedDecksData = localStorage.getItem('favoritedDecksData');
        const decksData = savedDecksData ? JSON.parse(savedDecksData) : {};

        // Create array of favorited decks
        const favorited = Object.entries(favorites)
          .filter(([_, isFavorited]) => isFavorited)
          .map(([deckId]) => decksData[deckId])
          .filter(deck => deck !== undefined);

        setFavoritedDecks(favorited);
      } catch (error) {
        console.error("Error loading favorite decks:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    loadFavoriteDecks();

    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      loadFavoriteDecks();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  const removeFavorite = (deckId) => {
    // Update favorites flags
    const savedFavorites = localStorage.getItem('favoriteDecks');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      const newFavorites = {
        ...favorites,
        [deckId]: false
      };
      localStorage.setItem('favoriteDecks', JSON.stringify(newFavorites));
      
      // Update decks data
      const savedDecksData = localStorage.getItem('favoritedDecksData');
      if (savedDecksData) {
        const decksData = JSON.parse(savedDecksData);
        delete decksData[deckId];
        localStorage.setItem('favoritedDecksData', JSON.stringify(decksData));
      }

      // Update state
      setFavoritedDecks(prevDecks => prevDecks.filter(deck => deck._id !== deckId));

      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('favoritesUpdated', {
        detail: { favorites: newFavorites }
      }));
    }
  };

  return (
    <div className="content">
      <h1 className="content-title">Favorites <IoIosHeart /></h1>
      {loading ? (
        <div className="loading-message">Loading your favorite decks...</div>
      ) : (
        <div className="favorites-container">
          {favoritedDecks.length > 0 ? (
            <div className="favorites-grid">
              {favoritedDecks.map((deck) => (
                <div key={deck._id} className="favorite-card">
                  <div className="favorite-card-content">
                    <h2 className="favorite-deck-name">{deck.name}</h2>
                    <div className="favorite-deck-details">
                      <span className="card-count">{deck.__v} Cards</span>
                      <span className="professor-name">Professor: {deck.professor}</span>
                    </div>
                  </div>
                  <IoIosHeart 
                    className="favorite-heart-icon"
                    onClick={() => removeFavorite(deck._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-favorites-message">
              No favorite decks yet. Mark some decks as favorites to see them here!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashFav;