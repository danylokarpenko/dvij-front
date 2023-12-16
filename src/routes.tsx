// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import App from './App';
import Error404 from './components/Error404';
import LoginPage from './pages/LoginPage';
import GamesPage from './pages/GamesPage';
import GameInfo from './sections/games/GameInfoView';
import HitsPage from './pages/HitsPage';
import HitInfoPage from './pages/HitInfoPage';
import UserInfoPage from './pages/UserInfoPage';
import UsersPage from './pages/UsersPage';

const AppRoutes = () => (
  <App>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/games" element={<GamesPage />} />
      <Route path="/games/:id" element={<GameInfo />} />

      <Route path="/hits" element={<HitsPage />} />
      <Route path="/hits/:id" element={<HitInfoPage />} />

      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserInfoPage />} />

      <Route path="/" element={<GamesPage />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  </App>
);

export default AppRoutes;
