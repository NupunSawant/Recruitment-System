import type { StringValue } from "ms";
import { User } from "../../model/Authentication/User";
import { RefreshSession } from "../../model/Authentication/RefreshSession";
import { verifyPassword } from "../../utils/password";
import {
	sha256,
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../../utils/jwt";

const DEFAULT_REFRESH_EXPIRY = process.env.REFRESH_TOKEN_EXPIRES || "1d";
const REMEMBER_ME_REFRESH_EXPIRY: StringValue = "7d";

const parseExpiryMs = (value: string) => {
	const match = /^(\d+)([mhd])$/.exec(String(value).trim());

	if (!match) return 24 * 60 * 60 * 1000;

	const num = Number(match[1]);
	const unit = match[2];

	if (unit === "m") return num * 60 * 1000;
	if (unit === "h") return num * 60 * 60 * 1000;
	return num * 24 * 60 * 60 * 1000;
};

const getRefreshExpiry = (rememberMe = false): StringValue => {
	return rememberMe
		? REMEMBER_ME_REFRESH_EXPIRY
		: (DEFAULT_REFRESH_EXPIRY as StringValue);
};

export const loginUser = async (data: {
	email: string;
	password: string;
	role: "admin" | "interviewer";
	rememberMe?: boolean;
}) => {
	const email = data.email.trim().toLowerCase();
	const rememberMe = Boolean(data.rememberMe);

	const user = await User.findOne({ email });

	if (!user) {
		throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });
	}

	if (!user.isActive) {
		throw Object.assign(new Error("User is inactive"), { statusCode: 403 });
	}

	if (user.role !== data.role) {
		throw Object.assign(new Error("Invalid role selected"), { statusCode: 401 });
	}

	const ok = await verifyPassword(data.password, user.passwordHash);

	if (!ok) {
		throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });
	}

	const refreshExpiry = getRefreshExpiry(rememberMe);
	const accessToken = signAccessToken(String(user._id));
	const refreshToken = signRefreshToken(String(user._id), refreshExpiry);
	const refreshTokenHash = sha256(refreshToken);
	const expiresAt = new Date(Date.now() + parseExpiryMs(refreshExpiry));

	await RefreshSession.create({
		userId: user._id,
		refreshTokenHash,
		expiresAt,
	});

	return {
		user,
		accessToken,
		refreshToken,
	};
};

export const refreshAccessToken = async (refreshToken: string) => {
	const decoded = verifyRefreshToken(refreshToken);
	const userId = decoded.sub;

	const tokenHash = sha256(refreshToken);

	const session = await RefreshSession.findOne({
		userId,
		refreshTokenHash: tokenHash,
	});

	if (!session) {
		throw Object.assign(new Error("Refresh session not found"), {
			statusCode: 401,
		});
	}

	if (session.expiresAt.getTime() <= Date.now()) {
		await RefreshSession.deleteOne({ _id: session._id });
		throw Object.assign(new Error("Refresh session expired"), {
			statusCode: 401,
		});
	}

	const accessToken = signAccessToken(userId);

	return { accessToken };
};

export const logoutUser = async (refreshToken?: string) => {
	if (!refreshToken) return;

	const tokenHash = sha256(refreshToken);

	await RefreshSession.deleteOne({
		refreshTokenHash: tokenHash,
	});
};