import { Router } from "express";
import {
	login,
	logout,
	me,
	refresh,
} from "../../controllers/Authentication/authController";
import { authenticateToken } from "../../middleware/Authentication/auth";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticateToken, me);

export default router;