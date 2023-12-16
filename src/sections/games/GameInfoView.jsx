import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PropTypes from 'prop-types';
import { Button, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchGame } from '../../store/game/gameActions';
import { selectGame } from '../../store/game/gameSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';

import GamesItem from './components/game-item';
import GameChart from './components/game-chart';
import Scrollbar from '../../components/scrollbar';
import IterationItem from './components/iteration-item';
import ResponsiveDialog from '../../components/modal/modal';

import GameVideo from './components/game-video';

import { selectCurrentUser } from '../../store';
import IterationForm from '../../components/Forms/IterationForm';
import AddGameUserForm from '../../components/Forms/AddGameUserForm';
import IconLinks from './components/icon-links';

const sortByLikes = (array) => {
  return [...array].sort((a, b) => b.likes - a.likes);
};

export default function GameInfoView({ isHitPage }) {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const [iterationModalOpen, setOpenIterationModal] = React.useState(false);
  const [addUserToGameModalOpen, setAddUserToGameModal] = React.useState(false);

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch]);

  if (!game) {
    return null;
  }

  return (
    <AppThemeProvider>
      <Grid xs={12} md={6} lg={8}>
        <ResponsiveDialog
          open={iterationModalOpen}
          setOpen={setOpenIterationModal}
        >
          <IterationForm
            iteration={{ gameId: game?.id, creatorId: user?.id }}
            callback={() => setOpenIterationModal(false)}
          />
        </ResponsiveDialog>
        <ResponsiveDialog
          open={addUserToGameModalOpen}
          setOpen={setAddUserToGameModal}
        >
          <AddGameUserForm
            game={game}
            callback={() => setAddUserToGameModal(false)}
          />
        </ResponsiveDialog>

        <Card>
          Release: {game.releaseDate}
          <GamesItem
            isGamePage={window.location.pathname.includes('games')}
            isHitPage={window.location.pathname.includes('hits')}
            key={game.id}
            game={game}
            setAddUserToGameModal={setAddUserToGameModal}
          />
          <div style={{ display: 'flex' }}>
            {isHitPage && <GameVideo game={game} />}
            <GameChart game={game} />
          </div>
          <IconLinks game={game} />
          <Card>
            <Scrollbar>
              <Stack spacing={1} sx={{ p: 0, pr: 0 }}>
                {sortByLikes(game.iterations).map((iteration) => (
                  <IterationItem key={iteration.id} iteration={iteration} />
                ))}
              </Stack>
            </Scrollbar>
            <Button
              onClick={() => {
                setOpenIterationModal(true);
              }}
            >
              <SportsKabaddiIcon />
            </Button>
          </Card>
        </Card>
      </Grid>
    </AppThemeProvider>
  );
}

GameInfoView.propTypes = {
  isHitPage: PropTypes.bool,
};
