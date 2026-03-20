import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const requireEnv = (key: string, fallback?: string): string => {
	const value = process.env[key] ?? fallback;
	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return value;
};

export const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: Number(process.env.PORT || 5000),

	MONGO_URI: requireEnv("MONGO_URI"),

	JWT_ACCESS_SECRET: requireEnv("JWT_ACCESS_SECRET"),
	JWT_REFRESH_SECRET: requireEnv("JWT_REFRESH_SECRET"),

	ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || "15m",
	REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "1d",

	CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
	COOKIE_SECURE: process.env.COOKIE_SECURE === "true",
};