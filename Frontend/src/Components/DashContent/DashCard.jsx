import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DashCard.css';
import nextArrow from '/Users/ninapham/Desktop/OCT /Capstone/Frontend/src/assets/arrow.jpg';
import backArrow from '/Users/ninapham/Desktop/OCT /Capstone/Frontend/src/assets/arrow2.jpg';

const DashCard = () => {
    const location = useLocation();
    const { deck } = location.state || {}; // Retrieve the passed deck information
    const [flashcards, setFlashcards] = useState([]); // State for flashcards
    const [newPrompt, setNewPrompt] = useState(''); // State for new flashcard prompt
    const [newResponse, setNewResponse] = useState(''); // State for new flashcard response
    const [isCardModalOpen, setIsCardModalOpen] = useState(false); // State to control modal visibility
    const [isEditing, setIsEditing] = useState(false); // State to determine if in edit mode
    const [editCardId, setEditCardId] = useState(null); // State to track which flashcard is being edited
    const [showDeletePopup, setShowDeletePopup] = useState(false); // State for delete popup visibility
    const [cardToDelete, setCardToDelete] = useState(null); // State for the card to be deleted
    const [editingIndex, setEditingIndex] = useState(null);

    const [isStudyMode, setIsStudyMode] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Function to add a flashcard
    const addFlashcard = () => {
        if (newPrompt.trim() && newResponse.trim()) {
            setFlashcards([
                ...flashcards,
                { id: flashcards.length + 1, prompt: newPrompt, response: newResponse }
            ]);
            resetModal();
        }
    };

    // Function to open the modal
    const openModal = () => {
        setIsCardModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        resetModal();
    };

    // Function to reset modal states
    const resetModal = () => {
        setIsCardModalOpen(false);
        setNewPrompt('');
        setNewResponse('');
        setIsEditing(false);
        setEditCardId(null);
    };

    // Function to open the modal for editing an existing flashcard
    const openEditModal = (card) => {
        setIsEditing(true);
        setEditCardId(card.id);
        setNewPrompt(card.prompt);
        setNewResponse(card.response);
        setIsCardModalOpen(true);
    };

    // Function to save edited flashcard
    const saveEditedFlashcard = () => {
        setFlashcards(flashcards.map(card => 
            card.id === editCardId ? { ...card, prompt: newPrompt, response: newResponse } : card
        ));
        resetModal();
    };

    // Function to open the delete confirmation popup
    const handleDeleteClick = (card) => {
        setCardToDelete(card);
        setShowDeletePopup(true);
    };

    // Function to confirm deletion of the flashcard
    const confirmDeleteCard = () => {
        if (cardToDelete) {
            setFlashcards(flashcards.filter(card => card.id !== cardToDelete.id));
            setShowDeletePopup(false);
            setCardToDelete(null);
        }
    };

    // Function to cancel the delete operation
    const cancelDelete = () => {
        setShowDeletePopup(false);
        setCardToDelete(null);
    };

    const startStudy = () => {
        if (flashcards.length === 0) {
            alert('Please add some flashcards first!');
            return;
        }
        setIsStudyMode(true);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const nextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const previousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
      };
    
      const shuffleCards = () => {
        setFlashcards(shuffleArray([...flashcards]));
      };
    
      
    return (
        <div className="flashcard-content">
            <h1 className="content-title">{deck ? deck.name : "Deck Details"}</h1>
            <div className="flashcard-box">
                <p className="content-description">{deck?.description}</p> {/* Use deck description */}
                <p>Created on: {deck?.createdAt}</p> {/* Show creation date */}
                <p>Professor: {deck?.professor}</p> {/* Show creation date */}
                <p>Semester: {deck?.semester}</p> {/* Show creation date */}
                <button className="add-button" onClick={openModal}>+</button>
                <h2>Flashcards</h2>


                <div className="flashcard-list" style={{ width: '100%' }}>
                    {flashcards.map((card) => (
                        <div key={card.id} className="flashcard-item">
                            <div className="flashcard-prompt">
                                <p>{card.prompt}</p>
                            </div>
                            <div className="flashcard-response">
                                <p>{card.response}</p>
                            </div>
                            <div className="button-group">
                                <button className="flashcard-button delete" type="button" onClick={() => handleDeleteClick(card)}>Delete</button>
                                <button className="flashcard-button edit" type="button" onClick={() => openEditModal(card)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* study mode container flashcard setup */}

                <div className="study-mode-container">
                        {!isStudyMode ? (
                        <button className="study-button" onClick={startStudy}>
                        Study Flashcards
                    </button>
                        ) : (
                        <div className="study-mode">
                            <div className="card-info">
                            Card {currentCardIndex + 1} of {flashcards.length}
                            </div>

                            <div className="flashcard">
                            <div className="flashcard-contents" onClick={flipCard}>
                                {isFlipped ? flashcards[currentCardIndex].response : flashcards[currentCardIndex].prompt}
                            </div>
                            </div>

                            <div className="card-buttons-studymode">
                            <button className="prev-button-studymode" onClick={previousCard} disabled={currentCardIndex === 0}>
                                <img src={backArrow } alt='previous-arrow'/>
                            </button>
                            <button className="restart-button-studymode" onClick={() => setCurrentCardIndex(0)}>
                                Restart
                            </button>
                            <button className="exit-button-studymode" onClick={() => setIsStudyMode(false)}>
                                Exit
                            </button>
                            <button className="shuffle-button-studymode" onClick={shuffleCards}>
                                Shuffle
                            </button>
                            <button className="next-buttons-studymode" onClick={nextCard} disabled={currentCardIndex === flashcards.length - 1}>
                                <img src= {nextArrow } alt = 'next-arrow' />
                            </button>
                            </div>
                        </div>
                        )}
                    </div>

                {/* Modal for Adding or Editing Flashcard */}
                {isCardModalOpen && (
                    <div className="flashcard-modal">
                        <div className="flashcard-modal-content">
                            <h2>{isEditing ? "Edit Flashcard" : "Add New Flashcard"}</h2>
                            <h3>Prompt</h3>
                            <textarea
                                type="text"
                                rows="5"
                                className='input'
                                value={newPrompt}
                                onChange={(e) => setNewPrompt(e.target.value)}
                                required
                                placeholder="Enter prompt"
                            />
                            <h3>Response</h3>
                            <textarea
                                type="text"
                                rows="5"
                                className='input'
                                value={newResponse}
                                onChange={(e) => setNewResponse(e.target.value)}
                                required
                                placeholder="Enter response"
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={closeModal}>Cancel</button>
                                {isEditing ? (
                                    <button
                                        type="submit"
                                        onClick={saveEditedFlashcard}
                                        disabled={!newPrompt.trim() || !newResponse.trim()}
                                    >
                                        Save Changes
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        onClick={addFlashcard}
                                        disabled={!newPrompt.trim() || !newResponse.trim()}
                                    >
                                        Add Flashcard
                                    </button>
                                    
                                )}
                            </div>
                        </div>
                    </div>
                )}

    
                {/* Styled Popup for Delete Confirmation */}
                {showDeletePopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Confirm Deletion</h2>
                            <p>Are you sure you want to delete this flashcard? This action cannot be undone.</p>
                            <div className="popup-buttons">
                                <button className="popup-button confirm" onClick={confirmDeleteCard}>Yes, Delete</button>
                                <button className="popup-button cancel" onClick={cancelDelete}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashCard;
