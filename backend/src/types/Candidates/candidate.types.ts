import {
	CandidateStage,
	CandidateType,
	SourceDetailsType,
} from "../../model/Candidates/Candidate";

export interface CandidateActivityLogType {
	date?: string;
	action?: string;
	by?: string;
}

export interface CandidateScreeningHistoryType {
	date?: string;
	notes?: string;
	by?: string;
}

export interface CandidateTechnicalHistoryType {
	date?: string;
	notes?: string;
	by?: string;
	rating?: number;
}

export interface CandidateOfferHistoryType {
	date?: string;
	notes?: string;
	by?: string;
}

export interface CandidateSourceDetailsType {
	type?: SourceDetailsType;
	recruitmentCompanyName?: string;
	contactPersonName?: string;
	contactNumber?: string;
	referrerName?: string;
	referrerContact?: string;
	portalName?: string;
}

export interface CreateCandidateInput {
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
	activityLog?: CandidateActivityLogType[];
	tags?: string[];
	sourceDetails?: CandidateSourceDetailsType;
	resumeFileName?: string;
	screeningHistory?: CandidateScreeningHistoryType[];
	technicalHistory?: CandidateTechnicalHistoryType[];
	offerHistory?: CandidateOfferHistoryType[];
	isActive?: boolean;
}

export interface UpdateCandidateInput {
	name?: string;
	role?: string;
	phone?: string;
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
	activityLog?: CandidateActivityLogType[];
	tags?: string[];
	sourceDetails?: CandidateSourceDetailsType;
	resumeFileName?: string;
	screeningHistory?: CandidateScreeningHistoryType[];
	technicalHistory?: CandidateTechnicalHistoryType[];
	offerHistory?: CandidateOfferHistoryType[];
	isActive?: boolean;
}

export interface GetCandidatesQuery {
	search?: string;
	role?: string;
	candidateType?: CandidateType;
	stage?: CandidateStage;
	interviewer?: string;
	isActive?: boolean;

	experience?: string;
	totalExperience?: string;
	relevantExperience?: string;
	noticePeriod?: string;
	expectedCTC?: string;
	location?: string;
	skills?: string | string[];

	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface CandidateResponse {
	id: string;
	name: string;
	role: string;
	experience: string;
	totalExperience: string;
	relevantExperience: string;
	noticePeriod: string;
	stage: CandidateStage;
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
	candidateType?: CandidateType;
	interviewer?: string;
	appliedDate?: string;
	resumeUrl?: string;
	activityLog?: CandidateActivityLogType[];
	tags?: string[];
	sourceDetails?: CandidateSourceDetailsType;
	resumeFileName?: string;
	screeningHistory?: CandidateScreeningHistoryType[];
	technicalHistory?: CandidateTechnicalHistoryType[];
	offerHistory?: CandidateOfferHistoryType[];
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface PaginationResponse {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface GetCandidatesResponse {
	items: CandidateResponse[];
	pagination: PaginationResponse;
}
