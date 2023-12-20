import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import HeartPng from '../../../assets/heart.png';
import HeartActivePng from '../../../assets/heart_active.png';
import { likeIdea } from '../../../store/ideas/ideaActions';

const defaultIconOptions = {
  style: { width: '25px', height: '25px', padding: 2, marginRight: 2 },
};

export default function IdeaItem({ idea }) {
  const { description, likes, creator } = idea;
  const dispatch = useDispatch();
  return (
    <Stack
      paddingTop={1}
      paddingLeft={1}
      paddingRight={1}
      direction="row"
      alignItems="center"
      spacing={1}
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          width: '100%',
        }}
      >
        <img
          {...defaultIconOptions}
          src={likes > 0 ? HeartActivePng : HeartPng}
          alt={'heart'}
          onClick={() => dispatch(likeIdea(idea))}
        />
        {likes.length}
      </div>
    </Stack>
  );
}

IdeaItem.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
    creator: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
