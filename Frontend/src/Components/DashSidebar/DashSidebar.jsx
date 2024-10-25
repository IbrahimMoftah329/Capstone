import React from 'react';
import './DashSidebar.css';
import logo from '../../assets/logo2.png';
import { ImSpades } from "react-icons/im";
import { BsSuitDiamondFill } from "react-icons/bs";
import { GiClubs } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';

const DashSidebar = () => {
  const items = [
    { label: 'Library', icon: <span className="sidebar-icon"><ImSpades /></span>, link: '/dashboard/library' },
    { label: 'Profile', icon: <span className="sidebar-icon"><IoIosHeart /></span>, link: '/dashboard/profile' },
    { label: 'Contact', icon: <span className="sidebar-icon"><GiClubs /></span>, link: '/dashboard/contact' },
    { label: 'Shuffle', icon: <span className="sidebar-icon"><BsSuitDiamondFill /></span>, link: '/dashboard/shuffle' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="sidebar-items">
        {items.map((item, index) => (
          <li key={index} className="sidebar-item">
            <Link to={item.link} className="sidebar-link">
              {item.icon}
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default DashSidebar;

