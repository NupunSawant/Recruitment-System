import Candidate from "../../model/Candidates/Candidate";
import {
	CandidateResponse,
	CreateCandidateInput,
	GetCandidatesQuery,
	GetCandidatesResponse,
	UpdateCandidateInput,
} from "../../types/Candidates/candidate.types";

const transformCandidate = (candidate: any): CandidateResponse => {
	const candidateObj = candidate.toObject ? candidate.toObject() : candidate;

	return {
		id: candidateObj._id.toString(),
		name: candidateObj.name ?? "",
		role: candidateObj.role ?? "",
		experience: candidateObj.experience ?? "",
		totalExperience: candidateObj.totalExperience ?? "",
		relevantExperience: candidateObj.relevantExperience ?? "",
		noticePeriod: candidateObj.noticePeriod ?? "",
		stage: candidateObj.stage,
		expectedCTC: candidateObj.expectedCTC ?? "",
		location: candidateObj.location ?? "",
		email: candidateObj.email ?? "",
		phone: candidateObj.phone ?? "",
		currentCTC: candidateObj.currentCTC ?? "",
		skills: candidateObj.skills ?? [],
		education: candidateObj.education ?? "",
		source: candidateObj.source ?? "",
		lastUpdated: candidateObj.lastUpdated ?? "",
		screeningStatus: candidateObj.screeningStatus ?? "",
		screeningNotes: candidateObj.screeningNotes ?? "",
		technicalRating: candidateObj.technicalRating,
		communicationRating: candidateObj.communicationRating,
		technicalNotes: candidateObj.technicalNotes ?? "",
		offeredCTC: candidateObj.offeredCTC ?? "",
		finalCTC: candidateObj.finalCTC ?? "",
		joiningDate: candidateObj.joiningDate ?? "",
		candidateType: candidateObj.candidateType,
		interviewer: candidateObj.interviewer ?? "",
		appliedDate: candidateObj.appliedDate ?? "",
		resumeUrl: candidateObj.resumeUrl ?? "",
		activityLog: candidateObj.activityLog ?? [],
		tags: candidateObj.tags ?? [],
		sourceDetails: candidateObj.sourceDetails,
		resumeFileName: candidateObj.resumeFileName ?? "",
		screeningHistory: candidateObj.screeningHistory ?? [],
		technicalHistory: candidateObj.technicalHistory ?? [],
		offerHistory: candidateObj.offerHistory ?? [],
		isActive: candidateObj.isActive,
		createdAt: candidateObj.createdAt?.toISOString?.() ?? "",
		updatedAt: candidateObj.updatedAt?.toISOString?.() ?? "",
	};
};

const buildCandidateFilters = (query: GetCandidatesQuery) => {
	const filter: Record<string, any> = {};

	if (query.search) {
		const searchRegex = new RegExp(query.search, "i");
		filter.$or = [
			{ name: searchRegex },
			{ email: searchRegex },
			{ phone: searchRegex },
			{ role: searchRegex },
			{ location: searchRegex },
			{ education: searchRegex },
			{ experience: searchRegex },
			{ totalExperience: searchRegex },
			{ relevantExperience: searchRegex },
			{ skills: { $in: [searchRegex] } },
			{ tags: { $in: [searchRegex] } },
		];
	}

	if (query.role) {
		filter.role = query.role;
	}

	if (query.candidateType) {
		filter.candidateType = query.candidateType;
	}

	if (query.stage) {
		filter.stage = query.stage;
	}

	if (query.interviewer) {
		filter.interviewer = query.interviewer;
	}

	if (query.isActive === false) {
		filter.isActive = false;
	} else if (query.isActive === true) {
		filter.isActive = true;
	} else {
		filter.isActive = true;
	}

	if (query.experience) {
		filter.experience = query.experience;
	}

	if (query.totalExperience) {
		filter.totalExperience = query.totalExperience;
	}

	if (query.relevantExperience) {
		filter.relevantExperience = query.relevantExperience;
	}

	if (query.noticePeriod) {
		filter.noticePeriod = query.noticePeriod;
	}

	if (query.expectedCTC) {
		filter.expectedCTC = query.expectedCTC;
	}

	if (query.location) {
		filter.location = query.location;
	}

	if (query.skills) {
		const skillsArray = Array.isArray(query.skills)
			? query.skills
			: query.skills
					.split(",")
					.map((skill) => skill.trim())
					.filter(Boolean);

		if (skillsArray.length > 0) {
			filter.skills = { $all: skillsArray };
		}
	}

	return filter;
};

export const createCandidate = async (
	payload: CreateCandidateInput,
): Promise<CandidateResponse> => {
	const candidate = await Candidate.create({
		...payload,
		lastUpdated: payload.lastUpdated || new Date().toISOString().split("T")[0],
		appliedDate: payload.appliedDate || new Date().toISOString().split("T")[0],
	});

	return transformCandidate(candidate);
};

export const getCandidates = async (
	query: GetCandidatesQuery,
): Promise<GetCandidatesResponse> => {
	const page = query.page && query.page > 0 ? query.page : 1;
	const limit = query.limit && query.limit > 0 ? query.limit : 10;
	const skip = (page - 1) * limit;

	const sortBy = query.sortBy || "createdAt";
	const sortOrder = query.sortOrder === "asc" ? 1 : -1;

	const filter = buildCandidateFilters(query);

	const [candidates, total] = await Promise.all([
		Candidate.find(filter)
			.sort({ [sortBy]: sortOrder })
			.skip(skip)
			.limit(limit),
		Candidate.countDocuments(filter),
	]);

	return {
		items: candidates.map(transformCandidate),
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit) || 1,
		},
	};
};

export const getCandidateById = async (
	candidateId: string,
): Promise<CandidateResponse> => {
	const candidate = await Candidate.findById(candidateId);

	if (!candidate) {
		throw new Error("Candidate not found");
	}

	return transformCandidate(candidate);
};

export const updateCandidate = async (
	candidateId: string,
	payload: UpdateCandidateInput,
): Promise<CandidateResponse> => {
	const candidate = await Candidate.findById(candidateId);

	if (!candidate) {
		throw new Error("Candidate not found");
	}

	const updatedCandidate = await Candidate.findByIdAndUpdate(
		candidateId,
		{
			...payload,
			lastUpdated: new Date().toISOString().split("T")[0],
		},
		{ new: true, runValidators: true },
	);

	if (!updatedCandidate) {
		throw new Error("Candidate not found");
	}

	return transformCandidate(updatedCandidate);
};

export const deleteCandidate = async (
	candidateId: string,
): Promise<CandidateResponse> => {
	const candidate = await Candidate.findById(candidateId);

	if (!candidate) {
		throw new Error("Candidate not found");
	}

	const deletedCandidate = await Candidate.findByIdAndUpdate(
		candidateId,
		{
			isActive: false,
			lastUpdated: new Date().toISOString().split("T")[0],
		},
		{ new: true },
	);

	if (!deletedCandidate) {
		throw new Error("Candidate not found");
	}

	return transformCandidate(deletedCandidate);
};
