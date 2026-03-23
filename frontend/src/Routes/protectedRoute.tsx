import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Import RootState to type the selector

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRole?: "admin" | "interviewer";
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
	// Access the `auth` state from Redux store
	const { isAuthenticated, isLoading, userRole } = useSelector(
		(state: RootState) => state.auth,
	);

	// Show loading indicator while fetching auth status
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center text-sm text-muted-foreground'>
				Loading...
			</div>
		);
	}

	// Redirect if not authenticated
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	// Redirect if user doesn't have the required role
	if (allowedRole && userRole !== allowedRole) {
		return <Navigate to='/login' replace />;
	}

	// Otherwise, render the protected route
	return <>{children}</>;
}
