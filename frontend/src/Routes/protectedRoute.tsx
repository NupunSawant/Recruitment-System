import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRole?: "admin" | "interviewer";
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
	const { isAuthenticated, isAuthLoading, userRole } = useAuthContext();

	if (isAuthLoading) {
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

	return <>{children}</>;
}
