import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import gameReducer from './game/gameSlice';
import iterationReducer from './iteration/iterationSlice';
import userReducer from './user/userSlice';

// Reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    iteration: iterationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
