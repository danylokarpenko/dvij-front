import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

import { Button, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame } from '../../store/game/gameActions';
import { selectGame } from '../../store/game/gameSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';
import GameVideo from './components/game-video';
import GamesItem from './components/game-item';
import { useParams } from 'react-router-dom';
import GameChart from './components/game-chart';
import Scrollbar from '../../components/scrollbar';
import IterationItem from './components/iteration-item';

const sortByLikes = (array) => {
  return [...array].sort((a, b) => b.likes - a.likes);
};

const defaultIconOptions = {
  style: { width: '25px', height: '25px', padding: 2, marginRight: 2 },
};

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
          <Stack direction="row">
            <img
              {...defaultIconOptions}
              src={'../../../../assets/iStore.png'}
              alt={game.name}
              onClick={() => window.open(game.iStoreLink, '_blank')}
            />
            <img
              {...defaultIconOptions}
              src={'../../../../assets/google_play.png'}
              alt={game.name}
              onClick={() => window.open(game.googleStoreLink, '_blank')}
            />
            <img
              {...defaultIconOptions}
              src={'../../../../assets/git.png'}
              alt={game.name}
              onClick={() => window.open(game.gitLink, '_blank')}
            />
            <img
              {...defaultIconOptions}
              src={'../../../../assets/google_drive.png'}
              alt={game.name}
              onClick={() => window.open(game.googleDriveLink, '_blank')}
            />
            <img
              {...defaultIconOptions}
              src={'../../../../assets/trello.png'}
              alt={game.name}
              onClick={() => window.open(game.trelloLink, '_blank')}
            />
          </Stack>
          <Card>
            <Scrollbar>
              <Stack spacing={1} sx={{ p: 0, pr: 0 }}>
                {sortByLikes(game.iterations).map((iteration) => (
                  <IterationItem key={iteration.id} iteration={iteration} />
                ))}
              </Stack>
            </Scrollbar>
            <Button>
              <SportsKabaddiIcon />
            </Button>
          </Card>
        </Card>
      </Grid>
    </AppThemeProvider>
  );
}
