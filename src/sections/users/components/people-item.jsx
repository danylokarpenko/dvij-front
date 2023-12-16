import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function PeopleItem({ user }) {
  const { id, avatarUrl, firstName, lastName } = user;
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      marginRight={0.5}
      onClick={() => navigate('/users/' + id)}
    >
      <Box
        component="img"
        alt={id}
        src={avatarUrl}
        sx={{
          width: 50,
          height: 50,
          borderRadius: 1,
          flexShrink: 0,
          // border: isLead ? '2px solid #FFC700' : 'none',
        }}
      />
      <Typography>
        {firstName} {lastName}
      </Typography>
    </Stack>
  );
}

PeopleItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
};
