// Candidate stages
export const CANDIDATE_STAGES = {
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  TECHNICAL: 'technical',
  OFFER: 'offer',
  REJECTED: 'rejected',
  JOINED: 'joined',
} as const;

export const CANDIDATE_STAGE_LABELS = {
  [CANDIDATE_STAGES.SCREENING]: 'Screening',
  [CANDIDATE_STAGES.INTERVIEW]: 'Interview',
  [CANDIDATE_STAGES.TECHNICAL]: 'Technical',
  [CANDIDATE_STAGES.OFFER]: 'Offer',
  [CANDIDATE_STAGES.REJECTED]: 'Rejected',
  [CANDIDATE_STAGES.JOINED]: 'Joined',
};

export const CANDIDATE_STAGE_COLORS = {
  [CANDIDATE_STAGES.SCREENING]: '#3B82F6', // Blue
  [CANDIDATE_STAGES.INTERVIEW]: '#F59E0B', // Amber
  [CANDIDATE_STAGES.TECHNICAL]: '#8B5CF6', // Purple
  [CANDIDATE_STAGES.OFFER]: '#10B981', // Green
  [CANDIDATE_STAGES.REJECTED]: '#EF4444', // Red
  [CANDIDATE_STAGES.JOINED]: '#059669', // Dark green
};
