// src/store/auth/authSelectors.ts
import { RootState } from '../app/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
// Add other selectors as needed
