import crypto from "crypto";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "../config/env";
import { JwtPayloadType } from "../types/Authentication/auth.types";

const accessSecret: Secret = env.JWT_ACCESS_SECRET;
const refreshSecret: Secret = env.JWT_REFRESH_SECRET;

export const sha256 = (value: string): string => {
	return crypto.createHash("sha256").update(value).digest("hex");
};

export const signAccessToken = (userId: string): string => {
	const options: SignOptions = {
		expiresIn: env.ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"],
	};

	return jwt.sign({ sub: userId }, accessSecret, options);
};

export const signRefreshToken = (
	userId: string,
	expiresIn?: StringValue,
): string => {
	const options: SignOptions = {
		expiresIn: (expiresIn ||
			env.REFRESH_TOKEN_EXPIRES) as SignOptions["expiresIn"],
	};

	return jwt.sign({ sub: userId }, refreshSecret, options);
};

export const verifyAccessToken = (token: string): JwtPayloadType => {
	return jwt.verify(token, accessSecret) as JwtPayloadType;
};

export const verifyRefreshToken = (token: string): JwtPayloadType => {
	return jwt.verify(token, refreshSecret) as JwtPayloadType;
};
