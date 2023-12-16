// src/pages/LoginPage.tsx
import React from 'react';
import LoginComponent from '../sections/login/login-view';
import ProtectedRouteHOC from '../hocs/ProtectedRouteHOC';

const LoginPage = () => {
  return (
    <>
      <ProtectedRouteHOC>
        <LoginComponent />
      </ProtectedRouteHOC>
    </>
  );
};

export default LoginPage;
