import React from 'react';
import './global.css';

import ThemeProvider from './theme';
import Router from './routes/sections';

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
