import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

const sortByIsLead = (array) => {
  return [...array].sort((a, b) => {
    console.log(a, b);
    if (a.isLead && !b.isLead) {
      return -1; // a comes first
    }
    if (!a.isLead && b.isLead) {
      return 1; // b comes first
    }
    return 0; // no change in order
  });
};

export default function GamesItem({ game }) {
  const { name, publisherName, iconUrl, mainIdea, gameUsers } = game;
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={() => {
        navigate(`/games/${game.id}`);
      }}
    >
      <Box
        component="img"
        alt={name}
        src={iconUrl}
        sx={{ width: 70, height: 70, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 100, flexGrow: 0 }}>
        <Typography
          fontSize={14}
          sx={{ color: 'text.primary', flexGrow: 0 }}
          noWrap
        >
          {name}
        </Typography>

        <Typography
          fontSize={10}
          sx={{ color: 'text.secondary', flexGrow: 0 }}
          noWrap
        >
          {publisherName}
        </Typography>

        <Typography
          fontSize={10}
          sx={{ color: 'text.secondary', flexGrow: 0 }}
          noWrap
        >
          {mainIdea}
        </Typography>
      </Box>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {sortByIsLead(gameUsers).map((gameUser, i) => (
          <PeopleItem key={i} gameUser={gameUser} />
        ))}
      </div>
    </Stack>
  );
}

GamesItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    publisherName: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    mainIdea: PropTypes.string.isRequired,
    gameUsers: PropTypes.array.isRequired,
  }),
};

function PeopleItem({ gameUser }) {
  const {
    user: { id, avatarUrl },
    isLead,
  } = gameUser;

  return (
    <Stack direction="row" alignItems="center" spacing={2} marginRight={0.5}>
      <Box
        component="img"
        alt={id}
        src={avatarUrl}
        sx={{
          width: 22,
          height: 22,
          borderRadius: 1,
          flexShrink: 0,
          border: isLead ? '2px solid #FFC700' : 'none',
        }}
      />
    </Stack>
  );
}

PeopleItem.propTypes = {
  gameUser: PropTypes.shape({
    user: {
      id: PropTypes.number.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    },
    isLead: PropTypes.bool.isRequired,
  }),
};
