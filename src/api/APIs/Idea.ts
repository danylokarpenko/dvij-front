import { IdeaI } from '../../store/ideas/interfaces/iteration.interface';
import axiosInstance from '../axiosConfig';

export const getIdeas = async () => {
  const response = await axiosInstance.get(`/ideas`);
  return response;
};

export const getIdea = async (id: number) => {
  const response: IdeaI = await axiosInstance.get(`/ideas/${id}`);
  return response;
};

export const createIdea = async (idea: IdeaI) => {
  const response: IdeaI = await axiosInstance.post(`/ideas`, idea);
  return response;
};

export const putIdea = async (idea: IdeaI) => {
  const response: IdeaI = await axiosInstance.put(`/ideas/${idea.id}`, idea);
  return response;
};
