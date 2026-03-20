import { NextFunction, Response } from "express";
import { verifyAccessToken } from "../../utils/jwt";
import { AuthRequest } from "../../types/Authentication/auth.types";

export const authenticateToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const header = req.headers.authorization;

	if (!header?.startsWith("Bearer ")) {
		return res.status(401).json({
			success: false,
			message: "Missing access token",
		});
	}

	const token = header.split(" ")[1];

	try {
		const decoded = verifyAccessToken(token);
		req.userId = decoded.sub;
		next();
	} catch {
		return res.status(401).json({
			success: false,
			message: "Invalid/Expired access token",
		});
	}
};