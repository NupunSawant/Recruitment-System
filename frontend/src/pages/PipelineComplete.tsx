import { useState } from 'react';
import { candidates as initialCandidates, Candidate } from '../data/mockData';
import { Eye, GitBranch, UserPlus, Calendar, XCircle } from 'lucide-react';

export function PipelineComplete() {
  const [selectedStage, setSelectedStage] = useState<Candidate['stage']>('New');
  const [candidates] = useState(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const stages: Candidate['stage'][] = ['New', 'Screening', 'Technical', 'Offer', 'Joined', 'Rejected'];
  
  const getStageCounts = () => {
    return stages.map(stage => ({
      stage,
      count: candidates.filter(c => c.stage === stage).length
    }));
  };

  const filteredCandidates = candidates.filter(c => c.stage === selectedStage);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New': return 'bg-muted text-muted-foreground border-transparent';
      case 'Screening': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Technical': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Offer': return 'bg-success/10 text-success border-success/20';
      case 'Joined': return 'bg-success/10 text-success border-success/20';
      case 'Rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-transparent';
    }
  };

  const stageCounts = getStageCounts();

  return (
    <div className="h-full flex bg-muted">
      {/* Stage List Sidebar */}
      <div className="w-56 bg-white border-r border-border">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-[14px] font-semibold text-foreground">Pipeline Stages</h3>
        </div>
        
        <div className="p-2">
          {stageCounts.map(({ stage, count }) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md mb-1 text-[13px] transition-colors ${
                selectedStage === stage
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span>{stage}</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                selectedStage === stage
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table Area */}
      <div className={`flex-1 flex flex-col ${selectedCandidate ? 'mr-[480px]' : ''}`}>
        {/* Header */}
        <div className="bg-white border-b border-border px-4 py-3">
          <h1 className="text-[16px] font-semibold text-foreground">
            {selectedStage} ({filteredCandidates.length})
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Candidates in {selectedStage.toLowerCase()} stage
          </p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full bg-white">
            <thead className="sticky top-0 bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Name</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Role</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Tags</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Total Exp</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Notice</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Expected CTC</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Interviewer</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Applied Date</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className={`border-b border-border hover:bg-muted/30 transition-colors ${
                    selectedCandidate?.id === candidate.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-3 py-2 text-[12px] text-foreground font-medium">{candidate.name}</td>
                  <td className="px-3 py-2 text-[12px] text-foreground">{candidate.role}</td>
                  <td className="px-3 py-2 text-[12px] text-foreground">{candidate.candidateType || 'Experienced'}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {candidate.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-muted text-foreground text-[10px] rounded border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                      {(candidate.tags?.length || 0) > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          +{(candidate.tags?.length || 0) - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[12px] text-foreground">{candidate.totalExperience}</td>
                  <td className="px-3 py-2 text-[12px] text-foreground">{candidate.noticePeriod}</td>
                  <td className="px-3 py-2 text-[12px] text-foreground">{candidate.expectedCTC}</td>
                  <td className="px-3 py-2 text-[12px] text-muted-foreground">{candidate.interviewer || '-'}</td>
                  <td className="px-3 py-2 text-[12px] text-muted-foreground">{candidate.appliedDate || '-'}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setSelectedCandidate(candidate)}
                        className="p-1 hover:bg-muted rounded"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded" title="Move Stage">
                        <GitBranch className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded" title="Assign">
                        <UserPlus className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded" title="Schedule">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded" title="Reject">
                        <XCircle className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCandidates.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-[12px] bg-white">
              No candidates in this stage
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel (same as Candidates page) */}
      {selectedCandidate && (
        <div className="fixed right-0 top-0 w-[480px] h-full bg-white border-l border-border flex flex-col shadow-lg z-20">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-foreground">{selectedCandidate.name}</h2>
              <p className="text-[12px] text-muted-foreground">{selectedCandidate.role}</p>
            </div>
            <button onClick={() => setSelectedCandidate(null)} className="text-muted-foreground hover:text-foreground">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4 text-[12px]">
              {/* Basic Info */}
              <div className="pb-3 border-b border-border">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-muted-foreground mb-0.5">Email</div>
                    <div className="text-foreground">{selectedCandidate.email}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Phone</div>
                    <div className="text-foreground">{selectedCandidate.phone}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Location</div>
                    <div className="text-foreground">{selectedCandidate.location}</div>
                  </div>
                </div>
              </div>

              {/* Experience & Compensation */}
              <div className="pb-3 border-b border-border">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Experience & Compensation</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-muted-foreground mb-0.5">Total Experience</div>
                    <div className="text-foreground font-medium">{selectedCandidate.totalExperience}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Relevant Experience</div>
                    <div className="text-foreground font-medium">{selectedCandidate.relevantExperience}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Current CTC</div>
                    <div className="text-foreground font-medium">{selectedCandidate.currentCTC}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Expected CTC</div>
                    <div className="text-foreground font-medium">{selectedCandidate.expectedCTC}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Notice Period</div>
                    <div className="text-foreground font-medium">{selectedCandidate.noticePeriod}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Candidate Type</div>
                    <div className="text-foreground font-medium">{selectedCandidate.candidateType || 'Experienced'}</div>
                  </div>
                </div>
              </div>

              {/* Stage & Assignment */}
              <div className="pb-3 border-b border-border">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Stage & Assignment</h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-muted-foreground mb-0.5">Current Stage</div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${getStageColor(selectedCandidate.stage)}`}>
                      {selectedCandidate.stage}
                    </span>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Assigned Interviewer</div>
                    <div className="text-foreground">{selectedCandidate.interviewer || 'Not assigned'}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">Applied Date</div>
                    <div className="text-foreground">{selectedCandidate.appliedDate || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                <div className="pb-3 border-b border-border">
                  <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-muted text-foreground text-[11px] rounded border border-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedCandidate.tags && selectedCandidate.tags.length > 0 && (
                <div className="pb-3 border-b border-border">
                  <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-primary/10 text-foreground text-[11px] rounded border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {selectedCandidate.education && (
                <div className="pb-3 border-b border-border">
                  <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Education</h4>
                  <div className="text-foreground">{selectedCandidate.education}</div>
                </div>
              )}

              {/* Activity Log */}
              {selectedCandidate.activityLog && selectedCandidate.activityLog.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold text-muted-foreground uppercase mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {selectedCandidate.activityLog.slice(-5).reverse().map((log, index) => (
                      <div key={index} className="flex gap-3 pb-2 border-b border-border last:border-0">
                        <div className="w-20 shrink-0">
                          <div className="text-[10px] text-muted-foreground">{log.date}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[11px] text-foreground">{log.action}</div>
                          <div className="text-[10px] text-muted-foreground">by {log.by}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
