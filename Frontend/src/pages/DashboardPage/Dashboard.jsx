import React, { useState } from 'react';
import './Dashboard.css';
import DashSidebar from '../../Components/DashSidebar/DashSidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../Components/DashContent/DashHome';
import Profile from '../../Components/DashContent/DashProfile';
import Settings from '../../Components/DashContent/DashSettings';
import Logout from '../../Components/DashContent/DashLogout';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DashSidebar /> {/* Sidebar is always visible */}
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logout" element={<Logout />} />
        {/* Redirect /dashboard to /dashboard/home */}
        <Route path="/" element={<Navigate to="home" />} />
      </Routes>
    </div>
  );
};

export default Dashboard;