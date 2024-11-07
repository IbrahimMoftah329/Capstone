import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsDeck.css'; // Ensure to create appropriate styles


// const ResultsDeck = () => {
//     const location = useLocation();
//     const { filteredResults } = location.state || { filteredResults: [] };

//     return (
//         <div className='results-box'>
//             <h1 id = 'deck-quiz'>Decks</h1>
//           {filteredResults.length > 0 ? (
//             <div className='results-grid'>
//               {filteredResults.map(deck => (
//                 <div className='deck-card' key={deck._id}>
//                   <h2 className='deck-name'>{deck.name}</h2>
//                   <p className='deck-description'>{deck.description}</p>
//                   <p className='deck-details'>
//                     <span className='deck-professor'>Professor: {deck.professor}</span>
//                     <span className='deck-semester'> Semester: {deck.semester}</span>
//                   </p>
//                   <button className='view-button'>View Details</button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className='no-results'>No results found.</p>
//           )}
//         </div>
//       );
// }

// export default ResultsDeck


const ResultsDeck = () => {
  const location = useLocation();
  const { filteredResults } = location.state || { filteredResults: [] };
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    // Set the first deck as the default selected deck if available
    if (filteredResults.length > 0) {
      setSelectedDeck(filteredResults[0]);
    }
  }, [filteredResults]);

  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
  };

  return (
    <div className='results-container'>
      <div className='results-list' style={{ width: '20%', float: 'left' }}>
        <h1 id='deck-quiz'>Decks</h1>
        {filteredResults.length > 0 ? (
          filteredResults.map(deck => (
            <div
              className='deck-item'
              key={deck._id}
              onClick={() => handleDeckSelect(deck)}
            >
              <h2 className='deck-name'>{deck.name}</h2>
              <p className='deck-info'>
                {deck.flashcards.length} Cards | Professor: {deck.professor}
              </p>
            </div>
          ))
        ) : (
          <p className='no-results'>No results found.</p>
        )}
      </div>

      <div className='deck-details' style={{ width: '75%', float: 'right', marginLeft: '5%' }}>
        {filteredResults.length > 0 && selectedDeck ? (
          <>
            <h2 className='deck-name'>{selectedDeck.name}</h2>
            <p className='deck-description'>{selectedDeck.description}</p>
            <p className='deck-details'>
              <span className='deck-professor'>Professor: {selectedDeck.professor}</span>
              <span className='deck-semester'> Semester: {selectedDeck.semester}</span>
            </p>
            <h3>Flashcards:</h3>
            {selectedDeck.flashcards.length > 0 ? (
              <ul>
                {selectedDeck.flashcards.map((flashcardId, index) => (
                  <li key={flashcardId}>Flashcard {index + 1}: {flashcardId}</li>
                ))}
              </ul>
            ) : (
              <p>No flashcards available.</p>
            )}
          </>
        ) : (
          <h2>Flashcards</h2>
        )}
      </div>
    </div>
  );
};

export default ResultsDeck;


