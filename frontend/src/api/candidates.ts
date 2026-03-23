import { apiClient } from "./client";
import { API_ENDPOINTS } from "../config/api";
import type { Candidate } from "../data/mockData";

export interface CandidatesQueryParams {
	search?: string;
	role?: string;
	stage?: string;
	candidateType?: string;
	page?: number;
	limit?: number;
}

export interface CandidatesListResponse {
	success: boolean;
	message: string;
	data: {
		items: Candidate[];
		pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		};
	};
}

export interface CandidateResponse {
	success: boolean;
	message: string;
	data: Candidate;
}

const buildQueryString = (params?: CandidatesQueryParams) => {
	if (!params) return "";

	const query = new URLSearchParams();

	if (params.search) query.append("search", params.search);
	if (params.role) query.append("role", params.role);
	if (params.stage) query.append("stage", params.stage);
	if (params.candidateType) query.append("candidateType", params.candidateType);
	if (params.page) query.append("page", String(params.page));
	if (params.limit) query.append("limit", String(params.limit));

	const queryString = query.toString();
	return queryString ? `?${queryString}` : "";
};

export const candidatesApi = {
	getAll: async (
		params?: CandidatesQueryParams,
	): Promise<CandidatesListResponse> => {
		const queryString = buildQueryString(params);
		return apiClient.get<CandidatesListResponse>(
			`${API_ENDPOINTS.CANDIDATES}${queryString}`,
		);
	},

	getById: async (id: string): Promise<CandidateResponse> => {
		return apiClient.get<CandidateResponse>(API_ENDPOINTS.CANDIDATE_BY_ID(id));
	},

	create: async (data: Partial<Candidate>): Promise<CandidateResponse> => {
		return apiClient.post<CandidateResponse>(API_ENDPOINTS.CANDIDATES, data);
	},

	update: async (
		id: string,
		data: Partial<Candidate>,
	): Promise<CandidateResponse> => {
		return apiClient.put<CandidateResponse>(
			API_ENDPOINTS.CANDIDATE_BY_ID(id),
			data,
		);
	},

	delete: async (
		id: string,
	): Promise<{ success: boolean; message?: string }> => {
		return apiClient.delete<{ success: boolean; message?: string }>(
			API_ENDPOINTS.CANDIDATE_BY_ID(id),
		);
	},

	bulkUpdate: async (
		ids: string[],
		data: Partial<Candidate>,
	): Promise<{ success: boolean; message?: string }> => {
		return apiClient.post<{ success: boolean; message?: string }>(
			API_ENDPOINTS.BULK_UPDATE_CANDIDATES,
			{ ids, data },
		);
	},

	updateStage: async (
		id: string,
		stage: string,
	): Promise<CandidateResponse> => {
		return apiClient.put<CandidateResponse>(
			API_ENDPOINTS.CANDIDATE_BY_ID(id),
			{ stage },
		);
	},
};