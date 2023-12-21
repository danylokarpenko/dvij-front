import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IterationI } from './interfaces/iteration.interface';

interface IterationState {
  current: IterationI | null;
  list: IterationI[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IterationState = {
  current: null,
  list: [],
  isLoading: false,
  error: null,
};

const iterationSlice = createSlice({
  name: 'iterations',
  initialState,
  reducers: {
    fetchIterationsStart(state) {
      state.isLoading = true;
    },
    fetchIterationsSuccess(state, action: PayloadAction<IterationI[]>) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchIterationStart(state) {
      state.isLoading = true;
    },
    fetchIterationSuccess(state, action: PayloadAction<IterationI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    likeIterationStart(state) {
      state.isLoading = true;
    },
    likeIterationSuccess(state, action: PayloadAction<IterationI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    updateIterationStart(state) {
      state.isLoading = true;
    },
    updateIterationSuccess(state, action: PayloadAction<IterationI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    createIterationStart(state) {
      state.isLoading = true;
    },
    createIterationSuccess: (state, action: PayloadAction<IterationI[]>) => {
      state.current = null;
      state.isLoading = false;
      state.error = null;
      state.list = [...action.payload];
    },

    iterationsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add other reducers as needed
  },
});

export const {
  fetchIterationsStart,
  fetchIterationsSuccess,
  iterationsFailure,

  fetchIterationStart,
  fetchIterationSuccess,

  likeIterationStart,
  likeIterationSuccess,

  updateIterationStart,
  updateIterationSuccess,

  createIterationStart,
  createIterationSuccess,
} = iterationSlice.actions;
const iterationReducer = iterationSlice.reducer;
export default iterationReducer;
