import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import gameReducer from '../game/gameSlice';

// Reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
