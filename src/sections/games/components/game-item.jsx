import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PeopleItem from './people-item';

const sortByIsLead = (array) => {
  return [...array].sort((a, b) => {
    if (a.isLead && !b.isLead) {
      return -1; // a comes first
    }
    if (!a.isLead && b.isLead) {
      return 1; // b comes first
    }
    return 0; // no change in order
  });
};

export default function GamesItem({ game, setAddUserToGameModal }) {
  const { name, publisherName, iconUrl, mainIdea, gameUsers } = game;
  const navigate = useNavigate();

  const showAddUSerBtn =
    window.location.pathname.includes('games/') ||
    window.location.pathname.includes('hits/');

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={() => {
        navigate(`${window.location.pathname}/${game.id}`);
      }}
      style={{ height: '70px' }}
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

      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          width: '100%',
          justifyContent: 'end',
          height: '100%',
        }}
      >
        {sortByIsLead(gameUsers).map((gameUser, i) => (
          <PeopleItem key={i} gameUser={gameUser} />
        ))}
      </div>
      {showAddUSerBtn && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            setAddUserToGameModal(true);
          }}
        >
          <SportsKabaddiIcon />
        </Button>
      )}
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
  setAddUserToGameModal: PropTypes.func,
  isGamePage: PropTypes.bool,
  isHitPage: PropTypes.bool,
};
