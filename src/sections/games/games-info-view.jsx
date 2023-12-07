import React, { useEffect } from 'react';

import Card from '@mui/material/Card';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame } from '../../store/game/gameActions';
import { selectGame } from '../../store/game/gameSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';
import GameVideo from './components/game-video';
import GamesItem from './components/game-item';
import { useParams } from 'react-router-dom';
import GameChart from './components/game-chart';

export default function GameInfo() {
  const { id } = useParams(); // id is a string
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch]);

  if (!game) {
    return null;
  }

  return (
    <AppThemeProvider>
      <Grid xs={12} md={6} lg={8}>
        <Card>
          Release: {game.releaseDate}
          <GamesItem key={game.id} game={game} />
          <div style={{ display: 'flex' }}>
            <GameVideo game={game} />
            <GameChart game={game} />
          </div>
        </Card>
      </Grid>
    </AppThemeProvider>
  );
}
