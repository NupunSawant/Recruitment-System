import { createBrowserRouter, Navigate } from "react-router";
import { LayoutEnhanced } from "../layout/LayoutEnhanced";
import { Login } from "../pages/Authentication/Login";
import { ForgotPassword } from "../pages/Authentication/ForgotPassword";
import { Dashboard } from "../pages/Dashboard";
import { CandidatesComplete } from "../pages/Recruitment/Candidates/CandidatesComplete";
import { CandidatesWorkflowDemo } from "../pages/Recruitment/Candidates/CandidatesWorkflowDemo";
import { InterviewerPortal } from "../pages/InterviewerPortal";
import { ResumeViewer } from "../pages/ResumeViewer";
import { PipelineComplete } from "../pages/PipelineComplete";
import { JobOpenings } from "../pages/Recruitment/JobOpenings/JobOpenings";
import { UsersEnhanced } from "../pages/Recruitment/UsersPermissions/UsersEnhanced";
import { EmailTemplates } from "../pages/Recruitment/EmailTemplates/EmailTemplates";
import { Settings } from "../pages/Recruitment/Settings/Settings";
import { ProtectedRoute } from "./protectedRoute";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/forgot-password",
		// element: <ForgotPassword />,
	},
	{
		path: "/resume-viewer",
		element: <ResumeViewer />,
	},
	{
		path: "/interviewer",
		element: (
			<ProtectedRoute allowedRole='interviewer'>
				<InterviewerPortal />
			</ProtectedRoute>
		),
	},
	{
		path: "/",
		element: (
			<ProtectedRoute allowedRole='admin'>
				<LayoutEnhanced />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Navigate to='/dashboard' replace /> },
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "candidates", element: <CandidatesComplete /> },
			{ path: "candidates-demo", element: <CandidatesWorkflowDemo /> },
			{ path: "pipeline", element: <PipelineComplete /> },
			{ path: "jobs", element: <JobOpenings /> },
			{ path: "users", element: <UsersEnhanced /> },
			{ path: "email-templates", element: <EmailTemplates /> },
			{ path: "settings", element: <Settings /> },
		],
	},
]);
