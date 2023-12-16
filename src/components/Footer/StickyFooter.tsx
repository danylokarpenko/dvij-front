import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
import GobletPng from '../../assets/goblet.png';
// @ts-ignore
import JoystickSvg from '../../assets/joy.png';
// @ts-ignore
import { ReactComponent as IgokSvg } from '../../assets/igo.svg';

const defaultTheme = createTheme();

export default function StickyFooter() {
  const navigate = useNavigate();

  const isLogin = window.location.pathname === '/login';
  if (isLogin) return null;

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
          backgroundColor: 'gradient #000000 40%, #000000 100%',
          height: '100px',
        }}
      >
        <Button
          style={{ flex: 0.5, margin: '0 5px', paddingBottom: '50px' }}
          onClick={() => navigate('/hits')}
        >
          <img src={GobletPng} alt="games" width={50} />
        </Button>
        <Button
          style={{ flex: 0.5, margin: '0 5px', paddingBottom: '50px' }}
          onClick={() => navigate('/games')}
        >
          <img src={JoystickSvg} alt="games" width={100} />
        </Button>
        <Button
          style={{ flex: 0.5, margin: '0 5px', paddingBottom: '50px' }}
          onClick={() => navigate(`/users`)}
        >
          <IgokSvg maxWidth={50} maxHeight={50} alt="profile" width={80} />
        </Button>
      </Box>
    </ThemeProvider>
  );
}
