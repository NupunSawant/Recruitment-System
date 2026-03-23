import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth'; // Import your API methods

// Login Thunk
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string; role: 'admin' | 'interviewer'; rememberMe?: boolean }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials); // Call the login API
      return response.data; // Return the data received from the API
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed'); // Handle error if it occurs
    }
  }
);

// Get current user info after login or page reload
export const getMeThunk = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.me(); // Fetch current user info
      return response.data; // Return user data
    } catch (error) {
      return rejectWithValue('Failed to fetch user info');
    }
  }
);

// Logout Thunk
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout(); // Call the logout API
      return {}; // Return empty data on success
    } catch (error) {
      return rejectWithValue('Logout failed'); // Handle error if it occurs
    }
  }
);