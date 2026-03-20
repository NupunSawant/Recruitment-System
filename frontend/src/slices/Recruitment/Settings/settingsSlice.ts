import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  preferences: any;
  loading: boolean;
}

const initialState: SettingsState = {
  preferences: {},
  loading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export const settingsReducer = settingsSlice.reducer;
