import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdeaI } from './interfaces/iteration.interface';

interface IdeaState {
  current: IdeaI | null;
  list: IdeaI[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IdeaState = {
  current: null,
  list: [],
  isLoading: false,
  error: null,
};

const ideaSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    fetchIdeasStart(state) {
      state.isLoading = true;
    },
    fetchIdeasSuccess(state, action: PayloadAction<IdeaI[]>) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchIdeaStart(state) {
      state.isLoading = true;
    },
    fetchIdeaSuccess(state, action: PayloadAction<IdeaI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    likeIdeaStart(state) {
      state.isLoading = true;
    },
    likeIdeaSuccess(state, action: PayloadAction<IdeaI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    createIdeaStart(state) {
      state.isLoading = true;
    },
    createIdeaSuccess: (state, action: PayloadAction<IdeaI[]>) => {
      state.current = null;
      state.isLoading = false;
      state.error = null;
      state.list = [...action.payload];
    },

    ideasFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add other reducers as needed
  },
});

export const {
  fetchIdeasStart,
  fetchIdeasSuccess,
  ideasFailure,

  fetchIdeaStart,
  fetchIdeaSuccess,

  likeIdeaStart,
  likeIdeaSuccess,

  createIdeaStart,
  createIdeaSuccess,
} = ideaSlice.actions;
const ideaReducer = ideaSlice.reducer;
export default ideaReducer;
