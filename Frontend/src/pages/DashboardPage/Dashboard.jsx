import React, { useState } from 'react';
import './Dashboard.css';
import DashSidebar from '../../Components/DashSidebar/DashSidebar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Library from '../../Components/DashContent/DashLibrary';
import Profile from '../../Components/DashContent/DashProfile';
import Contact from '../../Components/DashContent/DashContact';
import Shuffle from '../../Components/DashContent/DashShuffle';
import DashCard from '../../Components/DashContent/DashCard';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return navigate("/");
  }

  return (
    <div style={{ display: 'flex' }}>
      <DashSidebar /> {/* Sidebar is always visible */}
      <Routes>
        <Route path="library" element={<Library />} />
        <Route path="library/:deckId" element={<DashCard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shuffle" element={<Shuffle />} />
        {/* Redirect /dashboard to /dashboard/home */}
        <Route path="/" element={<Navigate to="library" />} />
      </Routes>
    </div>
  );
};

export default Dashboard;