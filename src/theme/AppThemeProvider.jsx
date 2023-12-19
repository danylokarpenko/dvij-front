import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import { colors } from '../style/constants';

const AppThemeProvider = ({ children }) => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      // Define other dark theme-specific properties
      background: {
        default: colors.background, // Set the default background color
        paper: colors.background, // Optionally, set the background color for paper components (like Card, Paper)
      },
      link: {
        main: '#80DEEA', // A bright blue
      },
      action: {
        hover: 'rgba(255, 255, 255, 0.08)',
        selected: 'rgba(255, 255, 255, 0.16)',
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
      },
      error: {
        main: '#CF6679', // A muted red
      },
      warning: {
        main: '#FFB74D', // A soft orange
      },
      info: {
        main: '#81D4FA', // A soothing blue
      },
      success: {
        main: '#A5D6A7', // A gentle green
      },
      divider: '#37474F',
      primary: {
        main: '#BB86FC', // A shade of purple
      },
      secondary: {
        main: '#03DAC6', // A teal-like color
      },
      // D
    },
    // ... other customization
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Provides a consistent baseline style */}
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;

AppThemeProvider.propTypes = {
  children: PropTypes.node,
};
