import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { Users, Briefcase, GitBranch, Settings, Mail, LayoutDashboard, LogOut } from 'lucide-react';

export function LayoutEnhanced() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/candidates', label: 'Candidates', icon: Users },
    { path: '/pipeline', label: 'Pipeline', icon: GitBranch },
    { path: '/jobs', label: 'Job Openings', icon: Briefcase },
    { path: '/users', label: 'Users & Permissions', icon: Users },
    { path: '/email-templates', label: 'Email Templates', icon: Mail },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hrms_authenticated');
    sessionStorage.removeItem('hrms_user_role');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <h1 className="text-[14px] font-semibold text-foreground">Metaphi</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md mb-0.5 text-[13px] transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="px-3 py-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-muted-foreground">Logged in as</div>
              <div className="text-[13px] font-medium text-foreground truncate">
                admin@metaphi.com
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}