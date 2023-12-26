import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function PeopleItem({ user }) {
  const { id, avatarUrl, firstName, lastName, role, jobTitle } = user;
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
        }}
      />
      <Stack spacing={0} sx={{ p: 0, pr: 0 }}>
        <Typography fontSize={14} sx={{ color: 'text.primary', flexGrow: 0 }}>
          {firstName} {lastName}
        </Typography>
        <Typography fontSize={10} sx={{ color: 'text.secondary', flexGrow: 0 }}>
          {role}
        </Typography>
        <Typography fontSize={10} sx={{ color: 'text.secondary', flexGrow: 0 }}>
          {jobTitle}
        </Typography>
      </Stack>
    </Stack>
  );
}

PeopleItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
  }),
};
