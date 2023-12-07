import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

const defaultIconOptions = {
  style: { width: '25px', height: '25px', padding: 2, marginRight: 2 },
};

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

export default function IterationItem({ iteration }) {
  const { id, description, likes, isApproved, creator } = iteration;
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      // onClick={() => {
      //   navigate(`/games/${game.id}`);
      // }}
    >
      <Box
        component="img"
        alt={name}
        src={creator.avatarUrl}
        sx={{ width: 20, height: 20, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 100, flexGrow: 0 }}>
        <Typography
          fontSize={14}
          sx={{ color: 'text.primary', flexGrow: 0 }}
          noWrap
        >
          {description}
        </Typography>
      </Box>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          {...defaultIconOptions}
          src={`../../../../assets/icons/${
            likes > 0 ? 'red_heart' : 'grey_heart'
          }.png`}
          alt={'heart'}
          onClick={() => console.log('like')}
        />{' '}
        {likes}
      </div>
    </Stack>
  );
}

IterationItem.propTypes = {
  iteration: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
    creator: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
