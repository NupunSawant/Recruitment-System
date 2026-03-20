// API base URL and endpoints
export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
	// Authentication
	LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  ME: "/auth/me",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

	// Candidates
	CANDIDATES: "/candidates",
	CANDIDATE_BY_ID: (id: string) => `/candidates/${id}`,
	CANDIDATE_STAGES: "/candidates/stages",
	BULK_UPDATE_CANDIDATES: "/candidates/bulk-update",

	// Pipeline
	PIPELINE: "/pipeline",
	PIPELINE_STAGES: "/pipeline/stages",

	// Job Openings
	JOBS: "/jobs",
	JOB_BY_ID: (id: string) => `/jobs/${id}`,

	// Users & Permissions
	USERS: "/users",
	USER_BY_ID: (id: string) => `/users/${id}`,
	USER_ROLES: "/users/roles",
	USER_PERMISSIONS: "/users/permissions",

	// Email Templates
	EMAIL_TEMPLATES: "/email-templates",
	EMAIL_TEMPLATE_BY_ID: (id: string) => `/email-templates/${id}`,
	SEND_EMAIL: "/email-templates/send",

	// Settings
	SETTINGS: "/settings",
} as const;
