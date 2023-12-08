import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import LoginPage from './pages/login';
import GamesPage from './pages/games';
import GameInfo from './pages/game';

const App = () => {
  const currentUrlPath = window.location.pathname;
  console.log(currentUrlPath);

  return (
    <>
      {currentUrlPath !== '/login' && (
        <HelmetProvider>
          <Helmet>
            <title>FRIENDS GAMES</title>
            <meta name="description" content="Game Incubator" />
          </Helmet>
        </HelmetProvider>
      )}

      <>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:id" element={<GameInfo />} />
            {/* other routes */}
          </Routes>
        </Router>
      </>
    </>
  );
};

export default App;
