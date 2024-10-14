import React from 'react';
import './DashSidebar.css';
import logo from '../../assets/logo2.png';
import spade from '../../assets/spade.jpg';
import heart from '../../assets/heart.jpg';
import club from '../../assets/club.jpg';
import diamond from '../../assets/diamond.jpg';
import { Link } from 'react-router-dom';

const DashSidebar = () => {
  const items = [
    { label: 'Home', icon: spade, link: '/dashboard/home' },
    { label: 'Profile', icon: heart, link: '/dashboard/profile' },
    { label: 'Settings', icon: club, link: '/dashboard/settings' },
    { label: 'Logout', icon: diamond, link: '/dashboard/logout' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="sidebar-items">
        {items.map((item, index) => (
          <li key={index} className="sidebar-item">
            <Link to={item.link}>
              <img src={item.icon} alt={item.label} className="sidebar-icon" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashSidebar;

