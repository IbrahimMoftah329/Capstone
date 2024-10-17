import React from 'react';
import './DashSidebar.css';
import { ImSpades } from "react-icons/im";
import { BsSuitDiamondFill } from "react-icons/bs";
import { GiClubs } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import logo from '../../assets/logo2.png';
import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function handleLogout() {
  const { user, signOut } = useClerk();

  if (user) {
    // If a user is logged in, call the Clerk signOut function
    signOut()
      .then(() => {
        // Handle successful logout
        // Redirect to the homepage or any desired page
        window.location.href = '/';
      })
      .catch((error) => {
        // Handle logout errors
        console.error('Logout failed:', error);
      });
  } else {
    // If no user is logged in, you can handle this case as needed
    console.warn('No user is logged in.');
  }
}

const DashSidebar = () => {
  const items = [
    { label: 'Home', icon: < ImSpades />, link: '/dashboard/home' },
    { label: 'Profile', icon: <IoIosHeart />, link: '/dashboard/profile' },
    { label: 'Settings', icon: <GiClubs />, link: '/dashboard/settings' },
    { label: 'Logout', icon: <BsSuitDiamondFill />, link: '/dashboard/logout' },
  ];

  return (
    
    <div className='sidebar'>
      <div className='sidebar-logo-container'>
      <img src={logo} alt='Logo' className='logo' />
      </div>
      <ul>
        <li>
          <a href='/dashboard/home'> <ImSpades />  Home </a>
        </li>
        <li>
          <a href='/dashboard/settings'> <BsSuitDiamondFill /> Profile  </a>
        </li>
        <li>
          <a href='/dashboard/profile'> <GiClubs /> Contact </a>
        </li>
        <li>
          <a href='/' onClick= {handleLogout} > <IoIosHeart /> Logout</a>
        </li>

    </ul>
    </div>
    );
};

export default DashSidebar;

