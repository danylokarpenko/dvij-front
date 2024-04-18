import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';

import { fetchGames } from '../../store/game/gameActions';
import { selectGames } from '../../store/game/gameSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';
import GamesItem from './components/game-item';
import styles from './GamesView.module.scss';
import ResponsiveDialog from '../../components/modal/modal';
import CreateGameForm from '../../components/Forms/CreateGameForm';

export default function GamesView({ isHitPage = false }) {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  const [addUserToGameModalOpen, setAddUserToGameModal] = React.useState(false);

  useEffect(() => {
    dispatch(fetchGames({ isHit: isHitPage }));
  }, [dispatch]);

  return (
    <AppThemeProvider>
      <Grid xs={12} md={6} lg={8}>
        <div className={styles.container}>
          <ResponsiveDialog
            open={addUserToGameModalOpen}
            setOpen={setAddUserToGameModal}
          >
            <CreateGameForm callback={() => setAddUserToGameModal(false)} />
          </ResponsiveDialog>

          <Button
            className={styles.btn}
            onClick={() => setAddUserToGameModal(true)}
          >
            Create Game
          </Button>

          <Stack spacing={3} sx={{ p: 0, pr: 0 }}>
            {games.map((game) => (
              <GamesItem key={game.id} game={game} />
            ))}
          </Stack>
        </div>
      </Grid>
    </AppThemeProvider>
  );
}

GamesView.propTypes = {
  isHitPage: PropTypes.bool,
};
