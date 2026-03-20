import { Plus, Search, Shield } from 'lucide-react';
import { users } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function UsersEnhanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(
    (user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    }
  );

  const uniqueRoles = Array.from(new Set(users.map((u) => u.role)));

  const rolePermissions: Record<string, string[]> = {
    'Admin': ['Full Access', 'Manage Users', 'View All Candidates', 'Edit Settings'],
    'HR Lead': ['View All Candidates', 'Edit Candidates', 'Send Offers', 'Manage Templates'],
    'Hiring Manager': ['View Candidates', 'Technical Review', 'Schedule Interviews'],
    'Recruiter': ['View Candidates', 'Screen Candidates', 'Schedule Interviews']
  };

  return (
    <div className="h-full flex flex-col bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[18px] font-semibold text-foreground">Users & Permissions</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Manage team members and their access levels
            </p>
          </div>
          <Button size="sm" className="h-8 text-[13px] gap-1.5 bg-primary hover:bg-primary/90">
            <Plus className="w-3.5 h-3.5" />
            Add User
          </Button>
        </div>

        {/* Search and filters */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-[13px]"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-44 h-8 text-[13px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Users table */}
          <div className="col-span-2 bg-white border border-border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Role
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-[13px] text-foreground font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-medium rounded border border-primary/20">
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[11px] font-medium border ${
                          user.status === 'Active'
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-muted text-muted-foreground border-transparent'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center text-muted-foreground text-[13px]">
                No users found
              </div>
            )}
          </div>

          {/* Role permissions */}
          <div className="bg-white border border-border rounded-md p-4">
            <h3 className="text-[14px] font-semibold text-foreground mb-4">Role Permissions</h3>
            <div className="space-y-4">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <div key={role} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[13px] font-medium text-foreground">{role}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {permissions.map((permission) => (
                      <li key={permission} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
