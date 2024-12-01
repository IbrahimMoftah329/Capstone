import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo2.png';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';


const Navbar = () => {
  const [bar, setBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Filter');
  const [filteredResults, setFilteredResults] = useState([]);

  const { user } = useUser();             // Get user context from Clerk
  const userId = user ? user.id : null;   // Get the logged-in user's ID



  const navigate = useNavigate();
  const options = ['Topic', 'Professor', 'Semester'];

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setBar(true) : setBar(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log(`Search Query: ${searchQuery}, Selected Option: ${selectedOption}`);

    if (!searchQuery.trim()) {
      console.log("Search query is empty. Please enter a search term.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/decks/alldecks`);
      const allDecks = await response.json();
      const response_2 = await fetch(`http://localhost:4000/api/quizzes/allquizzes`);
      const allQuizzes = await response_2.json();
  
      // Normalize the search query
      const normalizedQuery = searchQuery
        .trim()                   // this will remove beginning and trailing spaces
        .replace(/\s+/g, ' ')     // this will convert any multiple spaces to a single space 
        .toLowerCase();           // this will make the query all lowercase for case insensitivity
       
      const filteredDecks = allDecks.filter(
        (deck) =>
          (deck.name.toLowerCase().includes(normalizedQuery) ||
            deck.description.toLowerCase().includes(normalizedQuery) ||
            deck.professor.toLowerCase().includes(normalizedQuery) ||
            deck.semester.toLowerCase().includes(normalizedQuery)) &&
            deck.clerkId !== userId       // Exclude decks that belong to the logged-in user
      );
  
      const filteredQuizzes = allQuizzes.filter(
        (quiz) =>
          (quiz.name.toLowerCase().includes(normalizedQuery) ||
            quiz.description.toLowerCase().includes(normalizedQuery) ||
            quiz.professor.toLowerCase().includes(normalizedQuery) ||
            quiz.semester.toLowerCase().includes(normalizedQuery)) &&
            quiz.createdBy !== userId     // Exclude quizzes that belong to the logged-in user
      );

      navigate('/searchresults', { state: { filteredResults: filteredDecks, filteredQuizzes, initialView: 'home' } });
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };


  return (
    <nav className={`container ${bar ? 'dark-nav' : ''}`}>

      <Link to="/">
        <h1 className="cm">Cardmates</h1>
      </Link>

      <form onSubmit={handleSearchSubmit} className="search-bar">
        <div className='searchbar'>
          <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." className="search-input"/>
          <button type="submit" className="search-button">
          </button>
        </div>
      </form>

      {/* Navigation Links */}
      <ul className='links'>
        <li>
          <Link to="/about">About Us</Link>
        </li>

        {/* Clerk Authentication */}
        <SignedOut>
          <li>
            <SignInButton>
              <button className="button">Log in</button>
            </SignInButton>
          </li>
        </SignedOut>

        {/* Show this section only for logged-in users */}
        <SignedIn>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li classname = "user-button">
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
};

export default Navbar;
