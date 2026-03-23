import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
	Users,
	Briefcase,
	GitBranch,
	Settings,
	Mail,
	LayoutDashboard,
	LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/Authentication/authSlice"; // Import the logout action

export function LayoutEnhanced() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch(); // Use the Redux dispatch

	// ✅ USER STATE
	const [user, setUser] = useState({
		name: "Loading...",
		email: "",
		role: "",
	});

	// ✅ FETCH CURRENT USER
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch("/api/auth/me", {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
					},
				});

				if (!res.ok) throw new Error("Failed");

				const data = await res.json();

				// ✅ CORRECT PARSING
				const userData = data?.data?.user;

				setUser({
					name: userData?.name || "Unknown User",
					email: userData?.email || "",
					role: userData?.role || "",
				});
			} catch (err) {
				console.error("Failed to fetch user", err);
				setUser({
					name: "Unknown User",
					email: "",
					role: "",
				});
			}
		};

		fetchUser();
	}, []);

	const navItems = [
		{ path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ path: "/candidates", label: "Candidates", icon: Users },
		{ path: "/pipeline", label: "Pipeline", icon: GitBranch },
		{ path: "/jobs", label: "Job Openings", icon: Briefcase },
		{ path: "/users", label: "Users & Permissions", icon: Users },
		{ path: "/email-templates", label: "Email Templates", icon: Mail },
		{ path: "/settings", label: "Settings", icon: Settings },
	];

	const isActive = (path: string) => {
		if (path === "/dashboard") {
			return location.pathname === "/dashboard";
		}
		return location.pathname.startsWith(path);
	};

	const handleLogout = () => {
		// Dispatch logout action to clear Redux state
		dispatch(logout());

		// Clear sessionStorage
		sessionStorage.removeItem("hrms_authenticated");
		sessionStorage.removeItem("hrms_user_role");
		sessionStorage.removeItem("hrms_access_token");
		sessionStorage.removeItem("hrms_user");

		// Navigate to login page
		navigate("/login");
	};

	return (
		<div className='flex h-screen bg-muted'>
			{/* Sidebar */}
			<aside className='w-56 bg-white border-r border-border flex flex-col'>
				{/* Logo */}
				<div className='h-14 flex items-center px-4 border-b border-border'>
					<div className='flex items-center gap-2'>
						<div className='w-7 h-7 bg-primary rounded flex items-center justify-center'>
							<span className='text-primary-foreground font-bold text-sm'>
								M
							</span>
						</div>
						<h1 className='text-[14px] font-semibold text-foreground'>
							Metaphi
						</h1>
					</div>
				</div>

				{/* Navigation */}
				<nav className='flex-1 px-2 py-3 overflow-y-auto'>
					{navItems.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.path);
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center gap-2.5 px-3 py-2 rounded-md mb-0.5 text-[13px] transition-colors ${
									active
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-secondary hover:text-foreground"
								}`}
							>
								<Icon className='w-4 h-4' />
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>

				{/* User info */}
				<div className='px-3 py-3 border-t border-border'>
					<div className='flex items-center gap-2 mb-2'>
						{/* Avatar */}
						<div className='w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-medium'>
							{user.name !== "Loading..." && user.name !== "Unknown User"
								? user.name.charAt(0).toUpperCase()
								: "?"}
						</div>

						<div className='flex-1 min-w-0'>
							<div className='text-[12px] text-muted-foreground'>
								Logged in as
							</div>

							{/* ✅ Name */}
							<div className='text-[13px] font-medium text-foreground truncate'>
								{user.name}
							</div>

							{/* ✅ Email */}
							<div className='text-[11px] text-muted-foreground truncate'>
								{user.email}
							</div>

							{/* ✅ Role badge */}
							{user.role && (
								<div className='mt-1 inline-block px-2 py-0.5 text-[10px] bg-neutral-100 text-neutral-700 rounded border border-neutral-200'>
									{user.role}
								</div>
							)}
						</div>
					</div>

					<button
						onClick={handleLogout} // Attach the logout handler
						className='flex items-center gap-2 px-3 py-2 rounded-md text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors w-full'
					>
						<LogOut className='w-4 h-4' />
						<span>Logout</span>
					</button>
				</div>
			</aside>

			{/* Main content */}
			<main className='flex-1 overflow-hidden'>
				<Outlet />
			</main>
		</div>
	);
}
