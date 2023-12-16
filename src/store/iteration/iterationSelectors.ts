// src/store/auth/authSelectors.ts
import { RootState } from '../store';

export const selectIterations = (state: RootState) => state.iteration.list;
export const selectIteration = (state: RootState) => state.iteration.current;
export const selectIsLoading = (state: RootState) => state.iteration.isLoading;
// Add other selectors as needed
