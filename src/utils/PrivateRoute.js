import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
