import { createSlice } from '@reduxjs/toolkit';

interface PipelineState {
  stages: any[];
  loading: boolean;
}

const initialState: PipelineState = {
  stages: [],
  loading: false,
};

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export const pipelineReducer = pipelineSlice.reducer;
