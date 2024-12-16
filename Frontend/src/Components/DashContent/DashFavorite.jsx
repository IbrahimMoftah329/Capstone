import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useUser } from '@clerk/clerk-react';

const DashFavorite = () => {
    const navigate = useNavigate();
    const { user } = useUser();             // Get user context from Clerk
    const userId = user ? user.id : null;   // Get the logged-in user's ID  
    const [isLoading, setIsLoading] = useState(true);

    // The next three lines are used to get the correct decks, quizzes, and quiz attempts that have been favorited
    const [decks, setDecks] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [attempts, setAttempts] = useState([]);
    useEffect(() => { getDecks() }, [user.id]); 

    // The next three usestates are for deleting a deck/quiz/quiz attempt
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState('');


    // This function is used to get all the deck details from the current user's favorited decks array    
    const getDecks = () => {
        // Step 1: Fetch the IDs of the favorited decks
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${user.id}/getFavDecks`, {
            headers: { "Content-Type": "application/json" },
            method: "GET",
        })
        .then(response => response.json())  // Get the array of deck IDs
        .then(deckIds => {
            // Step 2: Fetch the list of all decks to compare their IDs
            fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/alldecks`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            })
            .then(response => response.json())  // Get all deck data
            .then(allDecks => {
                // Extract the IDs from the list of all decks
                const allDeckIds = allDecks.map(deck => deck._id);
    
                // Step 3: Filter the favorite deck IDs to only include those that exist in the list of all decks
                const validDeckIds = deckIds.filter(deckId => allDeckIds.includes(deckId));
    
                // Step 4: Fetch the details of the valid decks
                const deckDetailsPromises = validDeckIds.map(deckId =>
                    fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${deckId}`, {
                        headers: { "Content-Type": "application/json" },
                        method: "GET",
                    })
                    .then(response => response.json())  // Get deck details for each valid deck
                );
    
                // Step 5: Wait for all deck details to be fetched
                Promise.all(deckDetailsPromises)
                    .then(decks => {
                        // Update the usestate with full deck details
                        setDecks(decks);
                    })
                    .catch(error => console.error("Error fetching deck details:", error));
            })
            .catch(error => console.error("Error fetching all decks:", error));
        })
        .catch(error => console.error("Error fetching favorite decks:", error));
    };
    
    // const getDecks = () => {
    //     // fetch the array of favorited deck id's
    //     fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${user.id}/getFavDecks`)
    //         .then((response) => response.json())
    //         .then((deckIds) => {
    //             // fetch all the details for each deck
    //             Promise.all(
    //                 deckIds.map((deckId) =>
    //                     fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/decks/${deckId}`)
    //                         .then((response) => response.json())
    //                 )
    //             )
    //                 .then((decksDetails) => {
    //                     // update the usestate with the deck details
    //                     setDecks(decksDetails);
    //                 })
    //                 .catch((err) => {
    //                     setError('Failed to load deck details');
    //                 });
    //         })
    //         .catch((err) => {
    //             setError('Failed to load favorite decks');
    //         });
    // };


    // const getQuizzes = () => {
    //     // Step 1: Fetch the IDs of the favorited quizzes
    //     fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${user.id}/getFavQuizzes`, {
    //         headers: { "Content-Type": "application/json" },
    //         method: "GET",
    //     })
    //     .then(response => response.json())  // Get the array of quiz IDs
    //     .then(quizIds => {
    //         // Step 2: Fetch the details of each quiz by its ID
    //         const quizDetailsPromises = quizIds.map(quizId => 
    //             fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${quizId}`, {
    //                 headers: { "Content-Type": "application/json" },
    //                 method: "GET",
    //             })
    //             .then(response => response.json())  // Get quiz details for each quiz
    //         );
    
    //         // Step 3: Wait for all quiz details to be fetched
    //         Promise.all(quizDetailsPromises)
    //             .then(quizzes => {
    //                 // Update the  usestate with full quiz details
    //                 setQuizzes(quizzes);
    //             })
    //             .catch(error => console.error("Error fetching quiz details:", error));
    //     })
    //     .catch(error => console.error("Error fetching favorite quizzes:", error));
    // };   
    
    const getQuizzes = () => {
        // Step 1: Fetch the IDs of the favorited quizzes
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${user.id}/getFavQuizzes`, {
            headers: { "Content-Type": "application/json" },
            method: "GET",
        })
        .then(response => response.json())  // Get the array of quiz IDs
        .then(quizIds => {
            // Step 2: Fetch the list of all quizzes to compare their IDs
            fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/allquizzes`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            })
            .then(response => response.json())  // Get all quiz data
            .then(allQuizzes => {
                // Extract the IDs from the list of all quizzes
                const allQuizIds = allQuizzes.map(quiz => quiz._id);
    
                // Step 3: Filter the favorite quiz IDs to only include those that exist in the list of all quizzes
                const validQuizIds = quizIds.filter(quizId => allQuizIds.includes(quizId));
    
                // Step 4: Fetch the details of the valid quizzes
                const quizDetailsPromises = validQuizIds.map(quizId =>
                    fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${quizId}`, {
                        headers: { "Content-Type": "application/json" },
                        method: "GET",
                    })
                    .then(response => response.json())  // Get quiz details for each valid quiz
                );
    
                // Step 5: Wait for all quiz details to be fetched
                Promise.all(quizDetailsPromises)
                    .then(quizzes => {
                        // Update the usestate with full quiz details
                        setQuizzes(quizzes);
                    })
                    .catch(error => console.error("Error fetching quiz details:", error));
            })
            .catch(error => console.error("Error fetching all quizzes:", error));
        })
        .catch(error => console.error("Error fetching favorite quizzes:", error));
    };
    


    // This will get all the quiz attempts ONLY from favorited quizzes
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
                        // Filter attempts to only include those whose quizId is in the list of favorited quizzes
                        const filteredAttempts = allAttempts.filter(attempt => favQuizIds.includes(attempt.quizId));
                        setAttempts(filteredAttempts);
                    })
                    .catch(error => console.error("Error fetching attempts:", error));
            })
            .catch(error => console.error("Error fetching favorited quizzes:", error));
    };

    
    // She the details of the deck flashcards
    const showDeckDetail = (deck) => {
        navigate(`/dashboard/favorite/${deck._id}`, { state: { deck } });
    };

    // Show the details of the quiz quiestions
    const navigateToQuizTaker = (quiz) => {
        navigate(`/quiz/${quiz._id}`, { state: { quiz } });
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

        // Confirm deletion based on `deleteType`
        const confirmDelete = async () => {
            if (!itemToDelete) return;
    
            try {
                if (deleteType === 'attempt') {
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

    const deleteAttempt = (id) => {
        // console.log("Deleting attempt with ID:", id);
        return fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/attempts/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                // Remove the quiz from the `quizzes` state only
                setAttempts(prevAttempts => prevAttempts.filter(attempt => attempt._id !== id));
            })
            .catch(error => console.error("Error deleting attempt:", error));
    };

    // Handle delete button click for attempts
    const handleAttemptDeleteClick = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setItemToDelete(id);
        setDeleteType('attempt');
        setShowDeletePopup(true);
        // console.log("Delete attempt clicked:", id);
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


    // Function used to send a post request of the deck._id to the backend server for adding/removing a favorite deck
    // This function is specific to the frontend since it will immediately remove the item from view when the function is called
    const toggleFavoriteDeck = async (deckID) => {
        try {
            // Check if there is a user logged in, if not prompt them to log in
            if (!userId) {
                alert('Please log in to add this deck to your favorites.');
                return;
            }
    
            // Immediately remove the deck from the frontend (update local state)
            setDecks(prevDecks => prevDecks.filter(deck => deck._id !== deckID));
    
            // Send the POST request to toggle the favorite status on the server
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
            setDecks(prevDecks => [...prevDecks]);  // Reverts the state by just keeping the previous decks
        }
    };
    
    // Function used to send a post request of the quiz._id to the backend server for adding/removing a favorite quiz
    const toggleFavoriteQuiz = async (quizID) => {
        try {
            // Check if there is a user logged in, if not prompt them to log in
            if (!userId) {
                alert('Please log in to add this deck to your favorites.');
                return;
            }
            
            // Immediately remove the deck from the frontend (update local state)
            setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz._id !== quizID));

            // This response will send a POST to the server url with just the deck._id as the body, the backend server will handle the add/remove favorites
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/quizzes/${userId}/favQuiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizId: quizID,
                }),
            });

        } catch (error) {
            console.error('Error toggling favorite status', error);
        }
    };


    return (
        <div className="library-content">
            {/* <h1 className="library-content-title">Favorites <ImSpades /></h1> */}
            <h1 className="library-content-title">Favorites<IoIosHeart /></h1>
            <div className="library-content-top">
                <h1 className="library-content-title">Decks</h1>
                <p className="library-content-description">Manage your favorited decks here.</p>
                <div className="deck-list">
                    {decks && decks.map((deck) => (
                        <div key={deck._id} className="deck-item" onClick={() => showDeckDetail(deck)}>
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
                                <button className = 'add_favorite' onClick={(e) => {e.stopPropagation(), toggleFavoriteDeck(deck._id)}}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="library-content-bottom">
        <h1 className="library-content-title">Quizzes</h1>
        <p className="library-content-description">Manage your favorited quizzes here.</p>
        <div className="quiz-list">
            {quizzes && quizzes.map((quiz) => {
                return (
                    <div key={quiz._id} className="quiz-item" onClick={() => navigateToQuizTaker(quiz)}>
                        <div>
                            <h3>{quiz.name}</h3>
                            <p>{quiz.description}</p>
                            <p>Associated Deck:<br />{quiz.deckName}</p>
                            <p>Number of Questions: {quiz.questions ? quiz.questions.length : 0}</p>
                            <p>Created on: {
                                new Date(quiz.createdAt).toLocaleDateString('en-US', {
                                    month: 'numeric',
                                    day: 'numeric',
                                    year: 'numeric'
                                })
                            }</p>
                        </div>
                        <div>
                            <button className = 'add_favorite' onClick={(e) => {e.stopPropagation(), toggleFavoriteQuiz(quiz._id)}}>Remove</button>
                        </div>
                    </div>
                );
            })}
        </div>
        <h1 className="library-content-title" style={{ paddingTop: "10px" }}>Quiz Attempts</h1>
        <p className="library-content-description">Manage your attempts for favorited quizzes here.</p>
        <div className="quiz-list">
            {attempts && attempts.map((attempt) => {
                // console.log("Attempt ID:", attempt.attemptId); // Debug log to check _id
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
            {/* Styled Popup for Delete Confirmation */}
            {showDeletePopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Confirm Deletion</h2>
                        <p>{deleteType === 'deck' ? "Are you sure you want to delete this deck? This action cannot be undone." 
                            : deleteType === 'quiz' ? "Are you sure you want to delete this quiz? This action cannot be undone."
                            : "Are you sure you want to delete this attempt? This action cannot be undone."}
                        </p>                        
                        <div className="popup-buttons">
                        <button className="popup-button confirm" onClick={confirmDelete}>Yes, Delete</button>
                        <button className="popup-button cancel" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
        </div>
    );
};

export default DashFavorite;