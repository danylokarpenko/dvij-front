// src/store/auth/authSelectors.ts
import { RootState } from '../app/store';

export const selectGames = (state: RootState) => state.game.list;
export const selectGame = (state: RootState) => state.game.current;
export const selectIsLoading = (state: RootState) => state.game.isLoading;
// Add other selectors as needed
