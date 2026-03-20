export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  totalExperience: string;
  relevantExperience: string;
  noticePeriod: string;
  stage: 'New' | 'Screening' | 'Technical' | 'Offer' | 'Joined' | 'Rejected';
  expectedCTC: string;
  location: string;
  email: string;
  phone: string;
  currentCTC: string;
  skills: string[];
  education: string;
  source?: string;
  lastUpdated?: string;
  screeningStatus?: string;
  screeningNotes?: string;
  technicalRating?: number;
  communicationRating?: number;
  technicalNotes?: string;
  offeredCTC?: string;
  finalCTC?: string;
  joiningDate?: string;
  candidateType?: 'Intern' | 'Fresher' | 'Experienced';
  interviewer?: string;
  appliedDate?: string;
  resumeUrl?: string;
  activityLog?: { date: string; action: string; by: string }[];
  tags?: string[];
  sourceDetails?: {
    type: 'Direct' | 'Referral' | 'Job Portal' | 'Recruitment Agency';
    recruitmentCompanyName?: string;
    contactPersonName?: string;
    contactNumber?: string;
    referrerName?: string;
    referrerContact?: string;
    portalName?: string;
  };
  resumeFileName?: string;
  screeningHistory?: { date: string; notes: string; by: string }[];
  technicalHistory?: { date: string; notes: string; by: string; rating?: number }[];
  offerHistory?: { date: string; notes: string; by: string }[];
}

export interface JobOpening {
  id: string;
  role: string;
  requiredCount: number;
  hiredCount: number;
  googleMeetLink?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'MERN',
    experience: '5 years',
    totalExperience: '5 years',
    relevantExperience: '5 years',
    noticePeriod: '30 days',
    stage: 'Technical',
    expectedCTC: '₹18 LPA',
    location: 'Bangalore',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    currentCTC: '₹15 LPA',
    skills: ['React', 'TypeScript', 'Node.js', 'Redux'],
    education: 'B.Tech in Computer Science, IIT Delhi',
    screeningNotes: 'Strong communication skills. Good cultural fit.',
    technicalNotes: '',
    interviewer: 'Recruiter 1',
    appliedDate: '2026-03-10',
    candidateType: 'Experienced',
    tags: ['Experienced', 'Strong Communication', 'Team Lead', 'React Expert'],
    activityLog: [
      { date: '2026-03-17', action: 'Moved to Technical stage', by: 'Recruiter 1' },
      { date: '2026-03-15', action: 'Screening completed', by: 'Recruiter 1' },
      { date: '2026-03-10', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-15', notes: 'Strong communication skills. Good cultural fit.', by: 'Recruiter 1' }
    ],
    technicalHistory: [
      { date: '2026-03-17', notes: '', by: 'Recruiter 1' }
    ]
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    role: 'MERN',
    experience: '3 years',
    totalExperience: '3 years',
    relevantExperience: '3 years',
    noticePeriod: '60 days',
    stage: 'Screening',
    expectedCTC: '₹12 LPA',
    location: 'Mumbai',
    email: 'rahul.mehta@email.com',
    phone: '+91 98765 43211',
    currentCTC: '₹10 LPA',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Microservices'],
    education: 'B.E. in Information Technology, VJTI Mumbai',
    screeningNotes: '',
    interviewer: 'Recruiter 2',
    appliedDate: '2026-03-12',
    candidateType: 'Experienced',
    tags: ['Experienced'],
    activityLog: [
      { date: '2026-03-13', action: 'Moved to Screening stage', by: 'Recruiter 2' },
      { date: '2026-03-12', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-13', notes: '', by: 'Recruiter 2' }
    ]
  },
  {
    id: '3',
    name: 'Anjali Verma',
    role: 'UI/UX',
    experience: '4 years',
    totalExperience: '4 years',
    relevantExperience: '4 years',
    noticePeriod: '15 days',
    stage: 'Offer',
    expectedCTC: '₹14 LPA',
    location: 'Pune',
    email: 'anjali.verma@email.com',
    phone: '+91 98765 43212',
    currentCTC: '₹12 LPA',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    education: 'B.Des in Interaction Design, NID Ahmedabad',
    screeningNotes: 'Excellent portfolio. Strong design thinking.',
    technicalNotes: 'Completed design challenge successfully. Great attention to detail.',
    offeredCTC: '₹15 LPA',
    finalCTC: '₹15 LPA',
    joiningDate: '2026-04-15',
    interviewer: 'Hiring Manager',
    appliedDate: '2026-03-08',
    candidateType: 'Experienced',
    tags: ['Experienced', 'Immediate Joiner', 'Offered'],
    activityLog: [
      { date: '2026-03-17', action: 'Offer sent', by: 'HR Lead' },
      { date: '2026-03-16', action: 'Technical round passed', by: 'Hiring Manager' },
      { date: '2026-03-14', action: 'Moved to Technical stage', by: 'Recruiter 1' },
      { date: '2026-03-08', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-14', notes: 'Excellent portfolio. Strong design thinking.', by: 'Recruiter 1' }
    ],
    technicalHistory: [
      { date: '2026-03-16', notes: 'Completed design challenge successfully. Great attention to detail.', by: 'Hiring Manager', rating: 5 }
    ],
    offerHistory: [
      { date: '2026-03-17', notes: 'Offer sent', by: 'HR Lead' }
    ]
  },
  {
    id: '4',
    name: 'Arjun Singh',
    role: 'QA',
    experience: '6 years',
    totalExperience: '6 years',
    relevantExperience: '6 years',
    noticePeriod: '45 days',
    stage: 'New',
    expectedCTC: '₹22 LPA',
    location: 'Hyderabad',
    email: 'arjun.singh@email.com',
    phone: '+91 98765 43213',
    currentCTC: '₹18 LPA',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    education: 'M.Tech in Computer Science, BITS Pilani',
    interviewer: '',
    appliedDate: '2026-03-16',
    candidateType: 'Experienced',
    tags: ['Experienced'],
    activityLog: [
      { date: '2026-03-16', action: 'Application received', by: 'System' }
    ]
  },
  {
    id: '5',
    name: 'Kavya Reddy',
    role: 'MERN',
    experience: '7 years',
    totalExperience: '7 years',
    relevantExperience: '7 years',
    noticePeriod: '30 days',
    stage: 'Technical',
    expectedCTC: '₹20 LPA',
    location: 'Chennai',
    email: 'kavya.reddy@email.com',
    phone: '+91 98765 43214',
    currentCTC: '₹17 LPA',
    skills: ['React', 'Vue.js', 'TypeScript', 'GraphQL', 'Testing'],
    education: 'B.E. in Computer Science, Anna University',
    screeningNotes: 'Strong technical background. Led multiple projects.',
    technicalNotes: 'In progress - scheduled for technical round.',
    interviewer: 'Recruiter 1',
    appliedDate: '2026-03-11',
    candidateType: 'Experienced',
    tags: ['Experienced', 'Strong Communication', 'Backend Expert', 'Team Lead', 'Immediate'],
    activityLog: [
      { date: '2026-03-15', action: 'Moved to Technical stage', by: 'Recruiter 1' },
      { date: '2026-03-13', action: 'Screening completed', by: 'Recruiter 1' },
      { date: '2026-03-11', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-13', notes: 'Strong technical background. Led multiple projects.', by: 'Recruiter 1' }
    ],
    technicalHistory: [
      { date: '2026-03-15', notes: 'In progress - scheduled for technical round.', by: 'Recruiter 1' }
    ]
  },
  {
    id: '6',
    name: 'Vikram Patel',
    role: 'Flutter',
    experience: '2 years',
    totalExperience: '2 years',
    relevantExperience: '2 years',
    noticePeriod: '30 days',
    stage: 'Rejected',
    expectedCTC: '₹9 LPA',
    location: 'Ahmedabad',
    email: 'vikram.patel@email.com',
    phone: '+91 98765 43215',
    currentCTC: '₹7 LPA',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST APIs'],
    education: 'B.Tech in Computer Engineering, DA-IICT',
    screeningNotes: 'Experience not matching requirements.',
    technicalNotes: 'Did not meet technical bar.',
    interviewer: 'Recruiter 2',
    appliedDate: '2026-03-09',
    candidateType: 'Fresher',
    tags: ['Fresher', 'Not Reachable'],
    activityLog: [
      { date: '2026-03-16', action: 'Marked as Rejected', by: 'Recruiter 2' },
      { date: '2026-03-14', action: 'Technical round failed', by: 'Hiring Manager' },
      { date: '2026-03-09', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-14', notes: 'Experience not matching requirements.', by: 'Recruiter 2' }
    ],
    technicalHistory: [
      { date: '2026-03-14', notes: 'Did not meet technical bar.', by: 'Hiring Manager', rating: 2 }
    ]
  },
  {
    id: '7',
    name: 'Sneha Iyer',
    role: 'QA',
    experience: '5 years',
    totalExperience: '5 years',
    relevantExperience: '5 years',
    noticePeriod: '60 days',
    stage: 'Screening',
    expectedCTC: '₹25 LPA',
    location: 'Bangalore',
    email: 'sneha.iyer@email.com',
    phone: '+91 98765 43216',
    currentCTC: '₹22 LPA',
    skills: ['Product Strategy', 'Agile', 'Stakeholder Management', 'Data Analysis'],
    education: 'MBA from IIM Bangalore, B.Tech from NIT Trichy',
    interviewer: 'Hiring Manager',
    appliedDate: '2026-03-14',
    candidateType: 'Experienced',
    tags: ['Experienced'],
    activityLog: [
      { date: '2026-03-15', action: 'Moved to Screening stage', by: 'Hiring Manager' },
      { date: '2026-03-14', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-15', notes: '', by: 'Hiring Manager' }
    ]
  },
  {
    id: '8',
    name: 'Rohan Desai',
    role: 'Flutter',
    experience: '4 years',
    totalExperience: '4 years',
    relevantExperience: '4 years',
    noticePeriod: '30 days',
    stage: 'New',
    expectedCTC: '₹18 LPA',
    location: 'Delhi',
    email: 'rohan.desai@email.com',
    phone: '+91 98765 43217',
    currentCTC: '₹15 LPA',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
    education: 'M.Sc. in Data Science, IIT Bombay',
    interviewer: '',
    appliedDate: '2026-03-15',
    candidateType: 'Experienced',
    tags: ['Experienced', 'Immediate Joiner', 'Backup'],
    activityLog: [
      { date: '2026-03-15', action: 'Application received', by: 'System' }
    ]
  },
  {
    id: '9',
    name: 'Aarav Kumar',
    role: 'UI/UX',
    experience: '0 years',
    totalExperience: '0 years',
    relevantExperience: '0 years',
    noticePeriod: '0 days',
    stage: 'Screening',
    expectedCTC: '₹3 LPA',
    location: 'Bangalore',
    email: 'aarav.kumar@email.com',
    phone: '+91 98765 43218',
    currentCTC: '₹0',
    skills: ['Figma', 'Sketch', 'UI Design'],
    education: 'B.Des (pursuing), NID Bangalore',
    interviewer: 'Recruiter 1',
    appliedDate: '2026-03-17',
    candidateType: 'Intern',
    tags: ['Intern', 'Immediate Joiner'],
    activityLog: [
      { date: '2026-03-17', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-17', notes: '', by: 'Recruiter 1' }
    ]
  },
  {
    id: '10',
    name: 'Meera Shah',
    role: 'MERN',
    experience: '1 year',
    totalExperience: '1 year',
    relevantExperience: '1 year',
    noticePeriod: '15 days',
    stage: 'Technical',
    expectedCTC: '₹6 LPA',
    location: 'Mumbai',
    email: 'meera.shah@email.com',
    phone: '+91 98765 43219',
    currentCTC: '₹4 LPA',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    education: 'B.Tech in Computer Science, Mumbai University',
    interviewer: 'Recruiter 2',
    appliedDate: '2026-03-16',
    candidateType: 'Fresher',
    tags: ['Fresher', 'Immediate Joiner', 'Strong Communication'],
    activityLog: [
      { date: '2026-03-17', action: 'Moved to Technical stage', by: 'Recruiter 2' },
      { date: '2026-03-16', action: 'Application received', by: 'System' }
    ],
    screeningHistory: [
      { date: '2026-03-17', notes: '', by: 'Recruiter 2' }
    ],
    technicalHistory: [
      { date: '2026-03-17', notes: '', by: 'Recruiter 2' }
    ]
  }
];

export const jobOpenings: JobOpening[] = [
  { id: '1', role: 'Senior Frontend Developer', requiredCount: 3, hiredCount: 1, googleMeetLink: 'https://meet.google.com/abc-defg-hij' },
  { id: '2', role: 'Backend Developer', requiredCount: 5, hiredCount: 2, googleMeetLink: 'https://meet.google.com/xyz-mnop-qrs' },
  { id: '3', role: 'UI/UX Designer', requiredCount: 2, hiredCount: 1, googleMeetLink: 'https://meet.google.com/uiv-wxyz-abc' },
  { id: '4', role: 'DevOps Engineer', requiredCount: 2, hiredCount: 0, googleMeetLink: 'https://meet.google.com/dev-opsx-yzw' },
  { id: '5', role: 'Product Manager', requiredCount: 1, hiredCount: 0, googleMeetLink: 'https://meet.google.com/prd-mgmt-xya' },
  { id: '6', role: 'Data Scientist', requiredCount: 3, hiredCount: 1, googleMeetLink: 'https://meet.google.com/dat-sci-mnp' }
];

export const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@metaphi.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Recruiter 1', email: 'recruiter1@metaphi.com', role: 'Recruiter', status: 'Active' },
  { id: '3', name: 'Recruiter 2', email: 'recruiter2@metaphi.com', role: 'Recruiter', status: 'Active' },
  { id: '4', name: 'Hiring Manager', email: 'manager@metaphi.com', role: 'Hiring Manager', status: 'Active' },
  { id: '5', name: 'HR Lead', email: 'hr.lead@metaphi.com', role: 'HR Lead', status: 'Active' },
  { id: '6', name: 'Former Employee', email: 'former@metaphi.com', role: 'Recruiter', status: 'Inactive' }
];