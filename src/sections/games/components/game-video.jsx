import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ResponsiveDialog from '../../../components/modal/modal';
import AddIconLinkForm from '../../../components/Forms/AddIconLinkForm';
import useLongPress from '../../../hooks/useLongPress';
export default function GameVideo({ game }) {
  const [linkColumnName, setLinkColumnName] = useState(null);
  const [isLoading, setLoading] = useState(true);
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
      {isLoading && <div style={{ marginTop: 20 }}>Loading...</div>}{' '}
      <video
        {...longPressEvent('videoUrl')}
        style={{
          width: '150px',
          height: '150px',
          border: !game.videoUrl ? '1px solid red' : 'none',
        }}
        autoPlay
        loop
        muted
        playsInline
        poster={game.videoUrl || 'https://assets.codepen.io/6093409/river.jpg'}
        onLoadedData={() => setLoading(false)}
      >
        <source
          src={game.videoUrl || 'https://assets.codepen.io/6093409/river.mp4'}
          type="video/mp4"
        />
      </video>
    </>
  );
}

GameVideo.propTypes = {
  game: PropTypes.shape({
    videoUrl: PropTypes.string.isRequired,
  }),
};
