import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // We'll use token to check if user is logged in
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If we're at the root path and authenticated, redirect to dashboard
    if (location.pathname === '/') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute; 