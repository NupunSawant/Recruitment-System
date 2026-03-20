import { Users, UserCheck, Calendar, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { candidates, jobOpenings } from '../data/mockData';
import { Link } from 'react-router';

export function Dashboard() {
  // Calculate metrics
  const totalCandidates = candidates.length;
  const screeningPending = candidates.filter((c) => c.stage === 'Screening').length;
  const technicalPending = candidates.filter((c) => c.stage === 'Technical').length;
  const offersReleased = candidates.filter((c) => c.stage === 'Offer').length;
  const joined = candidates.filter((c) => c.stage === 'Joined').length;
  const rejected = candidates.filter((c) => c.stage === 'Rejected').length;

  // Calculate role-wise hiring progress
  const roleProgress = jobOpenings.map((job) => ({
    role: job.role,
    required: job.requiredCount,
    hired: job.hiredCount,
    progress: (job.hiredCount / job.requiredCount) * 100
  }));

  // Mock recent activity
  const recentActivity = [
    { id: 1, type: 'offer', text: 'Offer sent to Anjali Verma for UI/UX Designer', time: '2 hours ago' },
    { id: 2, type: 'technical', text: 'Priya Sharma moved to Technical round', time: '4 hours ago' },
    { id: 3, type: 'screening', text: 'Rahul Mehta completed screening', time: '5 hours ago' },
    { id: 4, type: 'new', text: 'New candidate added: Arjun Singh', time: '6 hours ago' },
    { id: 5, type: 'rejected', text: 'Vikram Patel marked as rejected', time: '1 day ago' }
  ];

  // Mock upcoming interviews
  const upcomingInterviews = [
    { id: 1, candidate: 'Priya Sharma', role: 'Senior Frontend Developer', type: 'Technical', date: '2026-03-18', time: '10:00 AM' },
    { id: 2, candidate: 'Kavya Reddy', role: 'Senior Frontend Developer', type: 'Technical', date: '2026-03-18', time: '2:30 PM' },
    { id: 3, candidate: 'Sneha Iyer', role: 'Product Manager', type: 'Screening', date: '2026-03-19', time: '11:00 AM' },
    { id: 4, candidate: 'Rohan Desai', role: 'Data Scientist', type: 'Screening', date: '2026-03-19', time: '3:00 PM' }
  ];

  const metrics = [
    { label: 'Total Candidates', value: totalCandidates, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Screening Pending', value: screeningPending, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Technical Pending', value: technicalPending, icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Offers Released', value: offersReleased, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Joined', value: joined, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Rejected', value: rejected, icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' }
  ];

  return (
    <div className="h-full overflow-auto bg-muted">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[18px] font-semibold text-foreground mb-1">Dashboard</h1>
          <p className="text-[13px] text-muted-foreground">Overview of recruitment activities</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white border border-border rounded-md p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded ${metric.bg}`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
                <div className="text-[24px] font-semibold text-foreground mb-1">{metric.value}</div>
                <div className="text-[12px] text-muted-foreground">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Role-wise Hiring Progress */}
          <div className="col-span-2 bg-white border border-border rounded-md">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-[14px] font-semibold text-foreground">Role-wise Hiring Progress</h3>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Role
                    </th>
                    <th className="text-left pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Required
                    </th>
                    <th className="text-left pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Hired
                    </th>
                    <th className="text-left pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roleProgress.map((role, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="py-2.5 text-[13px] text-foreground">{role.role}</td>
                      <td className="py-2.5 text-[13px] text-foreground">{role.required}</td>
                      <td className="py-2.5 text-[13px] text-foreground">{role.hired}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[120px]">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${role.progress}%` }}
                            />
                          </div>
                          <span className="text-[12px] text-muted-foreground min-w-[35px]">
                            {Math.round(role.progress)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white border border-border rounded-md">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-foreground">Upcoming Interviews</h3>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="text-[13px] font-medium text-foreground mb-0.5">
                    {interview.candidate}
                  </div>
                  <div className="text-[12px] text-muted-foreground mb-1">{interview.role}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {interview.type}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {interview.date} • {interview.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-3 bg-white border border-border rounded-md">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-[14px] font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.type === 'offer' ? 'bg-success' :
                      activity.type === 'technical' ? 'bg-orange-500' :
                      activity.type === 'screening' ? 'bg-blue-500' :
                      activity.type === 'rejected' ? 'bg-destructive' :
                      'bg-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className="text-[13px] text-foreground">{activity.text}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}