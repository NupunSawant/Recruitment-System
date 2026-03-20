import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'interviewer' | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('hrms_authenticated') === 'true';
    const role = sessionStorage.getItem('hrms_user_role') as 'admin' | 'interviewer' | null;
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, []);

  return { isAuthenticated, userRole };
};
