import { Link, Outlet, useLocation } from 'react-router';
import { Users, Briefcase, GitBranch, Settings } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Candidates', icon: Users },
    { path: '/pipeline', label: 'Pipeline', icon: GitBranch },
    { path: '/jobs', label: 'Job Openings', icon: Briefcase },
    { path: '/users', label: 'Users & Permissions', icon: Settings }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-border">
          <h1 className="text-[15px] font-semibold text-foreground">Metaphi Innovations</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3">
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
        <div className="px-4 py-3 border-t border-border">
          <div className="text-[12px] text-muted-foreground">Logged in as</div>
          <div className="text-[13px] font-medium text-foreground mt-0.5">admin@metaphi.com</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
