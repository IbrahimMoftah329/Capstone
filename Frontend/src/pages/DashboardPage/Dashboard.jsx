import React, { useState } from 'react';
import './Dashboard.css';
import DashSidebar from '../../Components/DashSidebar/DashSidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../Components/DashContent/DashHome';
import Profile from '../../Components/DashContent/DashProfile';
import Settings from '../../Components/DashContent/DashSettings';
import Contact from '../../Components/DashContent/DashContact';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DashSidebar /> {/* Sidebar is always visible */}
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Dashboard;