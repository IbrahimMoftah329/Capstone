import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpades } from "react-icons/im";
import './DashLibrary.css';
import { useUser } from '@clerk/clerk-react';

const DashLibrary = () => {
    const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const [deckprofessor, setProfessor] = useState(''); // New state for Professor
    const [decksemester, setSemester] = useState(''); // New state for Semester
    const [decks, setDecks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editDeckId, setEditDeckId] = useState(null);
    const [isDeck, setIsDeck] = useState(true); // Flag to track whether it's a deck or quiz being deleted
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(''); // Track delete type ('deck', 'quiz', or 'attempt')

    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [selectedDeckId, setSelectedDeckId] = useState(null); // For associating a quiz with a deck

    const selectedDeckName = selectedDeckId
    ? decks.find(deck => deck._id === selectedDeckId)?.name
    : ""; // Derive selected deck name from selectedDeckId
    const [quizzes, setQuizzes] = useState([]);
    const [attempts, setAttempts] = useState([]);
    
    const navigate = useNavigate();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    // deck functions
    const addDeck = (name, description, professor, semester) => {
        const newDeck = {
            name,
            description,
            professor,
            semester,
        };
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/user/${user.id}/deck`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newDeck),
        })
            .then((response) => response.json())
            .then((data) => {
                setDecks(prevDecks => [...prevDecks, data]);
            })
    };

    const editDeck = (id, name, description, professor, semester) => {
        const updatedDeck = {
            name,
            description,
            professor,
            semester,
        };
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(updatedDeck),
        })
            .then(response => response.json())
            .then(data => {
                setDecks(prevDecks =>
                    prevDecks.map(deck => (deck._id === id ? { ...deck, ...data } : deck))
                );
                return data;
            });
    };

    const deleteDeck = (id) => {
        console.log("Deleting deck with ID:", id);
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setDecks(prevDecks => prevDecks.filter(deck => deck._id !== id));
            });
    };
      
    const getDecks = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/user/${user.id}/decks`)
            .then((response) => response.json())
            .then((data) => {
                setDecks(data);
            })
    };

    const openDeckModal = (deck = null) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (deck) {
            setIsEditing(true);
            setEditDeckId(deck._id);
            setDeckName(deck.name);
            setDeckDescription(deck.description);
            setProfessor(deck.professor);
            setSemester(deck.semester);
        } else {
            setIsEditing(false);
            setEditDeckId(null); 
            setDeckName('');
            setDeckDescription('');
            setProfessor('');
            setSemester('');
        }
        setIsDeckModalOpen(true);
    };

    // Close modal and reset fields
    const closeDeckModal = () => {
        setIsDeckModalOpen(false);
        setIsEditing(false);
        setEditDeckId(null);
        setDeckName('');
        setDeckDescription('');
        setProfessor('');
        setSemester('');
    };

    const handleDeckSubmit = async () => {
        if (deckName && deckDescription && deckprofessor && decksemester) {
        if (isEditing && editDeckId) {
            await editDeck(editDeckId, deckName, deckDescription, deckprofessor, decksemester);
        } else {
            await addDeck(deckName, deckDescription, deckprofessor, decksemester);
        }
        closeDeckModal();
        } else {
        alert("Please fill in all the fields before submitting.");
        }
    };

    // Handle delete button clicks for decks
    const handleDeckDeleteClick = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setItemToDelete(id);
        setDeleteType('deck');
        setShowDeletePopup(true);
        console.log("Delete deck clicked:", id);
    };


    const navigateToDeckDetail = (deck) => {
        navigate(`/dashboard/library/${deck._id}`, { state: { deck } });
    };

    // Confirm deletion based on `deleteType`
    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            if (deleteType === 'deck') {
                await deleteDeck(itemToDelete);
            } else if (deleteType === 'quiz') {
                await deleteQuiz(itemToDelete);
            } else if (deleteType === 'attempt') {
                await deleteAttempt(itemToDelete);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        } finally {
            setShowDeletePopup(false);
            setItemToDelete(null);
            setDeleteType('');
        }
    };


    // quiz functions
    const addQuiz = (name, description, deckId) => {
        const associatedDeckInfo = decks.find(deck => deck._id === deckId);
        if (!associatedDeckInfo) {
            console.error("Selected deck not found");
            return;
        }
    
        const newQuiz = {
            name,
            description,
            deckId,
            deckName: associatedDeckInfo.name,
            semester: associatedDeckInfo.semester,
            professor: associatedDeckInfo.professor,
            university: associatedDeckInfo.university,
        };
    
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/user/${user.id}/quiz`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newQuiz),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.quiz || !data.quiz._id) {
                    console.error("Quiz data is missing _id:", data.quiz);
                }
    
                // Update both `decks` and `quizzes` state after adding the quiz
                setDecks(prevDecks =>
                    prevDecks.map(deck =>
                        deck._id === deckId
                            ? { ...deck, quizzes: [...(deck.quizzes || []), data.quiz] }
                            : deck
                    )
                );
                setQuizzes(prevQuizzes => [...prevQuizzes, data.quiz]);
            })
            .catch(error => console.error("Error adding quiz:", error));
    };
    

    const deleteQuiz = (id) => {
        console.log("Deleting quiz with ID:", id);
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                // Remove the quiz from the `quizzes` state only
                setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz._id !== id));
            })
            .catch(error => console.error("Error deleting quiz:", error));
    };

    const getQuizzes = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/user/${user.id}/quizzes`, {
            headers: { "Content-Type": "application/json" },
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setQuizzes(data);
            })
            .catch(error => console.error("Error fetching quizzes:", error));
    };

    // Opens the quiz modal, resetting necessary state and associating with selected deck
    const openQuizModal = (deckId) => {
        setSelectedDeckId(deckId);
        setQuizName('');             // Reset quiz name
        setQuizDescription('');       // Reset quiz description
        setIsQuizModalOpen(true);     // Open the modal
    };

    // Closes the quiz modal and resets quiz-related state
    const closeQuizModal = () => {
        setIsQuizModalOpen(false);    // Close the modal
        setQuizName('');              // Reset quiz name
        setQuizDescription('');       // Reset quiz description
        setSelectedDeckId(null);      // Clear selected deck
    };

    const handleQuizSubmit = () => {
        if (selectedDeckId) {
            const selectedDeck = decks.find(deck => deck._id === selectedDeckId);
            
            if (!selectedDeck) {
                alert("Selected deck not found.");
                return;
            }
    
            addQuiz(quizName, quizDescription, selectedDeckId); // Call addQuiz without numOfQuestions
            closeQuizModal();
        } else {
            alert("Please select a deck.");
        }
    };

    // Handle delete button click for quizzes
    const handleQuizDeleteClick = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setItemToDelete(id);
        setDeleteType('quiz');
        setShowDeletePopup(true);
        console.log("Delete quiz clicked:", id);
    };


    // Handle deck selection
    const handleDeckSelection = (e) => {
        const selectedDeckName = e.target.value;
        const selectedDeck = decks.find(deck => deck.name === selectedDeckName);

        setSelectedDeckId(selectedDeck ? selectedDeck._id : null);
    };

    const navigateToQuizTaker = (quiz) => {
        navigate(`/quiz/${quiz._id}`, { state: { quiz } });
    };

    const deleteAttempt = (id) => {
        console.log("Deleting attempt with ID:", id);
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/attempts/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                // Remove the quiz from the `quizzes` state only
                setAttempts(prevAttempts => prevAttempts.filter(attempt => attempt._id !== id));
            })
            .catch(error => console.error("Error deleting attempt:", error));
    };

    // const getAttempts = () => {
    //     fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/attempts/user/${user.id}/attempts`, {
    //         headers: { "Content-Type": "application/json" },
    //         method: "GET",
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("Fetched attempts data:", data); // Log fetched attempts to verify structure
    //             setAttempts(data);
    //         })
    //         .catch(error => console.error("Error fetching attempts:", error));
    // };

    const getAttempts = () => {
        // First fetch the list of favorited quiz IDs
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${user.id}/getFavQuizzes`)
            .then(favQuizzesResponse => favQuizzesResponse.json())
            .then(favQuizIds => {
                // Fetch all attempts, favorited or not
                fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/attempts/user/${user.id}/attempts`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => response.json())
                    .then(allAttempts => {
                        // Filter attempts to only include those whose quizId is NOT in the list of favorited quizzes
                        const filteredAttempts = allAttempts.filter(attempt => !favQuizIds.includes(attempt.quizId));
                        setAttempts(filteredAttempts);
                    })
                    .catch(error => console.error("Error fetching attempts:", error));
            })
            .catch(error => console.error("Error fetching favorited quizzes:", error));
    };

    // Handle delete button click for attempts
    const handleAttemptDeleteClick = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setItemToDelete(id);
        setDeleteType('attempt');
        setShowDeletePopup(true);
        console.log("Delete attempt clicked:", id);
    };

    // Updated function to navigate to quiz attempt results
    const navigateToQuizAttempt = (attempt) => {
        const associatedQuiz = quizzes.find(quiz => quiz._id === attempt.quizId);
        if (associatedQuiz) {
            navigate(`/results/${attempt.attemptId}`, { state: { attempt, quiz: associatedQuiz } });
        } else {
            console.error("Associated quiz not found for attempt:", attempt);
        }
    };



    // Fetch data on component mount
    useEffect(() => {
        Promise.all([getDecks(), getQuizzes(), getAttempts()])
            .then(() => setIsLoading(false)) // Data is fully loaded
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Stop loading on error as well
            });
    }, []);


    // Display loading message while decks and quizzes are loading
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="library-content">
            <h1 className="library-content-title">Library <ImSpades /></h1>
            <div className="library-content-top">
                <h1 className="library-content-title">Decks</h1>
                <p className="library-content-description">Manage your decks here.</p>
                <button className="add-button" onClick={openDeckModal()}>+</button>
                <div className="deck-list">
                    {decks && decks.map((deck) => (
                        <div key={deck._id} className="deck-item" onClick={() => navigateToDeckDetail(deck)}>
                            <div>
                                <h3>{deck.name}</h3>
                                <p>{deck.flashcards.length} cards</p>
                                <p>Created on: {
                                    new Date(deck.createdAt).toLocaleDateString('en-US', {
                                        month: 'numeric',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })
                                }</p>
                            </div>
                            <div>
                                <button className="Library-button delete" type="button" onClick={handleDeckDeleteClick(deck._id)}>Delete</button>
                                <button className="Library-button edit" type="button" onClick={openDeckModal(deck)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="library-content-bottom">
                <h1 className="library-content-title">Quizzes</h1>
                <p className="library-content-description">Manage your quizzes here.</p>
                <button className="add-button" onClick={() => openQuizModal(null)}>+</button>
                <div className="quiz-list">
                    {quizzes && quizzes.map((quiz) => {
                        return (
                            <div key={quiz._id} className="quiz-item" onClick={() => navigateToQuizTaker(quiz)}>
                                <div>
                                    <h3>{quiz.name}</h3>
                                    <p>{quiz.description}</p>
                                    <p>Associated Deck:<br />{quiz.deckName}</p>
                                    <p>Number of Questions: {quiz.numQuestions}</p>
                                    <p>Created on: {
                                        new Date(quiz.createdAt).toLocaleDateString('en-US', {
                                            month: 'numeric',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }</p>
                                </div>
                                <div className="quiz-item-buttons">
                                    <button className="quiz-button delete" type="button" onClick={handleQuizDeleteClick(quiz._id)}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h1 className="library-content-title" style={{ paddingTop: "10px" }}>Quiz Attempts</h1>
                <p className="library-content-description">Manage your attempts here.</p>
                <div className="quiz-list">
                    {attempts && attempts.map((attempt) => {
                        console.log("Attempt ID:", attempt.attemptId); // Debug log to check _id
                        return (
                            <div key={attempt.attemptId} className="quiz-item" onClick={() => navigateToQuizAttempt(attempt)}>
                                <div>
                                    <h3>Associated Quiz:<br />{attempt.quizName}</h3>
                                    <p>Score: {attempt.score} / {attempt.totalQuestions}</p>
                                    <p>Attempted on: {
                                        new Date(attempt.createdAt).toLocaleString('en-US', {
                                            month: 'numeric',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true // For 12-hour format; set to false for 24-hour format
                                        })
                                    }</p>
                                </div>
                                <div className="quiz-item-buttons">
                                    <button className="quiz-button delete" type="button" onClick={handleAttemptDeleteClick(attempt.attemptId)}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal for Adding New Deck */}
            {isDeckModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEditing ? "Edit Deck" : "Add New Deck"}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleDeckSubmit(); }}>
                            <h3>Deck Name</h3>
                            <textarea type="text" className='input' value={deckName} onChange={(e) => setDeckName(e.target.value)} required placeholder='Enter Deck Name' />
                            <h3>Description</h3>
                            <textarea id="message" rows="4" className='input' value={deckDescription} onChange={(e) => setDeckDescription(e.target.value)} required placeholder="Enter Deck Description" />
                            <h3>Professor</h3>
                            <input type="text" className='input' value={deckprofessor} onChange={(e) => setProfessor(e.target.value)} required placeholder="Enter Professor Name" />
                            <h3>Semester</h3>
                            <select className='input' value={decksemester} onChange={(e) => setSemester(e.target.value)} required>
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
                        <h2>Create New Quiz</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleQuizSubmit(); }}>
                            <h3>Quiz Name</h3>
                            <textarea type="text" className='input' value={quizName} onChange={(e) => setQuizName(e.target.value)} required placeholder='Enter Quiz Name' />
                            
                            <h3>Description</h3>
                            <textarea id="message" rows="4" className='input' value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} required placeholder="Enter Quiz Description" />
                            
                            <h3>Deck</h3>
                            <select className='input' value={selectedDeckName || ""} onChange={handleDeckSelection} required>
                                <option value="" disabled>Select Deck For Quiz Creation</option>
                                {decks && decks.map((deck) => (
                                    <option key={deck._id} value={deck.name}>{deck.name}</option>
                                ))}
                            </select>

                            <div className="modal-buttons">
                                <button type="button" onClick={closeQuizModal}>Cancel</button>
                                <button type="submit">Create</button>
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
                        <p>{deleteType === 'deck' ? "Are you sure you want to delete this deck? This action cannot be undone." 
                            : deleteType === 'quiz' ? "Are you sure you want to delete this quiz? This action cannot be undone."
                            : "Are you sure you want to delete this attempt? This action cannot be undone."}
                        </p>                        
                        <p>{deleteType === 'deck' ? "Are you sure you want to delete this deck? This action cannot be undone." 
                            : deleteType === 'quiz' ? "Are you sure you want to delete this quiz? This action cannot be undone."
                            : "Are you sure you want to delete this attempt? This action cannot be undone."}
                        </p>                        
                        <div className="popup-buttons">
                        <button className="popup-button confirm" onClick={confirmDelete}>Yes, Delete</button>
                        <button className="popup-button cancel" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        <button className="popup-button confirm" onClick={confirmDelete}>Yes, Delete</button>
                        <button className="popup-button cancel" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashLibrary;