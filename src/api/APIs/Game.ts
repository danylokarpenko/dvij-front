// Example of a file src/api/yourApiFunctions.ts

import { GameI } from '../../store/game/interfaces/game.interface';
import axiosInstance from '../axiosConfig';

export const getGames = async (filters: any) => {
  const response = await axiosInstance.get(`/games`, { params: filters });
  return response;
};

export const getGame = async (id: number) => {
  const response: GameI = await axiosInstance.get(`/games/${id}`);
  return response;
};

export const addGameUser = async (payload: any) => {
  const response: GameI = await axiosInstance.post(`/gameUsers`, payload);
  return response;
};

export const updateGame = async (payload: any) => {
  const response: GameI = await axiosInstance.put(
    `/games/${payload.id}`,
    payload
  );
  return response;
};

// Add other API functions as needed
