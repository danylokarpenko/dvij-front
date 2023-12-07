// Example of a file src/api/yourApiFunctions.ts

import { LoginDto } from '../../store/auth/dto/login.dto';
import axiosInstance from '../axiosConfig';

export const loginUser = async (
  loginData: LoginDto
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: any;
}> => {
  const response: {
    accessToken: string;
    refreshToken: string;
    user: any;
  } = await axiosInstance.post(`/auth/login`, loginData);
  return response;
};

// Add other API functions as needed
