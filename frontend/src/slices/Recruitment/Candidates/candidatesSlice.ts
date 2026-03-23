import { createSlice } from "@reduxjs/toolkit";
import {
	fetchCandidates,
	getCandidateById,
	createCandidateThunk,
	updateCandidateThunk,
	deleteCandidateThunk,
} from "./candidatesThunks";

interface CandidatesState {
	items: any[];
	selectedCandidate: any | null;
	loading: boolean;
	detailLoading: boolean;
	submitting: boolean;
	error: string | null;
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

const initialState: CandidatesState = {
	items: [],
	selectedCandidate: null,
	loading: false,
	detailLoading: false,
	submitting: false,
	error: null,
	pagination: {
		page: 1,
		limit: 10,
		total: 0,
		totalPages: 0,
	},
};

const candidatesSlice = createSlice({
	name: "candidates",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCandidates.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCandidates.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload?.data?.items || [];
				state.pagination = action.payload?.data?.pagination || state.pagination;
			})
			.addCase(fetchCandidates.rejected, (state, action) => {
				state.loading = false;
				state.error =
					(action.payload as string) || "Failed to fetch candidates";
			})

			.addCase(getCandidateById.pending, (state) => {
				state.detailLoading = true;
				state.error = null;
			})
			.addCase(getCandidateById.fulfilled, (state, action) => {
				state.detailLoading = false;
				state.selectedCandidate = action.payload?.data || null;
			})
			.addCase(getCandidateById.rejected, (state, action) => {
				state.detailLoading = false;
				state.error = (action.payload as string) || "Failed to fetch candidate";
			})

			.addCase(createCandidateThunk.pending, (state) => {
				state.submitting = true;
				state.error = null;
			})
			.addCase(createCandidateThunk.fulfilled, (state, action) => {
				state.submitting = false;
				const createdCandidate = action.payload?.data;
				if (createdCandidate) {
					state.items = [createdCandidate, ...state.items];
					state.selectedCandidate = createdCandidate;
					state.pagination.total += 1;
				}
			})
			.addCase(createCandidateThunk.rejected, (state, action) => {
				state.submitting = false;
				state.error =
					(action.payload as string) || "Failed to create candidate";
			})

			.addCase(updateCandidateThunk.pending, (state) => {
				state.submitting = true;
				state.error = null;
			})
			.addCase(updateCandidateThunk.fulfilled, (state, action) => {
				state.submitting = false;
				const updatedCandidate = action.payload?.data;
				if (!updatedCandidate?.id) return;

				state.items = state.items.map((candidate) =>
					candidate.id === updatedCandidate.id ? updatedCandidate : candidate,
				);

				if (state.selectedCandidate?.id === updatedCandidate.id) {
					state.selectedCandidate = updatedCandidate;
				}
			})
			.addCase(updateCandidateThunk.rejected, (state, action) => {
				state.submitting = false;
				state.error =
					(action.payload as string) || "Failed to update candidate";
			})

			.addCase(deleteCandidateThunk.pending, (state) => {
				state.submitting = true;
				state.error = null;
			})
			.addCase(deleteCandidateThunk.fulfilled, (state, action) => {
				state.submitting = false;
				state.items = state.items.filter((c: any) => c.id !== action.payload);
				if (state.selectedCandidate?.id === action.payload) {
					state.selectedCandidate = null;
				}
				state.pagination.total = Math.max(0, state.pagination.total - 1);
			})
			.addCase(deleteCandidateThunk.rejected, (state, action) => {
				state.submitting = false;
				state.error =
					(action.payload as string) || "Failed to delete candidate";
			});
	},
});

export const candidatesReducer = candidatesSlice.reducer;
