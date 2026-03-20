import { Router } from "express";
import authRouter from "./Authentication/authRoutes";

const router = Router();

router.use("/auth", authRouter);

export default router;
