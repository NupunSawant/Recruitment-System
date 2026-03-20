// User roles and permissions
export const USER_ROLES = {
  ADMIN: 'admin',
  HR_MANAGER: 'hr_manager',
  INTERVIEWER: 'interviewer',
  RECRUITER: 'recruiter',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.HR_MANAGER]: 'HR Manager',
  [USER_ROLES.INTERVIEWER]: 'Interviewer',
  [USER_ROLES.RECRUITER]: 'Recruiter',
};

export const PERMISSIONS = {
  VIEW_CANDIDATES: 'view_candidates',
  EDIT_CANDIDATES: 'edit_candidates',
  DELETE_CANDIDATES: 'delete_candidates',
  VIEW_PIPELINE: 'view_pipeline',
  MANAGE_PIPELINE: 'manage_pipeline',
  VIEW_JOBS: 'view_jobs',
  MANAGE_JOBS: 'manage_jobs',
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
} as const;
