import React from 'react';
import './DashSidebar.css';
import logo from '../../assets/logo2.png';
import spade from '../../assets/spade.jpg';
import heart from '../../assets/heart.jpg';
import club from '../../assets/club.jpg';
import diamond from '../../assets/diamond.jpg';


const DashSidebar = ({ onSelectItem }) => {
    const items = [
        { label: 'Home', icon: spade },
        { label: 'Profile', icon: heart },
        { label: 'Settings', icon: club },
        { label: 'Logout', icon: diamond },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-logo-container">
                <img src={logo} alt="Logo" className="sidebar-logo" />
            </div>
            {items.map((item) => (
                <button
                    key={item.label}
                    className="sidebar-item"
                    onClick={() => onSelectItem(item.label)}
                >
                    <img src={item.icon} alt={item.label} className="sidebar-icon" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default DashSidebar;