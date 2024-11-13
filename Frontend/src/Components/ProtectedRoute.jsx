// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    // If authentication status is still loading, display nothing or a loading indicator
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // Only redirect if loaded and user is not signed in
    if (!isSignedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

