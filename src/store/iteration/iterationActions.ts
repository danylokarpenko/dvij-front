import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Iteration from '../../api/APIs/Iteration';
import {
  createIterationStart,
  fetchIterationStart,
  fetchIterationSuccess,
  iterationsFailure,
  fetchIterationsStart,
  fetchIterationsSuccess,
  likeIterationStart,
} from './iterationSlice';
import { IterationI } from './interfaces/iteration.interface';
import { RootState } from '../store';
import { selectGame } from '../game/gameSelectors';
import { fetchGameSuccess } from '../game/gameSlice';

export const fetchIterations = createAsyncThunk(
  'iterations/fetchIterations',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchIterationsStart());
      const response = await Iteration.getIterations();
      dispatch(fetchIterationsSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(iterationsFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIteration = createAsyncThunk(
  'iterations/fetchIteration',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchIterationStart());
      const response = await Iteration.getIteration(id);
      dispatch(fetchIterationSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(iterationsFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeIteration = createAsyncThunk(
  'iterations/likeIteration',
  async (iteration: IterationI, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(likeIterationStart());
      const response = await Iteration.putIteration({
        ...iteration,
        likes: iteration.likes + 1,
      });

      const game = selectGame(getState() as RootState);
      dispatch(
        fetchGameSuccess({
          ...game,
          iterations: game.iterations.map((i: IterationI) =>
            i.id === response.id ? response : i
          ),
        })
      );
      return response;
    } catch (error: any) {
      dispatch(iterationsFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createIteration = createAsyncThunk(
  'iterations/createIteration',
  async (payload: IterationI, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(createIterationStart());
      const response = await Iteration.createIteration(payload);
      const game = selectGame(getState() as RootState);
      dispatch(
        fetchGameSuccess({
          ...game,
          iterations: [...game.iterations, response],
        })
      );
      return response;
    } catch (error: any) {
      dispatch(iterationsFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

// Define other async actions like signup, refresh, logout
