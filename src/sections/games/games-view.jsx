import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Divider from '@mui/material/Divider';

import Scrollbar from '../../components/scrollbar';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/game/gameActions';
import { selectGames } from '../../store/game/gameSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';
import GamesItem from './components/game-item';

export default function GamesList() {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);
  return (
    <AppThemeProvider>
      <Grid xs={12} md={6} lg={8}>
        <Card>
          <Scrollbar>
            <Stack spacing={3} sx={{ p: 0, pr: 0 }}>
              {games.map((game) => (
                <GamesItem key={game.id} game={game} />
              ))}
            </Stack>
          </Scrollbar>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Card>
      </Grid>
    </AppThemeProvider>
  );
}