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
      { label: 'Library', icon: < ImSpades />, link: '/dashboard/library' },
      { label: 'Profile', icon: <IoIosHeart />, link: '/dashboard/profile' },
      { label: 'Settings', icon: <GiClubs />, link: '/dashboard/contact' },
      { label: 'Logout', icon: <BsSuitDiamondFill />, link: '/dashboard/shuffle' },
    ];
  
    return (
      
      <div className='sidebar'>
        <div className='sidebar-logo-container'>
        <img src={logo} alt='Logo' className='logo' />
        </div>
        <ul>
          <li>
            <a href='/dashboard/library'> <ImSpades /> Library </a> 
          </li>
          <li>
            <a href='/dashboard/profile'> <BsSuitDiamondFill /> Profile  </a>
          </li>
          <li>
            <a href='/dashboard/contact'> <GiClubs /> Contact </a>
          </li>
          <li>
            <a href='/dashboard/shuffle'> <IoIosHeart /> Shuffle </a>
          </li>
  
      </ul>
      </div>
      );
  };
  
export default DashSidebar;