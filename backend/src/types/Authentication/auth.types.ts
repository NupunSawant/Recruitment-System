import { Request } from "express";

export type UserRole = "admin" | "interviewer";

export interface JwtPayloadType {
	sub: string;
	iat?: number;
	exp?: number;
}

export interface AuthRequest extends Request {
	userId?: string;
}