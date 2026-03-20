import { apiClient } from './client';
import { API_ENDPOINTS } from '../config/api';
import { Candidate } from '../slices/Recruitment/Candidates/candidatesSlice';

export const candidatesApi = {
  // Get all candidates
  getAll: async (): Promise<Candidate[]> => {
    return apiClient.get<Candidate[]>(API_ENDPOINTS.CANDIDATES);
  },

  // Get candidate by ID
  getById: async (id: string): Promise<Candidate> => {
    return apiClient.get<Candidate>(API_ENDPOINTS.CANDIDATE_BY_ID(id));
  },

  // Create new candidate
  create: async (data: Partial<Candidate>): Promise<Candidate> => {
    return apiClient.post<Candidate>(API_ENDPOINTS.CANDIDATES, data);
  },

  // Update candidate
  update: async (id: string, data: Partial<Candidate>): Promise<Candidate> => {
    return apiClient.put<Candidate>(API_ENDPOINTS.CANDIDATE_BY_ID(id), data);
  },

  // Delete candidate
  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(API_ENDPOINTS.CANDIDATE_BY_ID(id));
  },

  // Bulk update candidates
  bulkUpdate: async (ids: string[], data: Partial<Candidate>): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.BULK_UPDATE_CANDIDATES, { ids, data });
  },

  // Update candidate stage
  updateStage: async (id: string, stage: string): Promise<Candidate> => {
    return apiClient.put<Candidate>(API_ENDPOINTS.CANDIDATE_BY_ID(id), { stage });
  },
};
