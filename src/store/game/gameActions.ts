import { createAsyncThunk } from '@reduxjs/toolkit';

import { getGame, getGames } from '../../api/APIs/Game';
import {
  fetchGameStart,
  fetchGameSuccess,
  fetchGamesFailure,
  fetchGamesStart,
  fetchGamesSuccess,
} from './gameSlice';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchGamesStart());
      const response = await getGames();
      dispatch(fetchGamesSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(fetchGamesFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGame = createAsyncThunk(
  'games/fetchGame',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchGameStart());
      const response = await getGame(id);
      dispatch(fetchGameSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(fetchGamesFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

// Define other async actions like signup, refresh, logout
