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
import MainTask from './components/main-task';
import DNDSortableList from '../../components/DNDSortableList';
import {
  bulkUpdateIterations,
  updateIteration,
} from '../../store/iteration/iterationActions';

export default function GameInfoView() {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const [iterationModalOpen, setOpenIterationModal] = React.useState(false);
  const [addUserToGameModalOpen, setAddUserToGameModal] = React.useState(false);
  const [iterations, setIterations] = React.useState();

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch]);

  useEffect(() => {
    if (game?.iterations) {
      setIterations(game.iterations);
    }
  }, [dispatch, game?.iterations]);

  if (!game) {
    return null;
  }

  const handleUpdateIteration = (sortedItems) => {
    setIterations(sortedItems);
    dispatch(
      bulkUpdateIterations({
        payload: [...sortedItems],
      })
    );
  };

  return (
    <AppThemeProvider>
      <Grid>
        <ResponsiveDialog
          open={iterationModalOpen}
          setOpen={setOpenIterationModal}
        >
          <IterationForm
            item={{
              gameId: game?.id,
              creatorId: user?.id,
              index: game.iterations.length,
            }}
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

        <Grid>
          Release: {game.releaseDate}
          <GamesItem
            key={game.id}
            game={game}
            setAddUserToGameModal={setAddUserToGameModal}
          />
          <MainTask game={game} />
          <div style={{ display: 'flex' }}>
            <GameVideo game={game} />
            <GameChart game={game} />
          </div>
          <IconLinks game={game} />
          {iterations && (
            <DNDSortableList
              items={iterations}
              setItems={handleUpdateIteration}
              ItemComponent={IterationItem}
            />
          )}
          <Button
            onClick={() => {
              setOpenIterationModal(true);
            }}
          >
            <SportsKabaddiIcon />
          </Button>
        </Grid>
      </Grid>
    </AppThemeProvider>
  );
}

GameInfoView.propTypes = {
  isHitPage: PropTypes.bool,
};
