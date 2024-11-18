import React, { useState } from 'react';
import './Dashboard.css';
import DashSidebar from '../../Components/DashSidebar/DashSidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Library from '../../Components/DashContent/DashLibrary';
import Profile from '../../Components/DashContent/DashProfile';
import Contact from '../../Components/DashContent/DashContact';
import Shuffle from '../../Components/DashContent/DashShuffle';
import DashCard from '../../Components/DashContent/DashCard';
import Favorites from '../../Components/DashContent/DashFav';
import ProtectedRoute from '../../Components/ProtectedRoute';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DashSidebar /> {/* Sidebar is always visible */}
      <Routes>
        <Route path="library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="library/:deckId" element={<ProtectedRoute><DashCard /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="shuffle" element={<ProtectedRoute><Shuffle /></ProtectedRoute>} />
        <Route path ="favorites" element ={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        {/* Redirect /dashboard to /dashboard/library */}
        <Route path="/" element={<Navigate to="library" />} />
      </Routes>
    </div>
  );
};

export default Dashboard;