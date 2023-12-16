import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Box, Grid, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/user/userActions';
import { selectUser } from '../../store/user/userSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';
const colors = ['#FF37A3', '#15A8FB', '#71FF3F'];

function valuetext(value) {
  return `${value}$`;
}

export default function UserInfoView() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <AppThemeProvider>
      <Grid xs={12} md={6} lg={8}>
        <Card>
          <Grid style={{ display: 'flex' }}>
            <Box
              style={{ margin: '10px 10px 0 10px' }}
              component="img"
              alt={id}
              src={user.avatarUrl}
              sx={{
                margin: '5 0 0 5',
                width: 150,
                height: 150,
                borderRadius: 50,
                flexShrink: 0,
              }}
            />
            <Grid>
              <Typography
                fontSize={20}
                sx={{ color: 'text.primary', flexGrow: 0 }}
                noWrap
                style={{ margin: '10px 0 0' }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                fontSize={20}
                sx={{ color: 'text.secondary', flexGrow: 0 }}
                noWrap
              >
                {user.birthDayDate}
              </Typography>
              <Typography
                fontSize={20}
                sx={{ color: 'text.secondary', flexGrow: 0 }}
                noWrap
              >
                {user.jobTitle}
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ padding: '0 10px' }}>
            <Slider
              marks={[
                { value: user.payRate, label: `${user.payRate}$` },
                {
                  value: 50,
                  label: `${50}$`,
                },
              ]}
              defaultValue={30}
              valuetext={valuetext}
              aria-label="Custom marks"
              step={10}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid>
            {user.gameUsers
              .filter((i) => i.bonus !== 0)
              .map((gameUser, i) => (
                <Typography
                  key={i}
                  fontSize={20}
                  sx={{ color: colors[i] || '#15A8FB', flexGrow: 0 }}
                  noWrap
                  style={{ margin: '10px 0 0' }}
                >
                  {gameUser.bonus}% {gameUser.game.name}
                </Typography>
              ))}
          </Grid>
        </Card>
      </Grid>
    </AppThemeProvider>
  );
}

UserInfoView.propTypes = {
  isHitPage: PropTypes.bool,
};
