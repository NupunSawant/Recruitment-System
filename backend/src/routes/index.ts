import { Router } from "express";
import authRouter from "./Authentication/authRoutes";
import candidateRouter from "./Candidates/candidateRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use("/candidates", candidateRouter);

export default router;
