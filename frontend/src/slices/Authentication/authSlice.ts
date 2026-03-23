import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../api";
import { getMeThunk, loginThunk, logoutThunk } from "./authThunks";

interface AuthState {
	isAuthenticated: boolean;
	user: AuthUser | null;
	isLoading: boolean;
	error: string | null;
	userRole: "admin" | "interviewer" | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	isLoading: false,
	error: null,
	userRole: null,
};

// Check if authentication data is already in sessionStorage
const storedUser = sessionStorage.getItem("hrms_user");
const storedToken = sessionStorage.getItem("hrms_access_token");

if (storedUser && storedToken) {
	const user = JSON.parse(storedUser);
	initialState.isAuthenticated = true;
	initialState.user = user;
	initialState.userRole = user.role; // Assuming the role is in the user object
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.userRole = null;
			state.isLoading = false;
			state.error = null;
			// Clear sessionStorage on logout
			sessionStorage.removeItem("hrms_authenticated");
			sessionStorage.removeItem("hrms_user_role");
			sessionStorage.removeItem("hrms_access_token");
			sessionStorage.removeItem("hrms_user");
		},
		setUser: (state, action: PayloadAction<AuthUser>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.userRole = action.payload.role;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.userRole = action.payload.user.role;

				// Save user and token to sessionStorage after login
				sessionStorage.setItem("hrms_authenticated", "true");
				sessionStorage.setItem("hrms_user_role", action.payload.user.role);
				sessionStorage.setItem("hrms_access_token", action.payload.token);
				sessionStorage.setItem(
					"hrms_user",
					JSON.stringify(action.payload.user),
				);
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(getMeThunk.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMeThunk.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.userRole = action.payload.user.role;
			})
			.addCase(getMeThunk.rejected, (state) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.error = "Failed to fetch user info";
			})
			.addCase(logoutThunk.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = null;
				state.userRole = null;
			})
			.addCase(logoutThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const { logout, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
