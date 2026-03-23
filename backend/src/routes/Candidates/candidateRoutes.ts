import { Router } from "express";
import {
	createCandidateHandler,
	deleteCandidateHandler,
	getCandidateByIdHandler,
	getCandidatesHandler,
	updateCandidateHandler,
} from "../../controllers/Candidates/candidateController";
import { authenticateToken } from "../../middleware/Authentication/auth";

const router = Router();

router.post("/", authenticateToken, createCandidateHandler);
router.get("/", authenticateToken, getCandidatesHandler);
router.get("/:id", authenticateToken, getCandidateByIdHandler);
router.put("/:id", authenticateToken, updateCandidateHandler);
router.delete("/:id", authenticateToken, deleteCandidateHandler);

export default router;
