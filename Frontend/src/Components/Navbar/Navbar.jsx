import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo2.png';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const Navbar = () => {
  const [bar, setBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Filter'); // Default value for dropdown
  const [filteredResults, setFilteredResults] = useState([]);



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
  
      // Normalize the search query
      const normalizedQuery = searchQuery
        .trim()   // this will remove beginning and trailing spaces
        .replace(/\s+/g, ' ')     // this will convert any multiple spaces to a single space 
        .toLowerCase();           // this will make the query all lowercase for case insensitivity
  
      let filteredDecks;
  
      if (selectedOption === 'Filter' || selectedOption === 'Topic') {
          // Filter by name and description for "Topic" or "Filter"
          filteredDecks = allDecks.filter(deck =>
          deck.name.toLowerCase().includes(normalizedQuery) ||
          deck.description.toLowerCase().includes(normalizedQuery)
        );
      } else if (selectedOption === 'Professor') {
          // Filter by professor for "Professor"
          filteredDecks = allDecks.filter(deck =>
          deck.professor.toLowerCase().includes(normalizedQuery)
        );
      } else if (selectedOption === 'Semester') {
          // Filter by semester for "Semester"
          filteredDecks = allDecks.filter(deck =>
          deck.semester.toLowerCase().includes(normalizedQuery)
        );
      }
  
      // Navigate to /searchresults and pass the filtered results
      navigate('/searchresults', { state: { filteredResults: filteredDecks } });
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
        <div className="dropdown">
          <div
            className="dropdown-button" // Updated class name
            onClick={handleDropdownToggle}
          >
            <span>{selectedOption}</span>
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {options.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <ul>
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
