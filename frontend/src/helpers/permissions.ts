import { USER_ROLES, PERMISSIONS } from '../Constants/roles';

// Role-based permission mapping
const rolePermissions: Record<string, string[]> = {
  [USER_ROLES.ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.HR_MANAGER]: [
    PERMISSIONS.VIEW_CANDIDATES,
    PERMISSIONS.EDIT_CANDIDATES,
    PERMISSIONS.VIEW_PIPELINE,
    PERMISSIONS.MANAGE_PIPELINE,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.MANAGE_JOBS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_SETTINGS,
  ],
  [USER_ROLES.INTERVIEWER]: [
    PERMISSIONS.VIEW_CANDIDATES,
    PERMISSIONS.EDIT_CANDIDATES,
    PERMISSIONS.VIEW_PIPELINE,
  ],
  [USER_ROLES.RECRUITER]: [
    PERMISSIONS.VIEW_CANDIDATES,
    PERMISSIONS.EDIT_CANDIDATES,
    PERMISSIONS.VIEW_PIPELINE,
    PERMISSIONS.MANAGE_PIPELINE,
    PERMISSIONS.VIEW_JOBS,
  ],
};

// Check if user has permission
export const hasPermission = (userRole: string, permission: string): boolean => {
  const permissions = rolePermissions[userRole] || [];
  return permissions.includes(permission);
};

// Check if user has any of the permissions
export const hasAnyPermission = (userRole: string, permissions: string[]): boolean => {
  return permissions.some((permission) => hasPermission(userRole, permission));
};

// Check if user has all permissions
export const hasAllPermissions = (userRole: string, permissions: string[]): boolean => {
  return permissions.every((permission) => hasPermission(userRole, permission));
};
