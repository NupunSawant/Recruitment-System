import { Request, Response } from "express";
import {
	createCandidate,
	deleteCandidate,
	getCandidateById,
	getCandidates,
	updateCandidate,
} from "../../services/Candidates/candidateService";
import {
	createCandidateValidation,
	getCandidatesValidation,
	updateCandidateValidation,
} from "../../validation/Candidates/candidateValidation";

const getId = (id: string | string[]) => (Array.isArray(id) ? id[0] : id);
export const createCandidateHandler = async (req: Request, res: Response) => {
	try {
		const validatedData = createCandidateValidation.parse(req.body);

		const candidate = await createCandidate(validatedData);

		return res.status(201).json({
			success: true,
			message: "Candidate created successfully",
			data: candidate,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message:
				error?.errors?.[0]?.message ||
				error.message ||
				"Failed to create candidate",
		});
	}
};

export const getCandidatesHandler = async (req: Request, res: Response) => {
	try {
		const validatedQuery = getCandidatesValidation.parse(req.query);

		const candidates = await getCandidates(validatedQuery);

		return res.status(200).json({
			success: true,
			message: "Candidates fetched successfully",
			data: candidates,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message:
				error?.errors?.[0]?.message ||
				error.message ||
				"Failed to fetch candidates",
		});
	}
};

export const getCandidateByIdHandler = async (req: Request, res: Response) => {
	try {
		const id = getId(req.params.id);

		const candidate = await getCandidateById(id);

		return res.status(200).json({
			success: true,
			message: "Candidate fetched successfully",
			data: candidate,
		});
	} catch (error: any) {
		const statusCode = error.message === "Candidate not found" ? 404 : 400;

		return res.status(statusCode).json({
			success: false,
			message: error.message || "Failed to fetch candidate",
		});
	}
};

export const updateCandidateHandler = async (req: Request, res: Response) => {
	try {
		const id = getId(req.params.id);
		const validatedData = updateCandidateValidation.parse(req.body);

		const candidate = await updateCandidate(id, validatedData);

		return res.status(200).json({
			success: true,
			message: "Candidate updated successfully",
			data: candidate,
		});
	} catch (error: any) {
		const statusCode = error.message === "Candidate not found" ? 404 : 400;

		return res.status(statusCode).json({
			success: false,
			message:
				error?.errors?.[0]?.message ||
				error.message ||
				"Failed to update candidate",
		});
	}
};

export const deleteCandidateHandler = async (req: Request, res: Response) => {
	try {
		const id = getId(req.params.id);

		const candidate = await deleteCandidate(id);

		return res.status(200).json({
			success: true,
			message: "Candidate deleted successfully",
			data: candidate,
		});
	} catch (error: any) {
		const statusCode = error.message === "Candidate not found" ? 404 : 400;

		return res.status(statusCode).json({
			success: false,
			message: error.message || "Failed to delete candidate",
		});
	}
};
