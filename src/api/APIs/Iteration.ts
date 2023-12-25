import { IterationI } from '../../store/iteration/interfaces/iteration.interface';
import axiosInstance from '../axiosConfig';

export const getIterations = async () => {
  const response = await axiosInstance.get(`/iterations`);
  return response;
};

export const getIteration = async (id: number) => {
  const response: IterationI = await axiosInstance.get(`/iterations/${id}`);
  return response;
};

export const createIteration = async (iteration: IterationI) => {
  const response: IterationI = await axiosInstance.post(
    `/iterations`,
    iteration
  );
  return response;
};

export const deleteIteration = async (id: number) => {
  const response: IterationI = await axiosInstance.delete(`/iterations/${id}`);
  return response;
};

export const putIteration = async (iteration: IterationI) => {
  const response: IterationI = await axiosInstance.put(
    `/iterations/${iteration.id}`,
    iteration
  );
  return response;
};

export const bulkUpdateIterations = async (body: { payload: IterationI[] }) => {
  const response: IterationI[] = await axiosInstance.put(
    `/iterations/bulk-update`,
    body
  );
  return response;
};
