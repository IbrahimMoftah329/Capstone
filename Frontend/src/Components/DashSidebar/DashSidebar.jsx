import React from 'react';
import './DashSidebar.css';
import { ImSpades } from "react-icons/im";
import { BsSuitDiamondFill } from "react-icons/bs";
import { GiClubs } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';

const DashSidebar = () => {
  const items = [
    { label: 'Home', icon: < ImSpades />, link: '/dashboard/home' },
    { label: 'Profile', icon: <IoIosHeart />, link: '/dashboard/profile' },
    { label: 'Settings', icon: <GiClubs />, link: '/dashboard/settings' },
    { label: 'Logout', icon: <BsSuitDiamondFill />, link: '/dashboard/contact' },
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
          <a href='/dashboard/profile'> <BsSuitDiamondFill /> Profile  </a>
        </li>
        <li>
          <a href='/dashboard/settings'> <GiClubs /> Settings</a>
        </li>
        <li>
          <a href='/dashboard/contact' > <IoIosHeart /> Contact Us</a>
        </li>

    </ul>
    </div>
    );
};

export default DashSidebar;

