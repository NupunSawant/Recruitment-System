import { useState } from "react";
import {
	Search,
	FileText,
	Calendar,
	CheckCircle,
	Clock,
	LogOut,
	User,
	Star,
	MessageSquare,
	ThumbsUp,
	ThumbsDown,
	Download,
	Mail,
	Phone,
	MapPin,
	ArrowLeft,
	Send,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../slices/Authentication/authSlice";

type InterviewerView = "assigned-list" | "interview-detail";

interface AssignedCandidate {
	id: string;
	name: string;
	role: string;
	experience: string;
	noticePeriod: string;
	stage: string;
	interviewDate: string;
	interviewTime: string;
	resumeUrl?: string;
	email: string;
	phone: string;
	location: string;
	currentCTC: string;
	expectedCTC: string;
	skills: string[];
}

const mockAssignedCandidates: AssignedCandidate[] = [
	{
		id: "1",
		name: "Priya Sharma",
		role: "MERN Developer",
		experience: "3.5 years",
		noticePeriod: "30 days",
		stage: "Technical",
		interviewDate: "2026-03-25",
		interviewTime: "14:00",
		email: "priya.sharma@email.com",
		phone: "+91 98765 43210",
		location: "Bangalore",
		currentCTC: "₹10 LPA",
		expectedCTC: "₹14 LPA",
		skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Redux"],
	},
	{
		id: "2",
		name: "Arjun Kumar",
		role: "QA Engineer",
		experience: "2 years",
		noticePeriod: "15 days",
		stage: "Screening",
		interviewDate: "2026-03-26",
		interviewTime: "10:00",
		email: "arjun.kumar@email.com",
		phone: "+91 98765 43211",
		location: "Pune",
		currentCTC: "₹6 LPA",
		expectedCTC: "₹9 LPA",
		skills: ["Selenium", "API Testing", "Postman", "JIRA", "Test Automation"],
	},
	{
		id: "3",
		name: "Sneha Patel",
		role: "UI/UX Designer",
		experience: "5 years",
		noticePeriod: "60 days",
		stage: "Technical",
		interviewDate: "2026-03-27",
		interviewTime: "15:30",
		email: "sneha.patel@email.com",
		phone: "+91 98765 43212",
		location: "Mumbai",
		currentCTC: "₹15 LPA",
		expectedCTC: "₹18 LPA",
		skills: [
			"Figma",
			"Adobe XD",
			"User Research",
			"Wireframing",
			"Prototyping",
		],
	},
];

export function InterviewerPortal() {
	const navigate = useNavigate();
	const [view, setView] = useState<InterviewerView>("assigned-list");
	const [selectedTab, setSelectedTab] = useState<
		"assigned" | "interviews" | "submitted"
	>("assigned");
	const [selectedCandidate, setSelectedCandidate] =
		useState<AssignedCandidate | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Feedback form states
	const [technicalRating, setTechnicalRating] = useState(0);
	const [communicationRating, setCommunicationRating] = useState(0);
	const [problemSolvingRating, setProblemSolvingRating] = useState(0);
	const [strengths, setStrengths] = useState("");
	const [weaknesses, setWeaknesses] = useState("");
	const [recommendation, setRecommendation] = useState("");
	const [additionalNotes, setAdditionalNotes] = useState("");
	const dispatch = useDispatch();

	const handleLogout = () => {
		// Dispatch the logout action to clear Redux state
		dispatch(logout());

		// Clear sessionStorage to remove user data and tokens
		sessionStorage.removeItem("hrms_authenticated");
		sessionStorage.removeItem("hrms_user_role");
		sessionStorage.removeItem("hrms_access_token");
		sessionStorage.removeItem("hrms_user");

		// Redirect to login page
		navigate("/login");
	};

	const handleStartFeedback = (candidate: AssignedCandidate) => {
		setSelectedCandidate(candidate);
		setView("interview-detail");
		// Reset form
		setTechnicalRating(0);
		setCommunicationRating(0);
		setProblemSolvingRating(0);
		setStrengths("");
		setWeaknesses("");
		setRecommendation("");
		setAdditionalNotes("");
	};

	const handleSubmitFeedback = () => {
		if (!selectedCandidate) return;

		// Validate required fields
		if (
			!technicalRating ||
			!communicationRating ||
			!problemSolvingRating ||
			!recommendation
		) {
			alert("Please fill all required fields");
			return;
		}

		// In a real app, this would call an API
		alert(
			`Feedback submitted for ${selectedCandidate.name}.\n\nRecommendation: ${recommendation}\n\nThe candidate will be ${recommendation === "Move Forward" ? "moved to the next stage" : "rejected and notified via email"}.`,
		);

		// Return to list
		setView("assigned-list");
		setSelectedCandidate(null);
	};

	const filteredCandidates = mockAssignedCandidates.filter(
		(c) =>
			c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.role.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	if (view === "interview-detail" && selectedCandidate) {
		return (
			<InterviewDetailView
				candidate={selectedCandidate}
				onBack={() => {
					setView("assigned-list");
					setSelectedCandidate(null);
				}}
				technicalRating={technicalRating}
				setTechnicalRating={setTechnicalRating}
				communicationRating={communicationRating}
				setCommunicationRating={setCommunicationRating}
				problemSolvingRating={problemSolvingRating}
				setProblemSolvingRating={setProblemSolvingRating}
				strengths={strengths}
				setStrengths={setStrengths}
				weaknesses={weaknesses}
				setWeaknesses={setWeaknesses}
				recommendation={recommendation}
				setRecommendation={setRecommendation}
				additionalNotes={additionalNotes}
				setAdditionalNotes={setAdditionalNotes}
				onSubmit={handleSubmitFeedback}
			/>
		);
	}

	return (
		<div className='h-screen flex bg-white'>
			{/* Sidebar */}
			<div className='w-64 border-r border-neutral-200 flex flex-col'>
				<div className='p-4 border-b border-neutral-200'>
					<h1 className='text-[15px] font-semibold text-neutral-900'>
						Interview Portal
					</h1>
					<p className='text-[11px] text-neutral-500 mt-0.5'>
						Interviewer Dashboard
					</p>
				</div>

				<nav className='flex-1 p-3'>
					<button
						onClick={() => setSelectedTab("assigned")}
						className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] rounded mb-1 ${
							selectedTab === "assigned"
								? "bg-neutral-900 text-white"
								: "text-neutral-700 hover:bg-neutral-100"
						}`}
					>
						<FileText className='w-4 h-4' />
						Assigned Candidates
					</button>
					<button
						onClick={() => setSelectedTab("interviews")}
						className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] rounded mb-1 ${
							selectedTab === "interviews"
								? "bg-neutral-900 text-white"
								: "text-neutral-700 hover:bg-neutral-100"
						}`}
					>
						<Calendar className='w-4 h-4' />
						My Interviews
					</button>
					<button
						onClick={() => setSelectedTab("submitted")}
						className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] rounded ${
							selectedTab === "submitted"
								? "bg-neutral-900 text-white"
								: "text-neutral-700 hover:bg-neutral-100"
						}`}
					>
						<CheckCircle className='w-4 h-4' />
						Feedback Submitted
					</button>
				</nav>

				<div className='p-3 border-t border-neutral-200'>
					<div className='flex items-center gap-2 mb-3 p-2 bg-neutral-50 rounded'>
						<div className='w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center'>
							<User className='w-4 h-4 text-neutral-600' />
						</div>
						<div className='flex-1 min-w-0'>
							<div className='text-[12px] font-medium text-neutral-900 truncate'>
								Rahul Verma
							</div>
							<div className='text-[10px] text-neutral-500'>Interviewer</div>
						</div>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='w-full h-8 text-[12px] border-neutral-200'
						onClick={handleLogout}
					>
						<LogOut className='w-3.5 h-3.5 mr-1.5' />
						Logout
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex-1 flex flex-col overflow-hidden'>
				{/* Header */}
				<div className='border-b border-neutral-200 px-5 py-3'>
					<div className='flex items-center justify-between mb-3'>
						<div>
							<h1 className='text-[15px] font-semibold text-neutral-900'>
								{selectedTab === "assigned" && "Assigned Candidates"}
								{selectedTab === "interviews" && "My Interviews"}
								{selectedTab === "submitted" && "Feedback Submitted"}
							</h1>
							<p className='text-[11px] text-neutral-500 mt-0.5'>
								{selectedTab === "assigned" &&
									`${filteredCandidates.length} candidates assigned`}
								{selectedTab === "interviews" && "Upcoming interview schedule"}
								{selectedTab === "submitted" && "Completed feedback history"}
							</p>
						</div>
					</div>

					{selectedTab === "assigned" && (
						<div className='relative max-w-sm'>
							<Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-400' />
							<Input
								placeholder='Search candidates...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='pl-8 h-8 text-[12px] border-neutral-200'
							/>
						</div>
					)}
				</div>

				{/* Content Area */}
				<div className='flex-1 overflow-auto'>
					{selectedTab === "assigned" && (
						<div className='p-5'>
							<table className='w-full'>
								<thead className='bg-neutral-50 border-b border-neutral-200'>
									<tr>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Candidate Name
										</th>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Role
										</th>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Experience
										</th>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Notice Period
										</th>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Stage
										</th>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Interview Date
										</th>
										<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredCandidates.map((candidate) => (
										<tr
											key={candidate.id}
											className='border-b border-neutral-100 hover:bg-neutral-50'
										>
											<td className='px-4 py-2.5'>
												<span className='text-[12px] text-neutral-900 font-medium'>
													{candidate.name}
												</span>
											</td>
											<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
												{candidate.role}
											</td>
											<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
												{candidate.experience}
											</td>
											<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
												{candidate.noticePeriod}
											</td>
											<td className='px-4 py-2.5'>
												<span
													className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${
														candidate.stage === "Screening"
															? "bg-blue-50 text-blue-700 border-blue-200"
															: candidate.stage === "Technical"
																? "bg-amber-50 text-amber-700 border-amber-200"
																: "bg-neutral-100 text-neutral-700 border-neutral-200"
													}`}
												>
													{candidate.stage}
												</span>
											</td>
											<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
												{candidate.interviewDate} at {candidate.interviewTime}
											</td>
											<td className='px-4 py-2.5'>
												<Button
													size='sm'
													className='h-7 text-[11px] bg-neutral-900 hover:bg-neutral-800'
													onClick={() => handleStartFeedback(candidate)}
												>
													Start Feedback
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>

							{filteredCandidates.length === 0 && (
								<div className='text-center py-12'>
									<Clock className='w-12 h-12 text-neutral-300 mx-auto mb-3' />
									<p className='text-[13px] text-neutral-600'>
										No candidates assigned
									</p>
									<p className='text-[11px] text-neutral-500 mt-1'>
										Assigned candidates will appear here
									</p>
								</div>
							)}
						</div>
					)}

					{selectedTab === "interviews" && (
						<div className='p-5'>
							<div className='text-center py-12'>
								<Calendar className='w-12 h-12 text-neutral-300 mx-auto mb-3' />
								<p className='text-[13px] text-neutral-600'>
									No upcoming interviews
								</p>
								<p className='text-[11px] text-neutral-500 mt-1'>
									Your interview schedule will appear here
								</p>
							</div>
						</div>
					)}

					{selectedTab === "submitted" && (
						<div className='p-5'>
							<div className='text-center py-12'>
								<CheckCircle className='w-12 h-12 text-neutral-300 mx-auto mb-3' />
								<p className='text-[13px] text-neutral-600'>
									No feedback submitted yet
								</p>
								<p className='text-[11px] text-neutral-500 mt-1'>
									Completed feedback history will appear here
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// Interview Detail View Component
interface InterviewDetailViewProps {
	candidate: AssignedCandidate;
	onBack: () => void;
	technicalRating: number;
	setTechnicalRating: (rating: number) => void;
	communicationRating: number;
	setCommunicationRating: (rating: number) => void;
	problemSolvingRating: number;
	setProblemSolvingRating: (rating: number) => void;
	strengths: string;
	setStrengths: (text: string) => void;
	weaknesses: string;
	setWeaknesses: (text: string) => void;
	recommendation: string;
	setRecommendation: (rec: string) => void;
	additionalNotes: string;
	setAdditionalNotes: (text: string) => void;
	onSubmit: () => void;
}

function InterviewDetailView(props: InterviewDetailViewProps) {
	const {
		candidate,
		onBack,
		technicalRating,
		setTechnicalRating,
		communicationRating,
		setCommunicationRating,
		problemSolvingRating,
		setProblemSolvingRating,
		strengths,
		setStrengths,
		weaknesses,
		setWeaknesses,
		recommendation,
		setRecommendation,
		additionalNotes,
		setAdditionalNotes,
		onSubmit,
	} = props;

	const [showResume, setShowResume] = useState(false);

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-4'>
				<div className='flex items-center gap-3 mb-3'>
					<button
						onClick={onBack}
						className='w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50'
					>
						<ArrowLeft className='w-4 h-4' />
					</button>
					<div className='flex-1'>
						<h2 className='text-[16px] font-semibold text-neutral-900'>
							{candidate.name}
						</h2>
						<p className='text-[12px] text-neutral-600'>
							{candidate.role} • {candidate.experience}
						</p>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] border-neutral-200'
						onClick={() => setShowResume(!showResume)}
					>
						<FileText className='w-3.5 h-3.5 mr-1.5' />
						{showResume ? "Hide Resume" : "View Resume"}
					</Button>
				</div>
			</div>

			<div className='flex-1 overflow-auto'>
				<div className='max-w-5xl mx-auto p-6'>
					<div className='grid grid-cols-2 gap-6'>
						{/* Left Column */}
						<div className='space-y-6'>
							{/* Resume Viewer */}
							{showResume && (
								<div className='bg-white border border-neutral-200 rounded-lg overflow-hidden'>
									<div className='px-4 py-3 bg-neutral-50 border-b border-neutral-200'>
										<div className='flex items-center justify-between'>
											<h3 className='text-[13px] font-semibold text-neutral-900'>
												Resume
											</h3>
											<Button
												variant='ghost'
												size='sm'
												className='h-6 text-[11px]'
											>
												<Download className='w-3 h-3' />
											</Button>
										</div>
									</div>
									<div className='p-4 max-h-96 overflow-auto bg-neutral-50'>
										<div className='bg-white border border-neutral-200 rounded p-6 text-[11px]'>
											<div className='text-center mb-4'>
												<h2 className='text-[16px] font-bold text-neutral-900'>
													{candidate.name.toUpperCase()}
												</h2>
												<p className='text-[12px] text-neutral-600 mt-1'>
													{candidate.role}
												</p>
												<p className='text-[10px] text-neutral-500 mt-1'>
													{candidate.email} • {candidate.phone} •{" "}
													{candidate.location}
												</p>
											</div>
											<div className='space-y-3'>
												<div>
													<h3 className='text-[12px] font-semibold text-neutral-900 border-b border-neutral-200 pb-1 mb-2'>
														PROFESSIONAL SUMMARY
													</h3>
													<p className='text-neutral-700 leading-relaxed'>
														Experienced professional with {candidate.experience}{" "}
														of expertise in {candidate.role.toLowerCase()}.
													</p>
												</div>
												<div>
													<h3 className='text-[12px] font-semibold text-neutral-900 border-b border-neutral-200 pb-1 mb-2'>
														TECHNICAL SKILLS
													</h3>
													<p className='text-neutral-700'>
														{candidate.skills.join(", ")}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Candidate Summary */}
							<div className='bg-white border border-neutral-200 rounded-lg overflow-hidden'>
								<div className='px-4 py-3 bg-neutral-50 border-b border-neutral-200'>
									<h3 className='text-[13px] font-semibold text-neutral-900'>
										Candidate Summary
									</h3>
								</div>
								<div className='p-4 space-y-3'>
									<div>
										<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
											Contact Information
										</h4>
										<div className='space-y-1.5 text-[12px]'>
											<div className='flex items-center gap-2'>
												<Mail className='w-3.5 h-3.5 text-neutral-400' />
												<span className='text-neutral-900'>
													{candidate.email}
												</span>
											</div>
											<div className='flex items-center gap-2'>
												<Phone className='w-3.5 h-3.5 text-neutral-400' />
												<span className='text-neutral-900'>
													{candidate.phone}
												</span>
											</div>
											<div className='flex items-center gap-2'>
												<MapPin className='w-3.5 h-3.5 text-neutral-400' />
												<span className='text-neutral-900'>
													{candidate.location}
												</span>
											</div>
										</div>
									</div>

									<div>
										<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
											Professional Details
										</h4>
										<div className='grid grid-cols-2 gap-3 text-[12px]'>
											<div className='p-2 bg-neutral-50 rounded border border-neutral-200'>
												<div className='text-neutral-500 mb-0.5'>
													Experience
												</div>
												<div className='text-neutral-900 font-medium'>
													{candidate.experience}
												</div>
											</div>
											<div className='p-2 bg-neutral-50 rounded border border-neutral-200'>
												<div className='text-neutral-500 mb-0.5'>
													Notice Period
												</div>
												<div className='text-neutral-900 font-medium'>
													{candidate.noticePeriod}
												</div>
											</div>
										</div>
									</div>

									<div>
										<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
											Skills
										</h4>
										<div className='flex flex-wrap gap-1.5'>
											{candidate.skills.map((skill) => (
												<span
													key={skill}
													className='px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[11px] rounded border border-neutral-200'
												>
													{skill}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Feedback Form */}
						<div className='space-y-6'>
							<div className='bg-white border border-neutral-200 rounded-lg overflow-hidden'>
								<div className='px-4 py-3 bg-neutral-50 border-b border-neutral-200'>
									<h3 className='text-[13px] font-semibold text-neutral-900'>
										Interview Feedback Form
									</h3>
									<p className='text-[11px] text-neutral-500 mt-0.5'>
										Please provide detailed feedback on the candidate
									</p>
								</div>
								<div className='p-4 space-y-4'>
									{/* Technical Rating */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Technical Rating (1-5) *
										</Label>
										<div className='flex gap-2'>
											{[1, 2, 3, 4, 5].map((rating) => (
												<button
													key={rating}
													onClick={() => setTechnicalRating(rating)}
													className={`flex-1 h-10 rounded border-2 text-[13px] font-medium transition-colors ${
														technicalRating === rating
															? "border-neutral-900 bg-neutral-900 text-white"
															: "border-neutral-200 hover:border-neutral-300"
													}`}
												>
													<Star
														className={`w-4 h-4 mx-auto ${technicalRating >= rating ? "fill-current" : ""}`}
													/>
												</button>
											))}
										</div>
									</div>

									{/* Communication Rating */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Communication Rating (1-5) *
										</Label>
										<div className='flex gap-2'>
											{[1, 2, 3, 4, 5].map((rating) => (
												<button
													key={rating}
													onClick={() => setCommunicationRating(rating)}
													className={`flex-1 h-10 rounded border-2 text-[13px] font-medium transition-colors ${
														communicationRating === rating
															? "border-neutral-900 bg-neutral-900 text-white"
															: "border-neutral-200 hover:border-neutral-300"
													}`}
												>
													<MessageSquare
														className={`w-4 h-4 mx-auto ${communicationRating >= rating ? "fill-current" : ""}`}
													/>
												</button>
											))}
										</div>
									</div>

									{/* Problem Solving Rating */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Problem Solving (1-5) *
										</Label>
										<div className='flex gap-2'>
											{[1, 2, 3, 4, 5].map((rating) => (
												<button
													key={rating}
													onClick={() => setProblemSolvingRating(rating)}
													className={`flex-1 h-10 rounded border-2 text-[13px] font-medium transition-colors ${
														problemSolvingRating === rating
															? "border-neutral-900 bg-neutral-900 text-white"
															: "border-neutral-200 hover:border-neutral-300"
													}`}
												>
													{rating}
												</button>
											))}
										</div>
									</div>

									{/* Strengths */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Strengths *
										</Label>
										<Textarea
											value={strengths}
											onChange={(e) => setStrengths(e.target.value)}
											className='text-[13px] min-h-[80px] border-neutral-200'
											placeholder="List the candidate's key strengths and positive observations..."
										/>
									</div>

									{/* Weaknesses */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Weaknesses / Areas for Improvement *
										</Label>
										<Textarea
											value={weaknesses}
											onChange={(e) => setWeaknesses(e.target.value)}
											className='text-[13px] min-h-[80px] border-neutral-200'
											placeholder='Note any concerns or areas where the candidate can improve...'
										/>
									</div>

									{/* Additional Notes */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Additional Notes (Optional)
										</Label>
										<Textarea
											value={additionalNotes}
											onChange={(e) => setAdditionalNotes(e.target.value)}
											className='text-[13px] min-h-[60px] border-neutral-200'
											placeholder='Any additional observations or comments...'
										/>
									</div>

									{/* Recommendation */}
									<div>
										<Label className='text-[11px] text-neutral-600 mb-2 block'>
											Recommendation *
										</Label>
										<Select
											value={recommendation}
											onValueChange={setRecommendation}
										>
											<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
												<SelectValue placeholder='Select recommendation' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Move Forward'>
													<div className='flex items-center gap-2'>
														<ThumbsUp className='w-3.5 h-3.5 text-emerald-600' />
														Move Forward to Next Round
													</div>
												</SelectItem>
												<SelectItem value='Reject'>
													<div className='flex items-center gap-2'>
														<ThumbsDown className='w-3.5 h-3.5 text-red-600' />
														Reject Candidate
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									{recommendation === "Reject" && (
										<div className='p-3 bg-red-50 border border-red-200 rounded'>
											<div className='flex items-start gap-2'>
												<AlertCircle className='w-4 h-4 text-red-600 mt-0.5' />
												<div>
													<p className='text-[12px] text-red-900 font-medium'>
														Rejection Notice
													</p>
													<p className='text-[11px] text-red-700 mt-1'>
														A rejection email will be automatically sent to the
														candidate upon submission.
													</p>
												</div>
											</div>
										</div>
									)}

									{recommendation === "Move Forward" && (
										<div className='p-3 bg-emerald-50 border border-emerald-200 rounded'>
											<div className='flex items-start gap-2'>
												<CheckCircle className='w-4 h-4 text-emerald-600 mt-0.5' />
												<div>
													<p className='text-[12px] text-emerald-900 font-medium'>
														Next Stage
													</p>
													<p className='text-[11px] text-emerald-700 mt-1'>
														The candidate will be moved to the next stage of the
														hiring process.
													</p>
												</div>
											</div>
										</div>
									)}

									{/* Submit Button */}
									<div className='pt-2'>
										<Button
											size='sm'
											className='w-full h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
											onClick={onSubmit}
											disabled={
												!technicalRating ||
												!communicationRating ||
												!problemSolvingRating ||
												!strengths ||
												!weaknesses ||
												!recommendation
											}
										>
											<Send className='w-3.5 h-3.5 mr-1.5' />
											Submit Feedback
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function AlertCircle({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<circle cx='12' cy='12' r='10' />
			<line x1='12' y1='8' x2='12' y2='12' />
			<line x1='12' y1='16' x2='12.01' y2='16' />
		</svg>
	);
}
