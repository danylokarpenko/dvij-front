import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import GobletPng from '../../assets/goblet.png';
import GobletActivePng from '../../assets/goblet_active.png';
import JoystickPng from '../../assets/joystick.png';
import JoystickActivePng from '../../assets/joystick_active.png';
import IgoPng from '../../assets/igo.png';
import IgoActivePng from '../../assets/igo_active.png';

import { colors, sizes } from '../../style/constants';

const defaultTheme = createTheme();

export default function StickyFooter() {
  const navigate = useNavigate();

  const isLogin = window.location.pathname === '/login';
  if (isLogin) return null;

  const isHitPageActive = window.location.pathname.includes('/hits');
  const isGamePageActive = window.location.pathname.includes('/games');
  const isUserPageActive = window.location.pathname.includes('/users');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'fixed',
          zIndex: 999,
          bottom: 0,
          left: 0,
          right: 0,
          background: colors.background,
          opacity: 0.98,
          height: sizes.footerHeight,
        }}
      >
        <Button
          style={{ flex: 0.5, margin: '0 5px' }}
          onClick={() => navigate('/hits')}
        >
          <img
            src={isHitPageActive ? GobletActivePng : GobletPng}
            alt="goblet"
            width={isHitPageActive ? 200 : 60}
            height={isHitPageActive ? 200 : 110}
          />
        </Button>
        <Button
          style={{ flex: 0.5, margin: '0 5px' }}
          onClick={() => navigate('/games')}
        >
          <img
            src={isGamePageActive ? JoystickActivePng : JoystickPng}
            alt="games"
            width={isGamePageActive ? 100 : 85}
            height={isGamePageActive ? 100 : 75}
          />
        </Button>
        <Button
          type="button"
          style={{ flex: 0.5, margin: '0 5px' }}
          onClick={() => navigate(`/users`)}
        >
          <img
            src={isUserPageActive ? IgoActivePng : IgoPng}
            alt="users"
            width={100}
            height={100}
          />
        </Button>
      </Box>
    </ThemeProvider>
  );
}
