import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [bar, setBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setBar(true) : setBar(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search action, such as filtering content or redirecting to a search page
    console.log('Search submitted:', searchQuery);
  };

  return (
    <nav className={`container ${bar ? 'dark-nav' : ''}`}>
      {/* <img src={logo} className='nav-logo'/> */}
      <Link to="/">
        <h1 className="cm">Cardmates</h1>
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." className="search-input" />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Navigation Links */}
      <ul>
        <li>
          <Link to="/about">About Us</Link> {/* Link to About Page */}
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
            <Link to="/dashboard">Dashboard</Link> {/* Link to Dashboard Page */}
          </li>
          <li>
            <Link to="/profile">Profile</Link> {/* Link to Profile Page */}
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


