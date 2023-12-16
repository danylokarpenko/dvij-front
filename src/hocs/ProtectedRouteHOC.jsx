import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouteHOC = ({ children }) => {
  const isTokenValid = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

  const isValidToken = isTokenValid();
  if (isValidToken) {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/'
    ) {
      return <Navigate to="/games" />;
    }
  } else {
    if (window.location.pathname !== '/login') {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

ProtectedRouteHOC.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRouteHOC;
