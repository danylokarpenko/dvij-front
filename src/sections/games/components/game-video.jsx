import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ResponsiveDialog from '../../../components/modal/modal';
import AddIconLinkForm from '../../../components/Forms/EditGamePartialForm';
// import useLongPress from '../../../hooks/useLongPress';

export default function GameVideo({ game }) {
  const [gameColumnNameToEdit, setLinkColumnName] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // const onLongPress = (gameColumnNameToEdit) => {
  //   setLinkColumnName(gameColumnNameToEdit);
  // };

  // const onClick = (link) => {
  //   window.open(link, '_blank');
  // };

  // const longPressEvent = (gameColumnNameToEdit) =>
  //   useLongPress(
  //     () => onLongPress(gameColumnNameToEdit),
  //     () => onClick(game[gameColumnNameToEdit])
  //   );

  return (
    <>
      <ResponsiveDialog
        open={Boolean(gameColumnNameToEdit)}
        setOpen={setLinkColumnName}
      >
        {gameColumnNameToEdit && (
          <AddIconLinkForm
            gameColumnNameToEdit={'videoUrl'}
            game={game}
            callback={() => setLinkColumnName(null)}
          />
        )}
      </ResponsiveDialog>

      <ReactPlayer
        playing={false}
        muted={true}
        loop={true}
        height={'auto'}
        width={'auto'}
        url={game.videoUrl || 'https://www.youtube.com/watch?v=p1arBo4KUcM'}
      />
    </>
  );
}

GameVideo.propTypes = {
  game: PropTypes.shape({
    videoUrl: PropTypes.string.isRequired,
  }),
};
