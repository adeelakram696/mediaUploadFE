import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "./api";

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await login(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});
export const registerUser = createAsyncThunk('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    const response = await register(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registeration failed');
  }
});
