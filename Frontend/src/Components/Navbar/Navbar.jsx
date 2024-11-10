import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [bar, setBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Filter'); // Default value for dropdown

  const options = ['Campus', 'Professors', 'Topic', 'Major'];

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Search Query: ${searchQuery}, Selected Option: ${selectedOption}`);
    // Handle the search action, such as filtering content or redirecting to a search page
  };

  return (
    <nav className={`container ${bar ? 'dark-nav' : ''}`}>
      <div className='cm'>
      <Link to="/">
      <h1 className="heading"><img src="./public/navlogo.svg" onError={(e) => 
      {
        e.target.src = '/navlogo.svg'; // Replace with your fallback image path
      }} alt="Cardmates Logo" width="45" height="45" />Cardmates</h1>
      </Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="search-bar">
        <div className="dropdown">
          <div className="dropdown-button" onClick={handleDropdownToggle}>
            <span>{selectedOption}</span>
          </div>
          {dropdownVisible && 
          (
            <div className="dropdown-menu">
              {options.map((option) => (
                <div key={option} className="dropdown-item" onClick={() => handleOptionSelect(option)}>
                {option}
                </div>
              )
              )
              }
            </div>
          )
          }
        </div>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." className="search-input"/>
        <button type="submit" className="search-button"> Search </button>

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
          <li>
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
};

export default Navbar;