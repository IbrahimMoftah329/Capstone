import React from 'react';
import './SearchResults.css';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { filteredResults } = location.state || { filteredResults: [] };

  return (
    <div className='results-box'>
      <h1 className='results-title'>Search Results</h1>
      {filteredResults.length > 0 ? (
        <div className='results-grid'>
          {filteredResults.map(deck => (
            <div className='deck-card' key={deck._id}>
              <h2 className='deck-name'>{deck.name}</h2>
              <p className='deck-description'>{deck.description}</p>
              <p className='deck-details'>
                <span className='deck-professor'>Professor: {deck.professor}</span>
                <span className='deck-semester'> Semester: {deck.semester}</span>
              </p>
              <button className='view-button'>View Details</button>
            </div>
          ))}
        </div>
      ) : (
        <p className='no-results'>No results found.</p>
      )}
    </div>
  );



};

export default SearchResults;
