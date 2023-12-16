// src/store/auth/authSelectors.ts
import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.user.list;
export const selectUser = (state: RootState) => state.user.current;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
// Add other selectors as needed
