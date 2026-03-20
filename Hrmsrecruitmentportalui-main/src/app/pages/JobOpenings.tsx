import { Plus } from 'lucide-react';
import { jobOpenings, candidates } from '../data/mockData';
import { Button } from '../components/ui/button';

export function JobOpenings() {
  // Calculate backup candidates (candidates who are in Offer or passed Technical)
  const getBackupCandidates = (role: string) => {
    return candidates.filter(
      (c) => c.role === role && (c.stage === 'Offer' || c.stage === 'Technical')
    ).length;
  };

  return (
    <div className="h-full flex flex-col bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[18px] font-semibold text-foreground">Job Openings</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Active job openings and hiring progress
            </p>
          </div>
          <Button size="sm" className="h-8 text-[13px] gap-1.5 bg-primary hover:bg-primary/90">
            <Plus className="w-3.5 h-3.5" />
            Add Job Opening
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="bg-white border border-border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Role
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Required Count
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Hired Count
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Remaining Count
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Backup Candidates
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {jobOpenings.map((job) => {
                const remaining = job.requiredCount - job.hiredCount;
                const progress = (job.hiredCount / job.requiredCount) * 100;
                const backupCount = getBackupCandidates(job.role);

                return (
                  <tr
                    key={job.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-[13px] text-foreground font-medium">
                      {job.role}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {job.requiredCount}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {job.hiredCount}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {remaining}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[13px] text-foreground">
                        {backupCount}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[200px]">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-muted-foreground min-w-[40px]">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}