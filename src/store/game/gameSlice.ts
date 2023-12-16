import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameI } from './interfaces/game.interface';

interface GameState {
  current: any;
  list: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GameState = {
  current: null,
  list: [],
  isLoading: false,
  error: null,
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStart(state) {
      state.isLoading = true;
    },
    fetchGamesSuccess(state, action: PayloadAction<GameI[]>) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchGameStart(state) {
      state.isLoading = true;
    },
    fetchGameSuccess(state, action: PayloadAction<GameI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchGamesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add other reducers as needed
  },
});

export const {
  fetchGamesStart,
  fetchGamesSuccess,
  fetchGamesFailure,
  fetchGameStart,
  fetchGameSuccess,
} = gameSlice.actions;
const gameReducer = gameSlice.reducer;
export default gameReducer;
