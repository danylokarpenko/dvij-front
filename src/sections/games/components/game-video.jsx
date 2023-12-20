import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ResponsiveDialog from '../../../components/modal/modal';
import AddIconLinkForm from '../../../components/Forms/AddIconLinkForm';
// import useLongPress from '../../../hooks/useLongPress';

export default function GameVideo({ game }) {
  const [linkColumnName, setLinkColumnName] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // const onLongPress = (linkColumnName) => {
  //   setLinkColumnName(linkColumnName);
  // };

  // const onClick = (link) => {
  //   window.open(link, '_blank');
  // };

  // const longPressEvent = (linkColumnName) =>
  //   useLongPress(
  //     () => onLongPress(linkColumnName),
  //     () => onClick(game[linkColumnName])
  //   );

  return (
    <>
      <ResponsiveDialog
        open={Boolean(linkColumnName)}
        setOpen={setLinkColumnName}
      >
        {linkColumnName && (
          <AddIconLinkForm
            linkColumnName={'videoUrl'}
            game={game}
            callback={() => setLinkColumnName(null)}
          />
        )}
      </ResponsiveDialog>

      <ReactPlayer
        playing={true}
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
