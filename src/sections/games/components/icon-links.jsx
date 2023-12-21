import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

import ResponsiveDialog from '../../../components/modal/modal';
import AddIconLinkForm from '../../../components/Forms/EditGamePartialForm';
import useLongPress from '../../../hooks/useLongPress';
import GitPng from '../../../assets/git.png';
import GoogleDrivePng from '../../../assets/google_drive.png';
import GooglePlayPng from '../../../assets/google_play.png';
import IStorePng from '../../../assets/iStore.png';
import TrelloPng from '../../../assets/trello.png';

const defaultIconStyle = (name) => ({
  width: '25px',
  height: '25px',
  padding: 2,
  marginRight: 2,
  border: !name ? '2px solid red' : 'none',
  cursor: 'pointer',
});

export default function IconLinks({ game }) {
  const [gameColumnNameToEdit, setLinkColumnName] = useState(null);
  const { iStoreLink, googleStoreLink, gitLink, googleDriveLink, trelloLink } =
    game;

  const onLongPress = (gameColumnNameToEdit) => {
    setLinkColumnName(gameColumnNameToEdit);
  };

  const onClick = (link) => {
    window.open(link, '_blank');
  };

  const longPressEvent = (gameColumnNameToEdit) =>
    useLongPress(
      () => onLongPress(gameColumnNameToEdit),
      () => onClick(game[gameColumnNameToEdit])
    );

  return (
    <Stack direction="row">
      <ResponsiveDialog
        open={Boolean(gameColumnNameToEdit)}
        setOpen={setLinkColumnName}
      >
        {gameColumnNameToEdit && (
          <AddIconLinkForm
            gameColumnNameToEdit={gameColumnNameToEdit}
            game={game}
            callback={() => setLinkColumnName(null)}
          />
        )}
      </ResponsiveDialog>
      {/* need svg */}
      <img
        type="button"
        {...longPressEvent('iStoreLink')}
        draggable={false}
        style={{ ...defaultIconStyle(iStoreLink) }}
        src={IStorePng}
        alt={game.name}
        open
      />
      <img
        {...longPressEvent('googleStoreLink')}
        style={{ ...defaultIconStyle(googleStoreLink) }}
        src={GooglePlayPng}
        alt={game.name}
      />
      <img
        {...longPressEvent('gitLink')}
        style={{ ...defaultIconStyle(gitLink) }}
        src={GitPng}
        alt={game.name}
      />
      <img
        {...longPressEvent('googleDriveLink')}
        style={{ ...defaultIconStyle(googleDriveLink) }}
        src={GoogleDrivePng}
        alt={game.name}
      />
      <img
        {...longPressEvent('trelloLink')}
        style={{ ...defaultIconStyle(trelloLink) }}
        src={TrelloPng}
        alt={game.name}
      />
    </Stack>
  );
}

IconLinks.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    publisherName: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    mainIdea: PropTypes.string.isRequired,
    gameUsers: PropTypes.array.isRequired,
    iStoreLink: PropTypes.string,
    googleStoreLink: PropTypes.string,
    gitLink: PropTypes.string,
    googleDriveLink: PropTypes.string,
    trelloLink: PropTypes.string,
  }),
  setAddUserToGameModal: PropTypes.func,
  isGamePage: PropTypes.bool,
};
