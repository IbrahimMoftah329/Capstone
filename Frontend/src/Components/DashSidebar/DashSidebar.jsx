import React, { useState, useEffect } from 'react';
import './DashSidebar.css';
import { ImSpades } from "react-icons/im";
import { BsSuitDiamondFill } from "react-icons/bs";
import { GiClubs, GiCardJoker } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";  // Added icons for toggle
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';

const DashSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebarOnMobile = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            {isMobile && (
                <button className="mobile-toggle" onClick={toggleSidebar}>
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            )}
            
            {isMobile && isSidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebarOnMobile} />
            )}
            
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className='sidebar-logo-container'>
                    <img src={logo} alt='Logo' className='logo' />
                </div>
                <ul>
                    <li>
                        <Link to='/dashboard/library' onClick={closeSidebarOnMobile}>
                            <ImSpades /> Library
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/favorite' onClick={closeSidebarOnMobile}>
                            <IoIosHeart/> Favorites
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/shuffle' onClick={closeSidebarOnMobile}>
                            <GiCardJoker /> Shuffle
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/profile' onClick={closeSidebarOnMobile}>
                            <BsSuitDiamondFill /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/contact' onClick={closeSidebarOnMobile}>
                            <GiClubs /> Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default DashSidebar;