import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { authApi, AuthUser } from "../api/auth";

type UserRole = "admin" | "interviewer";

interface AuthContextType {
	isAuthenticated: boolean;
	isAuthLoading: boolean;
	userRole: UserRole | null;
	user: AuthUser | null;
	setAuthFromLogin: (user: AuthUser, accessToken: string) => void;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const clearAuthStorage = () => {
	sessionStorage.removeItem("hrms_authenticated");
	sessionStorage.removeItem("hrms_user_role");
	sessionStorage.removeItem("hrms_access_token");
	sessionStorage.removeItem("hrms_user");
};

const saveAuthStorage = (user: AuthUser, accessToken: string) => {
	sessionStorage.setItem("hrms_authenticated", "true");
	sessionStorage.setItem("hrms_user_role", user.role);
	sessionStorage.setItem("hrms_access_token", accessToken);
	sessionStorage.setItem("hrms_user", JSON.stringify(user));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const [userRole, setUserRole] = useState<UserRole | null>(null);
	const [user, setUser] = useState<AuthUser | null>(null);

	const setAuthFromLogin = (loggedInUser: AuthUser, accessToken: string) => {
		saveAuthStorage(loggedInUser, accessToken);
		setIsAuthenticated(true);
		setUserRole(loggedInUser.role);
		setUser(loggedInUser);
	};

	const logout = async () => {
		try {
			await authApi.logout();
		} catch {
		} finally {
			clearAuthStorage();
			setIsAuthenticated(false);
			setUserRole(null);
			setUser(null);
			window.location.href = "/login";
		}
	};

	useEffect(() => {
		const restoreAuth = async () => {
			try {
				const storedAccessToken = sessionStorage.getItem("hrms_access_token");
				const storedUserRaw = sessionStorage.getItem("hrms_user");

				if (storedAccessToken) {
					const meResponse = await authApi.me();
					const currentUser = meResponse.data.user;

					saveAuthStorage(currentUser, storedAccessToken);
					setIsAuthenticated(true);
					setUserRole(currentUser.role);
					setUser(currentUser);
					setIsAuthLoading(false);
					return;
				}

				const refreshResponse = await authApi.refresh();
				const newAccessToken = refreshResponse.data.accessToken;

				const meResponse = await authApi.me();
				const currentUser = meResponse.data.user;

				saveAuthStorage(currentUser, newAccessToken);
				setIsAuthenticated(true);
				setUserRole(currentUser.role);
				setUser(currentUser);

				if (!storedUserRaw) {
					sessionStorage.setItem("hrms_user", JSON.stringify(currentUser));
				}
			} catch {
				clearAuthStorage();
				setIsAuthenticated(false);
				setUserRole(null);
				setUser(null);
			} finally {
				setIsAuthLoading(false);
			}
		};

		restoreAuth();
	}, []);

	const value = useMemo(
		() => ({
			isAuthenticated,
			isAuthLoading,
			userRole,
			user,
			setAuthFromLogin,
			logout,
		}),
		[isAuthenticated, isAuthLoading, userRole, user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
