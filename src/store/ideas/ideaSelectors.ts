// src/store/auth/authSelectors.ts
import { RootState } from '../store';

export const selectIdeas = (state: RootState) => state.idea.list;
export const selectIdea = (state: RootState) => state.idea.current;
export const selectIsLoading = (state: RootState) => state.idea.isLoading;
// Add other selectors as needed
