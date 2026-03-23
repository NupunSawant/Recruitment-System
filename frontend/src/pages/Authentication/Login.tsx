import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { useAppDispatch } from "../../hooks";
import { loginThunk } from "../../slices/Authentication/authThunks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch(); // Use typed dispatch

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<"admin" | "interviewer">("admin");
	const [rememberMe, setRememberMe] = useState(false);

	const { isLoading, error, isAuthenticated } = useSelector(
		(state: RootState) => state.auth,
	);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(loginThunk({ email, password, role, rememberMe })); // Dispatch the login thunk
	};

	// Redirect to dashboard/interviewer based on the user's role once authenticated
	useEffect(() => {
		if (isAuthenticated) {
			if (role === "admin") {
				navigate("/dashboard"); // Redirect to dashboard if admin
			} else {
				navigate("/interviewer"); // Redirect to interviewer portal if interviewer
			}
		}
	}, [isAuthenticated, role, navigate]); // Only trigger when isAuthenticated or role changes

	return (
		<div className='min-h-screen bg-muted flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<div className='inline-block p-3 bg-primary rounded-lg mb-3'>
						<div className='w-10 h-10 bg-primary-foreground rounded flex items-center justify-center'>
							<span className='text-primary font-bold text-xl'>M</span>
						</div>
					</div>
					<h1 className='text-[22px] font-semibold text-foreground mb-1'>
						Metaphi Innovations
					</h1>
					<p className='text-[13px] text-muted-foreground'>
						Recruitment Management System
					</p>
				</div>

				<div className='bg-white border border-border rounded-lg p-8'>
					<h2 className='text-[16px] font-semibold text-foreground mb-6'>
						Sign in to your account
					</h2>

					<form onSubmit={handleLogin} className='space-y-5'>
						<div>
							<Label
								htmlFor='role'
								className='text-[13px] text-foreground mb-2 block'
							>
								Login as
							</Label>
							<Select
								value={role}
								onValueChange={(value: "admin" | "interviewer") =>
									setRole(value)
								}
							>
								<SelectTrigger className='h-9 text-[13px]'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='admin'>Admin / HR Manager</SelectItem>
									<SelectItem value='interviewer'>Interviewer</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label
								htmlFor='email'
								className='text-[13px] text-foreground mb-2 block'
							>
								Email address
							</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='you@metaphi.com'
								className='h-9 text-[13px]'
								required
							/>
						</div>

						<div>
							<Label
								htmlFor='password'
								className='text-[13px] text-foreground mb-2 block'
							>
								Password
							</Label>
							<Input
								id='password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter your password'
								className='h-9 text-[13px]'
								required
							/>
						</div>

						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									className='w-3.5 h-3.5 rounded border-border'
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
								/>
								<span className='text-[13px] text-muted-foreground'>
									Remember me
								</span>
							</label>

							<button
								type='button'
								onClick={() => navigate("/forgot-password")}
								className='text-[13px] text-primary hover:underline'
							>
								Forgot password?
							</button>
						</div>

						{error && (
							<div className='text-[12px] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2'>
								{error}
							</div>
						)}

						<Button
							type='submit'
							className='w-full h-9 text-[13px] bg-primary hover:bg-primary/90'
							disabled={isLoading} // Disable button during loading
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>

					<div className='mt-6 pt-6 border-t border-border'>
						<p className='text-[12px] text-muted-foreground text-center'>
							For support, contact{" "}
							<a
								href='mailto:support@metaphi.com'
								className='text-primary hover:underline'
							>
								support@metaphi.com
							</a>
						</p>
					</div>
				</div>

				<p className='text-center text-[11px] text-muted-foreground mt-6'>
					© 2026 Metaphi Innovations. All rights reserved.
				</p>
			</div>
		</div>
	);
}
