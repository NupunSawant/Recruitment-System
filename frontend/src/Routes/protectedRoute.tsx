import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Import RootState to type the selector

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRole?: "admin" | "interviewer"; // Optional, can handle multiple roles
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
	// Access the `auth` state from Redux store and type the state properly
	const { isAuthenticated, isLoading, userRole } = useSelector(
		(state: RootState) => state.auth, // Access auth state using RootState
	);

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center text-sm text-muted-foreground'>
				Loading...
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (allowedRole && userRole !== allowedRole) {
		return <Navigate to='/login' replace />;
	}

	// If the user is authenticated and role matches (or no role required), render the children
	return <>{children}</>;
}
