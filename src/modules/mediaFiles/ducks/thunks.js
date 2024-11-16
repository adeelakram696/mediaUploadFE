import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMedia, uploadMedia } from './api';

export const mediaList = createAsyncThunk('media/list', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchMedia();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch media list');
  }
});

export const mediaUpload = createAsyncThunk('media/upload', async (data, { rejectWithValue }) => {
  try {
    await uploadMedia(data);
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to upload media');
  }
});
