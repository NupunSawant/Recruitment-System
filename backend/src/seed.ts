import { connectDB } from "./config/db";
import { User } from "./model/Authentication/User";
import { hashPassword } from "./utils/password";

const seed = async () => {
	await connectDB();

	const existing = await User.findOne({ email: "admin@metaphi.com" });
	if (existing) {
		console.log("User already exists");
		process.exit(0);
	}

	const passwordHash = await hashPassword("admin123");

	await User.create({
		name: "Admin User",
		email: "admin@metaphi.com",
		passwordHash,
		role: "admin",
		isActive: true,
	});

	console.log("Seed user created");
	process.exit(0);
};

seed();