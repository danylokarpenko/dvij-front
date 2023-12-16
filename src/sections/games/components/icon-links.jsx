import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Stack } from '@mui/material';
import ResponsiveDialog from '../../../components/modal/modal';
import AddIconLinkForm from '../../../components/Forms/AddIconLinkForm';
import useLongPress from '../../../hooks/useLongPress';

const defaultIconStyle = (name) => ({
  width: '25px',
  height: '25px',
  padding: 2,
  marginRight: 2,
  border: !name ? '2px solid red' : 'none',
});

export default function IconLinks({ game }) {
  const [linkColumnName, setLinkColumnName] = useState(null);
  const { iStoreLink, googleStoreLink, gitLink, googleDriveLink, trelloLink } =
    game;

  const onLongPress = (linkColumnName) => {
    setLinkColumnName(linkColumnName);
  };

  const onClick = (link) => {
    window.open(link, '_blank');
  };

  const longPressEvent = (linkColumnName) =>
    useLongPress(
      () => onLongPress(linkColumnName),
      () => onClick(game[linkColumnName])
    );

  return (
    <Stack direction="row">
      <ResponsiveDialog
        open={Boolean(linkColumnName)}
        setOpen={setLinkColumnName}
      >
        {linkColumnName && (
          <AddIconLinkForm
            linkColumnName={linkColumnName}
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
        src={'../../../../assets/iStore.png'}
        alt={game.name}
        open
      />
      <img
        {...longPressEvent('googleStoreLink')}
        style={{ ...defaultIconStyle(googleStoreLink) }}
        src={'../../../../assets/google_play.png'}
        alt={game.name}
      />
      <img
        {...longPressEvent('gitLink')}
        style={{ ...defaultIconStyle(gitLink) }}
        src={'../../../../assets/git.png'}
        alt={game.name}
      />
      <img
        {...longPressEvent('googleDriveLink')}
        style={{ ...defaultIconStyle(googleDriveLink) }}
        src={'../../../../assets/google_drive.png'}
        alt={game.name}
      />
      <img
        {...longPressEvent('trelloLink')}
        style={{ ...defaultIconStyle(trelloLink) }}
        src={'../../../../assets/trello.png'}
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