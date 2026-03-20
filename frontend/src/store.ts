import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/Authentication/authSlice';
import { dashboardReducer } from './slices/Dashboard/dashboardSlice';
import { candidatesReducer } from './slices/Recruitment/Candidates/candidatesSlice';
import { jobOpeningsReducer } from './slices/Recruitment/JobOpenings/jobOpeningsSlice';
import { pipelineReducer } from './slices/Recruitment/Pipeline/pipelineSlice';
import { usersPermissionsReducer } from './slices/Recruitment/UsersPermissions/usersPermissionsSlice';
import { emailTemplatesReducer } from './slices/Recruitment/EmailTemplates/emailTemplatesSlice';
import { settingsReducer } from './slices/Recruitment/Settings/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    candidates: candidatesReducer,
    jobOpenings: jobOpeningsReducer,
    pipeline: pipelineReducer,
    usersPermissions: usersPermissionsReducer,
    emailTemplates: emailTemplatesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
