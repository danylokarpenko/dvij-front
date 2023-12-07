import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginUser } from '../../api';
import { LoginDto } from './dto/login.dto';
import { authFailure, loginSuccess } from './authSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (
    { loginData, callback }: { loginData: LoginDto; callback: () => void },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await loginUser(loginData);
      // Save the token in local storage
      localStorage.setItem('authToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      // Dispatch the loginSuccess action
      dispatch(loginSuccess(response.accessToken));

      if (response.accessToken) {
        callback();
      }
      return response;
    } catch (error: any) {
      dispatch(authFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

// Define other async actions like signup, refresh, logout
