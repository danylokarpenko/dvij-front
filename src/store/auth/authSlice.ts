// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
//   LoginDto,
//   CreateUserDto,
//   RefreshTokenDto,
//   LogoutDto,
// } from "path-to-your-dto"; // Adjust the import path

interface AuthState {
  user: any; // Define the user type
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { loginSuccess, authFailure } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
