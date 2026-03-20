import { Request, Response } from "express";
import { env } from "../../config/env";
import { User } from "../../model/Authentication/User";
import { AuthRequest } from "../../types/Authentication/auth.types";
import {
	loginUser,
	logoutUser,
	refreshAccessToken,
} from "../../services/Authentication/authService";
import { loginSchema } from "../../validation/Authentication/authValidation";

const refreshCookieName = "refreshToken";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;

const getRefreshCookieOptions = (rememberMe = false) => ({
	httpOnly: true,
	secure: env.COOKIE_SECURE,
	sameSite: "lax" as const,
	path: "/",
	maxAge: rememberMe ? SEVEN_DAYS_MS : ONE_DAY_MS,
});

export const login = async (req: Request, res: Response) => {
	const payload = loginSchema.parse(req.body);
	const rememberMe = Boolean(payload.rememberMe);

	const { user, accessToken, refreshToken } = await loginUser({
		email: payload.email,
		password: payload.password,
		role: payload.role,
		rememberMe,
	});

	res.cookie(
		refreshCookieName,
		refreshToken,
		getRefreshCookieOptions(rememberMe),
	);

	return res.status(200).json({
		success: true,
		message: "Login successful",
		data: {
			token: accessToken,
			accessToken,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				isActive: user.isActive,
			},
		},
	});
};

export const refresh = async (req: Request, res: Response) => {
	const refreshToken = req.cookies?.[refreshCookieName];

	if (!refreshToken) {
		return res.status(401).json({
			success: false,
			message: "No refresh token",
		});
	}

	const { accessToken } = await refreshAccessToken(refreshToken);

	return res.status(200).json({
		success: true,
		message: "Access token refreshed",
		data: {
			token: accessToken,
			accessToken,
		},
	});
};

export const logout = async (req: AuthRequest, res: Response) => {
	const refreshToken = req.cookies?.[refreshCookieName];

	await logoutUser(refreshToken);

	res.clearCookie(refreshCookieName, {
		httpOnly: true,
		secure: env.COOKIE_SECURE,
		sameSite: "lax",
		path: "/",
	});

	return res.status(200).json({
		success: true,
		message: "Logged out successfully",
	});
};

export const me = async (req: AuthRequest, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
		});
	}

	const user = await User.findById(req.userId).select(
		"name email role isActive createdAt",
	);

	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	return res.status(200).json({
		success: true,
		message: "User fetched successfully",
		data: {
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				isActive: user.isActive,
			},
		},
	});
};
