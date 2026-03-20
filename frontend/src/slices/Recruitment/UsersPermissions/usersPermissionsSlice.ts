import { createSlice } from '@reduxjs/toolkit';

interface UsersPermissionsState {
  users: any[];
  loading: boolean;
}

const initialState: UsersPermissionsState = {
  users: [],
  loading: false,
};

const usersPermissionsSlice = createSlice({
  name: 'usersPermissions',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export const usersPermissionsReducer = usersPermissionsSlice.reducer;
