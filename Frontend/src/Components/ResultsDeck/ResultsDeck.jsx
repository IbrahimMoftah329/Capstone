// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './ResultsDeck.css';

// Below is the code for showing the deck results as a grid.
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





import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsDeck.css';


const ResultsDeck = () => {
  const location = useLocation();
  const { filteredResults } = location.state || { filteredResults: [] };
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

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

  const handleQuizSelect = (quiz) => {
    
  }

  const getFlashcards = async (deck) => {
    
    if (deck && deck._id) {
      try{
        const response = await fetch(`http://localhost:4000/api/flashcards/deck/${deck._id}/flashcards`);
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

  const getQuestions = async (quiz) => {
    if (quiz && quiz.id) {
      try {
        const response_2 = await fetch(``)
      } catch (error) {
        console.error("Error fetching quiz questions", error);
      }
    }
  };

  return (
    <div className='search-results-page'>
      <div className='results-title'>Search Results</div>
      <div className = 'results-container'>
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
                </div>
              ))
            ) : (
              <p className='no-results'>No results found.</p>
            )}
          </div>
        </div>


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
        {/* <div className = 'deck-quiz'>Preview</div>
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
        </div> */}
      </div>

    </div>
  );
};

export default ResultsDeck;
