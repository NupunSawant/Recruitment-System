import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { ZodError } from "zod";

import { env } from "./config/env";
import { connectDB } from "./config/db";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use("/api", router);

app.use(
	cors({
		origin: env.CORS_ORIGIN,
		credentials: true,
	})
);

app.get("/", (_req, res) => {
	res.status(200).json({
		ok: true,
		message: "HR Recruitment Backend is running",
	});
});

app.get("/health", (_req, res) => {
	res.status(200).json({
		ok: true,
		env: env.NODE_ENV,
	});
});



app.use((_req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	if (error instanceof ZodError) {
		return res.status(400).json({
			success: false,
			message: "Validation failed",
			errors: error.flatten(),
		});
	}

	const statusCode = error.statusCode || 500;

	return res.status(statusCode).json({
		success: false,
		message: error.message || "Internal server error",
	});
});

(async () => {
	await connectDB();
	app.listen(env.PORT, () => {
		console.log(`Server is running on port ${env.PORT}`);
	});
})();