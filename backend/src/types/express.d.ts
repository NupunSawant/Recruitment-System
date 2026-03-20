import { IUser } from "../model/Authentication/User";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
			user?: IUser | null;
		}
	}
}

export {};
