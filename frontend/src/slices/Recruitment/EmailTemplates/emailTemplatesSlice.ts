import { createSlice } from '@reduxjs/toolkit';

interface EmailTemplatesState {
  templates: any[];
  loading: boolean;
}

const initialState: EmailTemplatesState = {
  templates: [],
  loading: false,
};

const emailTemplatesSlice = createSlice({
  name: 'emailTemplates',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export const emailTemplatesReducer = emailTemplatesSlice.reducer;
