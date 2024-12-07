import React from 'react';
import './DashSidebar.css';
import { ImSpades } from "react-icons/im";
import { BsSuitDiamondFill } from "react-icons/bs";
import { GiClubs } from "react-icons/gi";
import { GiCardJoker } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';

  const DashSidebar = () => {
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
            <a href = '/dashboard/favorite'> <IoIosHeart/> Favorites </a>
          </li>
          <li>
            <a href='/dashboard/shuffle'> <GiCardJoker />Shuffle </a>
          </li>
          <li>
            <a href='/dashboard/profile'> <BsSuitDiamondFill /> Profile  </a>
          </li>
          <li>
            <a href='/dashboard/contact'> <GiClubs /> Contact </a>
          </li>
      </ul>
      </div>
      );
  };
  
export default DashSidebar;