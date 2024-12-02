import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpades } from "react-icons/im";
import './DashLibrary.css';
import { useUser } from '@clerk/clerk-react';

const DashFavorite = () => {
    const [decks, setDecks] = useState([]);
    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [selectedDeckId, setSelectedDeckId] = useState(null); // For associating a quiz with a deck
    const [quizzes, setQuizzes] = useState([]);
    const [attempts, setAttempts] = useState([]);
    
    const navigate = useNavigate();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);


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


    const navigateToDeckDetail = (deck) => {
        navigate(`/dashboard/library/${deck._id}`, { state: { deck } });
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

    const getAttempts = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/attempts/user/${user.id}/attempts`, {
            headers: { "Content-Type": "application/json" },
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched attempts data:", data); // Log fetched attempts to verify structure
                setAttempts(data);
            })
            .catch(error => console.error("Error fetching attempts:", error));
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

        // Section for showing favorited decks
        <div className="library-content">
            <h1 className="library-content-title">Favorites <ImSpades /></h1>
            <div className="library-content-top">
                <h1 className="library-content-title">Decks</h1>
                <p className="library-content-description">Manage your favorited decks here.</p>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Section for showing favorited quizzes */}
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
                                    <p>Number of Questions: {quiz.numQuestions}</p>
                                    <p>Created on: {
                                        new Date(quiz.createdAt).toLocaleDateString('en-US', {
                                            month: 'numeric',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Section for showing favorited quiz attempts */}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DashFavorite;