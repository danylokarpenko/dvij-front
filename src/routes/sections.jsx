import React from 'react';

import { Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/login';
import GamesPage from '../pages/games';

export default function Router() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/games" element={<GamesPage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}
