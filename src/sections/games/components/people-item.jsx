import React from 'react';
import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function PeopleItem({ gameUser }) {
  const {
    user: { id, avatarUrl },
    isLead,
  } = gameUser;
  const navigate = useNavigate();
  const handleRedirectToUserInfo = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/users/${id}`, { replace: true });
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2} marginRight={0.5}>
      <Box
        onClick={handleRedirectToUserInfo}
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
