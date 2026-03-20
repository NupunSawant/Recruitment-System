import { apiClient } from "./client";
import { API_ENDPOINTS } from "../config/api";

export interface LoginCredentials {
	email: string;
	password: string;
	role: "admin" | "interviewer";
	rememberMe?: boolean;
}

export interface AuthUser {
	id: string;
	name: string;
	email: string;
	role: "admin" | "interviewer";
	isActive?: boolean;
}

export interface LoginApiResponse {
	success: boolean;
	message: string;
	data: {
		token: string;
		accessToken: string;
		user: AuthUser;
	};
}

export interface RefreshApiResponse {
	success: boolean;
	message: string;
	data: {
		token: string;
		accessToken: string;
	};
}

export interface MeApiResponse {
	success: boolean;
	message: string;
	data: {
		user: AuthUser;
	};
}

export const authApi = {
	login: async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
		return apiClient.post<LoginApiResponse>(API_ENDPOINTS.LOGIN, credentials);
	},

	refresh: async (): Promise<RefreshApiResponse> => {
		return apiClient.post<RefreshApiResponse>(API_ENDPOINTS.REFRESH);
	},

	logout: async (): Promise<{ success: boolean; message: string }> => {
		return apiClient.post<{ success: boolean; message: string }>(
			API_ENDPOINTS.LOGOUT,
		);
	},

	me: async (): Promise<MeApiResponse> => {
		return apiClient.get<MeApiResponse>(API_ENDPOINTS.ME);
	},
};
