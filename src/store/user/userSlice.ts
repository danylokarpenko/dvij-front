import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserI } from './interfaces/user.interface';

interface UserState {
  current: any;
  list: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  current: null,
  list: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.isLoading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<UserI[]>) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchUserStart(state) {
      state.isLoading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<UserI>) {
      state.current = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add other reducers as needed
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserStart,
  fetchUserSuccess,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
