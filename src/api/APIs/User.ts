// Example of a file src/api/yourApiFunctions.ts

import { UserI } from '../../store/user/interfaces/user.interface';
import axiosInstance from '../axiosConfig';

export const getUsers = async (filters: any) => {
  const response: { data: UserI[] } = await axiosInstance.get(`/users`, {
    params: filters,
  });
  return response;
};

export const getUser = async (id: number) => {
  const response: UserI = await axiosInstance.get(`/users/${id}`);
  return response;
};

export const createUser = async (payload: any) => {
  const response: UserI = await axiosInstance.get(`/users`, payload);
  return response;
};

export const updateUser = async (payload: any) => {
  const response: UserI = await axiosInstance.put(
    `/users/${payload.id}`,
    payload
  );
  return response;
};

// Add other API functions as needed
