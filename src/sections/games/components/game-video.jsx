import React from 'react';

export default function GameVideo(game) {
  return (
    <video
      style={{ width: '150px', height: '150px' }}
      autoPlay
      loop
      muted
      poster={game.videoUrl || 'https://assets.codepen.io/6093409/river.jpg'}
    >
      <source
        src={game.videoUrl || 'https://assets.codepen.io/6093409/river.mp4'}
        type="video/mp4"
      />
    </video>
  );
}
