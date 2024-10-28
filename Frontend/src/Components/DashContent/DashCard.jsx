import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './DashCard.css'; // Optional CSS file for styling
import { useUser } from '@clerk/clerk-react';

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
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
        return;
    }

    // Function to add a flashcard
    const addFlashcard = () => {
        const newFlashcard = {
            question: newPrompt,
            answer: newResponse,
        };
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deck._id}/flashcard`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newFlashcard),
        })
            .then((response) => response.json())
            .then((data) => {
                setFlashcards(prevFlashcards => [...prevFlashcards, data]);
                closeFlashcardModal();
            })
    };

    const editFlashcard = (id, question, answer) => {
        const updatedFlashcard = {
            question,
            answer,
        };
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(updatedFlashcard),
        })
            .then(response => response.json())
            .then(data => {
                setFlashcards(prevFlashcards =>
                    prevFlashcards.map(flashcard => (flashcard._id === id ? { ...flashcard, ...data } : flashcard))
                );
                return data;
            });
    };

    const deleteFlashcard = (id) => {
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setFlashcards(prevFlashcards => prevFlashcards.filter(flashcard => flashcard._id !== id));
            });
    };

    const getFlashcards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/flashcards/deck/${deck._id}/flashcards`)
            .then((response) => response.json())
            .then((data) => {
                setFlashcards(data);
            })
    };

    useEffect(() => {
        getFlashcards();
    }, []);

    // Function to open the modal for editing an existing flashcard
    const openFlashcardModal = (card = null) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (card) {
            setIsEditing(true);
            setEditCardId(card._id);
            setNewPrompt(card.question);
            setNewResponse(card.answer);
        } else {
            setIsEditing(false);
            setEditCardId(null);
            setNewPrompt('');
            setNewResponse('');
        }
        setIsCardModalOpen(true);
    };

    // Function to close the flashcard modal
    const closeFlashcardModal = () => {
        setIsCardModalOpen(false);
        setIsEditing(false);
        setEditCardId(null);
        setNewPrompt('');
        setNewResponse('');
    };

    const handleFlashcardSubmit = async () => {
        if (newPrompt && newResponse) {
        if (isEditing && editCardId) {
            await editFlashcard(editCardId, newPrompt, newResponse);
        } else {
            await addFlashcard(newPrompt, newResponse);
        }
        closeFlashcardModal();
        } else {
        alert("Please fill in all the fields before submitting.");
        }
    };

    // Function to open the delete confirmation popup
    const handleDeleteClick = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCardToDelete(id);
        setShowDeletePopup(true);
    };

    // Function to confirm deletion of the flashcard
    const confirmDeleteCard = async () => {
        if (cardToDelete !== null) {
            await deleteFlashcard(cardToDelete);
            setShowDeletePopup(false);
            setCardToDelete(null);
        }
    };

    // Function to cancel the delete operation
    const cancelDelete = () => {
        setShowDeletePopup(false);
        setCardToDelete(null);
    };

    return (
        <div className="flashcard-content">
            <h1 className="content-title">{deck ? deck.name : "Deck Details"}</h1>
            <div className="flashcard-box">
                <p className="content-description">{deck?.description}</p> {/* Use deck description */}
                <p>Created on: {deck?.createdAt}</p> {/* Show creation date */}
                <p>Professor: {deck?.professor}</p> {/* Show creation date */}
                <p>Semester: {deck?.semester}</p> {/* Show creation date */}
                <button className="add-button" onClick={openFlashcardModal()}>+</button>
                <h2>Flashcards</h2>
                <div className="flashcard-list" style={{ width: '100%' }}>
                    {flashcards.map((card) => (
                        <div key={card._id} className="flashcard-item">
                            <div className="flashcard-prompt">
                                <p>{card.question}</p>
                            </div>
                            <div className="flashcard-response">
                                <p>{card.answer}</p>
                            </div>
                            <div className="button-group">
                                <button className="flashcard-button delete" type="button" onClick={handleDeleteClick(card._id)}>Delete</button>
                                <button className="flashcard-button edit" type="button" onClick={openFlashcardModal(card)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Adding or Editing Flashcard */}
                {isCardModalOpen && (
                    <div className="flashcard-modal">
                        <div className="flashcard-modal-content">
                            <h2>{isEditing ? "Edit Flashcard" : "Add New Flashcard"}</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleFlashcardSubmit(); }}>
                                <h3>Prompt</h3>
                                <textarea type="text" rows="5" className='input' value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} required placeholder="Enter prompt" />
                                <h3>Response</h3>
                                <textarea type="text" rows="5" className='input' value={newResponse} onChange={(e) => setNewResponse(e.target.value)} required placeholder="Enter response" />
                                <div className="modal-buttons">
                                    <button type="button" onClick={() => closeFlashcardModal()}>Cancel</button>
                                    <button type="submit">{isEditing ? "Save Changes" : "Add Flashcard"}</button>                              
                                </div>
                            </form>
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
