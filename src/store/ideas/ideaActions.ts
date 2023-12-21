import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Idea from '../../api/APIs/Idea';

import { RootState } from '../store';
import { IdeaI } from './interfaces/idea.interface';
import {
  createIdeaStart,
  fetchIdeaStart,
  fetchIdeaSuccess,
  ideasFailure,
  fetchIdeasStart,
  fetchIdeasSuccess,
  likeIdeaStart,
} from './ideaSlice';
import { selectIdeas } from './ideaSelectors';

export const fetchIdeas = createAsyncThunk(
  'ideas/fetchIdeas',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchIdeasStart());
      const response = await Idea.getIdeas();
      dispatch(fetchIdeasSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(ideasFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIdea = createAsyncThunk(
  'ideas/fetchIdea',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchIdeaStart());
      const response = await Idea.getIdea(id);
      dispatch(fetchIdeaSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(ideasFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeIdea = createAsyncThunk(
  'ideas/likeIdea',
  async (idea: IdeaI, { dispatch, rejectWithValue, getState }) => {
    const userId = localStorage.getItem('userId');
    try {
      dispatch(likeIdeaStart());
      const response = await Idea.putIdea({
        ...idea,
        likes: idea.likes.includes(Number(userId))
          ? idea.likes.filter((id: number) => id !== Number(userId))
          : [...idea.likes, Number(userId)],
      });

      const ideas = selectIdeas(getState() as RootState);
      dispatch(
        fetchIdeasSuccess(
          ideas.map((i: IdeaI) => (i.id === response.id ? response : i))
        )
      );
      return response;
    } catch (error: any) {
      dispatch(ideasFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createIdea = createAsyncThunk(
  'ideas/createIdea',
  async (payload: IdeaI, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(createIdeaStart());
      const response = await Idea.createIdea(payload);
      const ideas = selectIdeas(getState() as RootState);
      dispatch(fetchIdeasSuccess(ideas.concat(response)));
      return response;
    } catch (error: any) {
      dispatch(ideasFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

// Define other async actions like signup, refresh, logout

export const updateIdea = createAsyncThunk(
  'ideas/updateIdea',
  async (
    { payload: idea }: { payload: IdeaI },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const response = await Idea.putIdea({
        ...idea,
      });

      const ideas = selectIdeas(getState() as RootState);
      dispatch(
        fetchIdeasSuccess(
          ideas.map((i: IdeaI) => (i.id === response.id ? response : i))
        )
      );
      return response;
    } catch (error: any) {
      dispatch(ideasFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteIdea = createAsyncThunk(
  'ideas/deleteIdea',
  async (id: number, { dispatch, rejectWithValue, getState }) => {
    try {
      // dispatch(deleteIdeaStart());
      const response = await Idea.deleteIdea(id);
      const ideas = selectIdeas(getState() as RootState);
      dispatch(fetchIdeasSuccess(ideas.filter((i: IdeaI) => i.id !== id)));
      return response;
      return response;
    } catch (error: any) {
      dispatch(ideasFailure(error.message));
      return rejectWithValue(error.response.data);
    }
  }
);
