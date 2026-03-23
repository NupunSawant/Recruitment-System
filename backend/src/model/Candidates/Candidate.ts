import { Document, Schema, model } from "mongoose";

export enum CandidateStage {
  NEW = "New",
  SCREENING = "Screening",
  TECHNICAL = "Technical",
  OFFER = "Offer",
  JOINED = "Joined",
  REJECTED = "Rejected",
}

export enum CandidateType {
  INTERN = "Intern",
  FRESHER = "Fresher",
  EXPERIENCED = "Experienced",
}

export enum SourceDetailsType {
  DIRECT = "Direct",
  REFERRAL = "Referral",
  JOB_PORTAL = "Job Portal",
  RECRUITMENT_AGENCY = "Recruitment Agency",
}

export interface CandidateActivityLog {
  date: string;
  action: string;
  by: string;
}

export interface CandidateScreeningHistory {
  date: string;
  notes: string;
  by: string;
}

export interface CandidateTechnicalHistory {
  date: string;
  notes: string;
  by: string;
  rating?: number;
}

export interface CandidateOfferHistory {
  date: string;
  notes: string;
  by: string;
}

export interface CandidateSourceDetails {
  type?: SourceDetailsType;
  recruitmentCompanyName?: string;
  contactPersonName?: string;
  contactNumber?: string;
  referrerName?: string;
  referrerContact?: string;
  portalName?: string;
}

export interface ICandidate extends Document {
  name: string;
  role: string;
  phone: string;
  experience?: string;
  totalExperience?: string;
  relevantExperience?: string;
  noticePeriod?: string;
  stage?: CandidateStage;
  expectedCTC?: string;
  location?: string;
  email?: string;
  currentCTC?: string;
  skills?: string[];
  education?: string;
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
  candidateType?: CandidateType;
  interviewer?: string;
  appliedDate?: string;
  resumeUrl?: string;
  activityLog?: CandidateActivityLog[];
  tags?: string[];
  sourceDetails?: CandidateSourceDetails;
  resumeFileName?: string;
  screeningHistory?: CandidateScreeningHistory[];
  technicalHistory?: CandidateTechnicalHistory[];
  offerHistory?: CandidateOfferHistory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const activityLogSchema = new Schema<CandidateActivityLog>(
  {
    date: { type: String, trim: true, default: "" },
    action: { type: String, trim: true, default: "" },
    by: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const screeningHistorySchema = new Schema<CandidateScreeningHistory>(
  {
    date: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
    by: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const technicalHistorySchema = new Schema<CandidateTechnicalHistory>(
  {
    date: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
    by: { type: String, trim: true, default: "" },
    rating: { type: Number, default: undefined },
  },
  { _id: false }
);

const offerHistorySchema = new Schema<CandidateOfferHistory>(
  {
    date: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
    by: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const sourceDetailsSchema = new Schema<CandidateSourceDetails>(
  {
    type: {
      type: String,
      enum: Object.values(SourceDetailsType),
      default: undefined,
    },
    recruitmentCompanyName: { type: String, trim: true, default: "" },
    contactPersonName: { type: String, trim: true, default: "" },
    contactNumber: { type: String, trim: true, default: "" },
    referrerName: { type: String, trim: true, default: "" },
    referrerContact: { type: String, trim: true, default: "" },
    portalName: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const candidateSchema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
      default: "",
    },
    totalExperience: {
      type: String,
      trim: true,
      default: "",
    },
    relevantExperience: {
      type: String,
      trim: true,
      default: "",
    },
    noticePeriod: {
      type: String,
      trim: true,
      default: "",
    },
    stage: {
      type: String,
      enum: Object.values(CandidateStage),
      default: CandidateStage.NEW,
    },
    expectedCTC: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    currentCTC: {
      type: String,
      trim: true,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    education: {
      type: String,
      trim: true,
      default: "",
    },
    source: {
      type: String,
      trim: true,
      default: "",
    },
    lastUpdated: {
      type: String,
      trim: true,
      default: "",
    },
    screeningStatus: {
      type: String,
      trim: true,
      default: "",
    },
    screeningNotes: {
      type: String,
      trim: true,
      default: "",
    },
    technicalRating: {
      type: Number,
      default: undefined,
    },
    communicationRating: {
      type: Number,
      default: undefined,
    },
    technicalNotes: {
      type: String,
      trim: true,
      default: "",
    },
    offeredCTC: {
      type: String,
      trim: true,
      default: "",
    },
    finalCTC: {
      type: String,
      trim: true,
      default: "",
    },
    joiningDate: {
      type: String,
      trim: true,
      default: "",
    },
    candidateType: {
      type: String,
      enum: Object.values(CandidateType),
      default: CandidateType.EXPERIENCED,
    },
    interviewer: {
      type: String,
      trim: true,
      default: "",
    },
    appliedDate: {
      type: String,
      trim: true,
      default: "",
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: "",
    },
    activityLog: {
      type: [activityLogSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    sourceDetails: {
      type: sourceDetailsSchema,
      default: undefined,
    },
    resumeFileName: {
      type: String,
      trim: true,
      default: "",
    },
    screeningHistory: {
      type: [screeningHistorySchema],
      default: [],
    },
    technicalHistory: {
      type: [technicalHistorySchema],
      default: [],
    },
    offerHistory: {
      type: [offerHistorySchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

candidateSchema.index({ name: 1 });
candidateSchema.index({ role: 1 });
candidateSchema.index({ phone: 1 });
candidateSchema.index({ email: 1 });
candidateSchema.index({ stage: 1 });
candidateSchema.index({ candidateType: 1 });
candidateSchema.index({ isActive: 1 });

const Candidate = model<ICandidate>("Candidate", candidateSchema);

export default Candidate;