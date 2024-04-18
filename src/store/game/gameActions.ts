import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import * as Games from '../../api/APIs/Game';
import {
  fetchGameStart,
  fetchGameSuccess,
  fetchGamesFailure,
  fetchGamesStart,
  fetchGamesSuccess,
  createGameStart,
} from './gameSlice';
import { RootState } from '../store';
import { selectGame } from './gameSelectors';
import { GameI } from './interfaces/game.interface';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchGamesStart());
      const response = await Games.getGames(filters);
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
      if (!id) return rejectWithValue('No id provided');
      dispatch(fetchGameStart());
      const response = await Games.getGame(id);
      dispatch(fetchGameSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(fetchGamesFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGameUser = createAsyncThunk(
  'iterations/createGameUser',
  async (payload: any, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await Games.addGameUser(payload);
      const game = selectGame(getState() as RootState);
      dispatch(
        fetchGameSuccess({
          ...game,
          gameUsers: [...game.gameUsers, response],
        })
      );
      return response;
    } catch (error: any) {
      dispatch(fetchGamesFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGame = createAsyncThunk(
  'iterations/updateGame',
  async (
    {
      payload,
      gameColumnNameToEdit,
    }: { payload: any; gameColumnNameToEdit: string },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const updatedGame: GameI = await Games.updateGame(payload);
      const game = selectGame(getState() as RootState);
      dispatch(
        fetchGameSuccess({
          ...game,
          // @ts-ignore
          [gameColumnNameToEdit]: updatedGame[gameColumnNameToEdit],
        })
      );
      return updatedGame;
    } catch (error: any) {
      dispatch(fetchGamesFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGame = createAsyncThunk(
  'games/createGame',
  async (
    { payload, callback }: { payload: GameI; callback: () => void },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(createGameStart());
      const game = await Games.createGame(payload);
      dispatch(
        fetchGameSuccess({
          ...game,
        })
      );
      callback();
      return game;
    } catch (error: any) {
      console.log(error.response.data.message.message);

      toast.error(error.response.data.message.message);
      dispatch(fetchGamesFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);
// Define other async actions like signup, refresh, logout
