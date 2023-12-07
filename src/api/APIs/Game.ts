// Example of a file src/api/yourApiFunctions.ts

import { LoginDto } from '../../store/auth/dto/login.dto';
import { CreateGameDto } from '../../store/game/dto/create-game.dto';
import axiosInstance from '../axiosConfig';

export const getGames = async () => {
  const response = await axiosInstance.get(`/games`);
  return response;
};

export const getGame = async (id: number) => {
  const response: CreateGameDto = await axiosInstance.get(`/games/${id}`);
  return response;
};

// Add other API functions as needed
