import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  loading: boolean;
  stats: {
    totalCandidates: number;
    activeJobs: number;
    interviewsToday: number;
    offersExtended: number;
  };
}

const initialState: DashboardState = {
  loading: false,
  stats: {
    totalCandidates: 0,
    activeJobs: 0,
    interviewsToday: 0,
    offersExtended: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export const dashboardReducer = dashboardSlice.reducer;
