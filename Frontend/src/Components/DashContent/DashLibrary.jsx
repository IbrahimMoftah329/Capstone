import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpades } from "react-icons/im";
import './DashLibrary.css';

const DashLibrary = () => {
    const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const [professor, setProfessor] = useState(''); // New state for Professor
    const [semester, setSemester] = useState(''); // New state for Semester
    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [decks, setDecks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editDeckId, setEditDeckId] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deckToDelete, setDeckToDelete] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState('Select Semester');
    const navigate = useNavigate();

    // Mock backend functionality within this component
    const addDeck = (name, description, professor, semester) => {
        return new Promise((resolve) => {
            const newDeck = {
                id: decks.length + 1,
                name,
                description,
                professor, // Include professor
                semester, // Include semester
                numOfCards: 0,
                createdAt: new Date().toLocaleDateString()
            };
            setDecks(prevDecks => [...prevDecks, newDeck]);
            setTimeout(() => {
                resolve(newDeck);
            }, 500);
        });
    };

    const editDeck = (id, name, description, professor, semester) => {
        return new Promise((resolve) => {
            setDecks(prevDecks => 
                prevDecks.map(deck => 
                    deck.id === id ? { ...deck, name, description, professor, semester } : deck
                )
            );
            setTimeout(() => {
                resolve({ id, name, description, professor, semester });
            }, 500);
        });
    };

    const deleteDeck = (id) => {
        return new Promise((resolve) => {
            setDecks(prevDecks => prevDecks.filter(deck => deck.id !== id));
            setTimeout(() => {
                resolve();
            }, 500);
        });
    };

    const getDecks = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(decks);
            }, 500);
        });
    };

    useEffect(() => {
        loadDecks();
    }, []);

    const loadDecks = async () => {
        const loadedDecks = await getDecks();
        setDecks(loadedDecks);
    };

    const openDeckModal = (deck = null) => {
        if (deck) {
            setIsEditing(true);
            setEditDeckId(deck.id);
            setDeckName(deck.name);
            setDeckDescription(deck.description);
            setProfessor(deck.professor); // Set professor
            setSemester(deck.semester); // Set semester
        }
        setIsDeckModalOpen(true);
    };

    const closeDeckModal = () => {
        setIsDeckModalOpen(false);
        setDeckName('');
        setDeckDescription('');
        setProfessor(''); // Reset professor
        setSemester(''); // Reset semester
        setIsEditing(false);
        setEditDeckId(null);
    };

    const openQuizModal = () => {
        setIsQuizModalOpen(true);
    };

    const closeQuizModal = () => {
        setIsQuizModalOpen(false);
        setQuizName('');
        setQuizDescription('');
    };

    const handleDeckSubmit = async () => {
        if (deckName && deckDescription && professor && semester) {
            if (isEditing) {
                await editDeck(editDeckId, deckName, deckDescription, professor, semester);
            } else {
                await addDeck(deckName, deckDescription, professor, semester);
            }
            closeDeckModal();
        } else {
            alert("Please fill in all the fields before submitting.");
        }
    };

    const handleDeleteClick = (id) => {
        setDeckToDelete(id);
        setShowDeletePopup(true);
    };

    const confirmDeleteDeck = async () => {
        if (deckToDelete !== null) {
            await deleteDeck(deckToDelete);
            setShowDeletePopup(false);
            setDeckToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeletePopup(false);
        setDeckToDelete(null);
    };

    const handleQuizSubmit = () => {
        console.log(`Quiz Name: ${quizName}, Description: ${quizDescription}`);
        closeQuizModal();
    };
    
    const navigateToDeckDetail = (deck) => {
        navigate(`/dashboard/library/${deck.id}`, { state: { deck } });
    };
    
    return (
        <div className="library-content">
            <h1 className="library-content-title">Library <ImSpades/></h1>
            <div className="library-content-top">
                <h1 className="library-content-title">Decks</h1>
                <p className="library-content-description">Manage your decks here.</p>
                <button className="add-button" onClick={() => openDeckModal()}>+</button>
                <div className="deck-list">
                    {decks.map((deck) => (
                        <div key={deck.id} className="deck-item">
                            <div onClick={() => navigateToDeckDetail(deck)}>
                                <h3>{deck.name}</h3>
                                <p>{deck.numOfCards} cards</p>
                                <p>Created on: {deck.createdAt}</p>
                            </div>
                            <div className="button-group">
                                <button className="Library-button delete" type="button" onClick={() => handleDeleteClick(deck.id)}>Delete</button>
                                <button className="Library-button edit" type="button" onClick={() => openDeckModal(deck)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="library-content-bottom">
                <h1 className="library-content-title">Quizzes</h1>
                <p className="library-content-description">Manage your quizzes here.</p>
                <button className="add-button" onClick={openQuizModal}>+</button>
            </div>

            {/* Modal for Adding New Deck */}
            {isDeckModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEditing ? "Edit Deck" : "Add New Deck"}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleDeckSubmit(); }}>
                            <h3>Deck Name</h3>
                            <textarea type="text" className='input' value={deckName} onChange={(e) => setDeckName(e.target.value)} required placeholder='Enter Deck Name'/>
                            <h3>Description</h3>
                            <textarea id="message" rows="4" className='input' value={deckDescription} onChange={(e) => setDeckDescription(e.target.value)} required placeholder="Enter Deck Description"/>
                            <h3>Professor</h3>
                            <input type="text" className='input' value={professor} onChange={(e) => setProfessor(e.target.value)} required placeholder="Enter Professor Name"/>
                            <h3>Semester</h3>
                            <select className='input' value={semester} onChange={(e) => setSemester(e.target.value)} required>
                                <option value="" disabled>Select Semester</option>
                                <option value="Winter 2024">Winter 2024</option>
                                <option value="Fall 2024">Fall 2024</option>
                                <option value="Summer 2024">Summer 2024</option>
                                <option value="Spring 2024">Spring 2024</option>
                                <option value="Winter 2023">Winter 2023</option>
                                <option value="Fall 2023">Fall 2023</option>
                                <option value="Summer 2023">Summer 2023</option>
                                <option value="Spring 2023">Spring 2023</option>
                                <option value="Winter 2022">Winter 2022</option>
                                <option value="Fall 2022">Fall 2022</option>
                                <option value="Summer 2022">Summer 2022</option>
                                <option value="Spring 2022">Spring 2022</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="button" onClick={closeDeckModal}>Cancel</button>
                                <button type="submit">{isEditing ? "Save Changes" : "Add Deck"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Quizzes */}
            {isQuizModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Quiz</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleQuizSubmit(); }}>
                            <h3>Quiz Name</h3>
                            <textarea type="text" className='input' value={quizName} onChange={(e) => setQuizName(e.target.value)} required placeholder='Enter Quiz Name'  />
                            <h3>Description</h3>
                            <textarea id="message" rows="4" className='input' value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} required placeholder="Enter Quiz Description"/>

                            <div className="modal-buttons">
                                <button type="button" onClick={closeQuizModal}>Cancel</button>
                                <button type="submit">Add</button>
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
                        <p>Are you sure you want to delete this deck? This action cannot be undone.</p>
                        <div className="popup-buttons">
                            <button className="popup-button confirm" onClick={confirmDeleteDeck}>Yes, Delete</button>
                            <button className="popup-button cancel" onClick={cancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashLibrary;
