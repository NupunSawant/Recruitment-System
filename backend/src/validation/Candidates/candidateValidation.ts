import { z } from "zod";
import {
	CandidateStage,
	CandidateType,
	SourceDetailsType,
} from "../../model/Candidates/Candidate";

const activityLogSchema = z.object({
	date: z.string().optional(),
	action: z.string().optional(),
	by: z.string().optional(),
});

const screeningHistorySchema = z.object({
	date: z.string().optional(),
	notes: z.string().optional(),
	by: z.string().optional(),
});

const technicalHistorySchema = z.object({
	date: z.string().optional(),
	notes: z.string().optional(),
	by: z.string().optional(),
	rating: z.number().optional(),
});

const offerHistorySchema = z.object({
	date: z.string().optional(),
	notes: z.string().optional(),
	by: z.string().optional(),
});

const sourceDetailsSchema = z.object({
	type: z.nativeEnum(SourceDetailsType).optional(),
	recruitmentCompanyName: z.string().optional(),
	contactPersonName: z.string().optional(),
	contactNumber: z.string().optional(),
	referrerName: z.string().optional(),
	referrerContact: z.string().optional(),
	portalName: z.string().optional(),
});

export const createCandidateValidation = z.object({
	name: z.string().min(1, "Name is required"),
	role: z.string().min(1, "Role is required"),
	phone: z.string().min(1, "Phone is required"),

	experience: z.string().optional(),
	totalExperience: z.string().optional(),
	relevantExperience: z.string().optional(),
	noticePeriod: z.string().optional(),
	stage: z.nativeEnum(CandidateStage).optional(),
	expectedCTC: z.string().optional(),
	location: z.string().optional(),
	email: z.string().optional(),
	currentCTC: z.string().optional(),
	skills: z.array(z.string()).optional(),
	education: z.string().optional(),
	source: z.string().optional(),
	lastUpdated: z.string().optional(),
	screeningStatus: z.string().optional(),
	screeningNotes: z.string().optional(),
	technicalRating: z.number().optional(),
	communicationRating: z.number().optional(),
	technicalNotes: z.string().optional(),
	offeredCTC: z.string().optional(),
	finalCTC: z.string().optional(),
	joiningDate: z.string().optional(),
	candidateType: z.nativeEnum(CandidateType).optional(),
	interviewer: z.string().optional(),
	appliedDate: z.string().optional(),
	resumeUrl: z.string().optional(),
	activityLog: z.array(activityLogSchema).optional(),
	tags: z.array(z.string()).optional(),
	sourceDetails: sourceDetailsSchema.optional(),
	resumeFileName: z.string().optional(),
	screeningHistory: z.array(screeningHistorySchema).optional(),
	technicalHistory: z.array(technicalHistorySchema).optional(),
	offerHistory: z.array(offerHistorySchema).optional(),
	isActive: z.boolean().optional(),
});

export const updateCandidateValidation = z.object({
	name: z.string().optional(),
	role: z.string().optional(),
	phone: z.string().optional(),

	experience: z.string().optional(),
	totalExperience: z.string().optional(),
	relevantExperience: z.string().optional(),
	noticePeriod: z.string().optional(),
	stage: z.nativeEnum(CandidateStage).optional(),
	expectedCTC: z.string().optional(),
	location: z.string().optional(),
	email: z.string().optional(),
	currentCTC: z.string().optional(),
	skills: z.array(z.string()).optional(),
	education: z.string().optional(),
	source: z.string().optional(),
	lastUpdated: z.string().optional(),
	screeningStatus: z.string().optional(),
	screeningNotes: z.string().optional(),
	technicalRating: z.number().optional(),
	communicationRating: z.number().optional(),
	technicalNotes: z.string().optional(),
	offeredCTC: z.string().optional(),
	finalCTC: z.string().optional(),
	joiningDate: z.string().optional(),
	candidateType: z.nativeEnum(CandidateType).optional(),
	interviewer: z.string().optional(),
	appliedDate: z.string().optional(),
	resumeUrl: z.string().optional(),
	activityLog: z.array(activityLogSchema).optional(),
	tags: z.array(z.string()).optional(),
	sourceDetails: sourceDetailsSchema.optional(),
	resumeFileName: z.string().optional(),
	screeningHistory: z.array(screeningHistorySchema).optional(),
	technicalHistory: z.array(technicalHistorySchema).optional(),
	offerHistory: z.array(offerHistorySchema).optional(),
	isActive: z.boolean().optional(),
});

export const getCandidatesValidation = z.object({
	search: z.string().optional(),
	role: z.string().optional(),
	candidateType: z.nativeEnum(CandidateType).optional(),
	stage: z.nativeEnum(CandidateStage).optional(),
	interviewer: z.string().optional(),

	isActive: z.preprocess((val) => {
		if (val === "true") return true;
		if (val === "false") return false;
		return val;
	}, z.boolean().optional()),

	experience: z.string().optional(),
	totalExperience: z.string().optional(),
	relevantExperience: z.string().optional(),
	noticePeriod: z.string().optional(),
	expectedCTC: z.string().optional(),
	location: z.string().optional(),
	skills: z.union([z.string(), z.array(z.string())]).optional(),

	page: z.preprocess((val) => {
		if (val === undefined || val === "") return 1;
		return Number(val);
	}, z.number()),

	limit: z.preprocess((val) => {
		if (val === undefined || val === "") return 10;
		return Number(val);
	}, z.number()),

	sortBy: z.string().optional(),
	sortOrder: z.enum(["asc", "desc"]).optional(),
});
