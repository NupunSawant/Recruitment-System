import { createSlice } from '@reduxjs/toolkit';

interface JobOpeningsState {
  jobs: any[];
  loading: boolean;
}

const initialState: JobOpeningsState = {
  jobs: [],
  loading: false,
};

const jobOpeningsSlice = createSlice({
  name: 'jobOpenings',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export const jobOpeningsReducer = jobOpeningsSlice.reducer;
