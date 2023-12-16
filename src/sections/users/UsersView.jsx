import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Scrollbar from '../../components/scrollbar';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/user/userActions';
import { selectUsers } from '../../store/user/userSelectors';
import AppThemeProvider from '../../theme/AppThemeProvider';
import UsersItem from './components/people-item';

export default function UsersView() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const logginedUserId = localStorage.getItem('userId');
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <AppThemeProvider>
      <Grid xs={12} md={6} lg={8}>
        <Card>
          <Scrollbar>
            <Stack spacing={3} sx={{ p: 0, pr: 0 }}>
              {[...users]
                .sort((u1, u2) => {
                  if (u1.id === Number(logginedUserId)) return -1;
                  if (u2.id === Number(logginedUserId)) return 1;
                  return 0;
                })
                .map((user) => (
                  <UsersItem key={user.id} user={user} />
                ))}
            </Stack>
          </Scrollbar>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Card>
      </Grid>
    </AppThemeProvider>
  );
}

UsersView.propTypes = {};
