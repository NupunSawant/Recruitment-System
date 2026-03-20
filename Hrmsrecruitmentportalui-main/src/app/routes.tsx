import { createBrowserRouter, Navigate } from 'react-router';
import { LayoutEnhanced } from './components/LayoutEnhanced';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { CandidatesComplete } from './pages/CandidatesComplete';
import { CandidatesWorkflowDemo } from './pages/CandidatesWorkflowDemo';
import { InterviewerPortal } from './pages/InterviewerPortal';
import { ResumeViewer } from './pages/ResumeViewer';
import { PipelineComplete } from './pages/PipelineComplete';
import { JobOpenings } from './pages/JobOpenings';
import { UsersEnhanced } from './pages/UsersEnhanced';
import { EmailTemplates } from './pages/EmailTemplates';
import { Settings } from './pages/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem('hrms_authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function InterviewerRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem('hrms_authenticated') === 'true';
  const userRole = sessionStorage.getItem('hrms_user_role');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'interviewer') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/resume-viewer',
    element: <ResumeViewer />
  },
  {
    path: '/interviewer',
    element: (
      <InterviewerRoute>
        <InterviewerPortal />
      </InterviewerRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LayoutEnhanced />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'candidates', element: <CandidatesComplete /> },
      { path: 'candidates-demo', element: <CandidatesWorkflowDemo /> },
      { path: 'pipeline', element: <PipelineComplete /> },
      { path: 'jobs', element: <JobOpenings /> },
      { path: 'users', element: <UsersEnhanced /> },
      { path: 'email-templates', element: <EmailTemplates /> },
      { path: 'settings', element: <Settings /> }
    ]
  }
]);