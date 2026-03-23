import { createAsyncThunk } from "@reduxjs/toolkit";
import { candidatesApi } from "../../../api/candidates";

export const fetchCandidates = createAsyncThunk(
	"candidates/fetch",
	async (params: Record<string, any> | undefined, { rejectWithValue }) => {
		try {
			return await candidatesApi.getAll(params);
		} catch (err: any) {
			return rejectWithValue(err.message || "Failed to fetch candidates");
		}
	},
);

export const getCandidateById = createAsyncThunk(
	"candidates/getById",
	async (id: string, { rejectWithValue }) => {
		try {
			return await candidatesApi.getById(id);
		} catch (err: any) {
			return rejectWithValue(err.message || "Failed to fetch candidate");
		}
	},
);

export const createCandidateThunk = createAsyncThunk(
	"candidates/create",
	async (data: any, { rejectWithValue }) => {
		try {
			return await candidatesApi.create(data);
		} catch (err: any) {
			return rejectWithValue(err.message || "Failed to create candidate");
		}
	},
);

export const updateCandidateThunk = createAsyncThunk(
	"candidates/update",
	async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
		try {
			return await candidatesApi.update(id, data);
		} catch (err: any) {
			return rejectWithValue(err.message || "Failed to update candidate");
		}
	},
);

export const deleteCandidateThunk = createAsyncThunk(
	"candidates/delete",
	async (id: string, { rejectWithValue }) => {
		try {
			await candidatesApi.delete(id);
			return id;
		} catch (err: any) {
			return rejectWithValue(err.message || "Failed to delete candidate");
		}
	},
);
