import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Users from '../../api/APIs/User';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from './userSlice';
import { RootState } from '../store';
import { selectUser } from './userSelectors';
import { UserI } from './interfaces/user.interface';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchUsersStart(filters));
      const response = await Users.getUsers(filters);
      dispatch(fetchUsersSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      if (!id) return rejectWithValue('No id provided');
      dispatch(fetchUserStart());
      const response = await Users.getUser(id);
      dispatch(fetchUserSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserUser = createAsyncThunk(
  'iterations/createUser',
  async (payload: any, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await Users.createUser(payload);
      const user = selectUser(getState() as RootState);
      dispatch(
        fetchUserSuccess({
          ...user,
          userUsers: [...user.userUsers, response],
        })
      );
      return response;
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'iterations/updateUser',
  async (
    {
      payload,
      gameColumnNameToEdit,
    }: { payload: any; gameColumnNameToEdit: string },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const updatedUser: UserI = await Users.updateUser(payload);
      const user = selectUser(getState() as RootState);
      dispatch(
        fetchUserSuccess({
          ...user,
          // @ts-ignore
          [gameColumnNameToEdit]: updatedUser[gameColumnNameToEdit],
        })
      );
      return updatedUser;
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

// Define other async actions like signup, refresh, logout
