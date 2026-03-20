import { useState } from "react";
import {
	Search,
	Filter,
	Upload,
	Plus,
	ChevronDown,
	GitBranch,
	UserPlus,
	Calendar,
	FileText,
	XCircle,
	Mail,
	Phone,
	MapPin,
	File,
	Download,
	CheckCircle,
	AlertCircle,
	ArrowLeft,
	ArrowRight,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

type WorkflowScreen =
	| "table-initial"
	| "table-dropdown-open"
	| "detail-overview"
	| "detail-resume"
	| "modal-move-stage"
	| "modal-assign"
	| "modal-schedule"
	| "modal-reject"
	| "table-updated";

export function CandidatesWorkflowDemo() {
	const [currentScreen, setCurrentScreen] =
		useState<WorkflowScreen>("table-initial");

	const screens: { id: WorkflowScreen; label: string }[] = [
		{ id: "table-initial", label: "Screen 1: Candidates Table" },
		{ id: "table-dropdown-open", label: "Screen 2: Actions Dropdown Open" },
		{ id: "detail-overview", label: "Screen 3: Candidate Detail" },
		{ id: "detail-resume", label: "Screen 4: Resume Tab" },
		{ id: "modal-move-stage", label: "Screen 5: Move Stage Modal" },
		{ id: "modal-assign", label: "Screen 6: Assign Interviewer Modal" },
		{ id: "modal-schedule", label: "Screen 7: Schedule Interview Modal" },
		{ id: "modal-reject", label: "Screen 8: Reject Confirmation Modal" },
		{ id: "table-updated", label: "Screen 9: Updated Table" },
	];

	const currentIndex = screens.findIndex((s) => s.id === currentScreen);

	const goNext = () => {
		if (currentIndex < screens.length - 1) {
			setCurrentScreen(screens[currentIndex + 1].id);
		}
	};

	const goPrev = () => {
		if (currentIndex > 0) {
			setCurrentScreen(screens[currentIndex - 1].id);
		}
	};

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Navigation Header */}
			<div className='border-b border-neutral-200 bg-neutral-50 px-5 py-3'>
				<div className='flex items-center justify-between mb-2'>
					<h1 className='text-[14px] font-semibold text-neutral-900'>
						Candidates Workflow Demo
					</h1>
					<div className='text-[11px] text-neutral-600'>
						Screen {currentIndex + 1} of {screens.length}
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-[12px] text-neutral-600'>
						{screens[currentIndex].label}
					</p>
					<div className='flex gap-2'>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] border-neutral-200'
							onClick={goPrev}
							disabled={currentIndex === 0}
						>
							<ArrowLeft className='w-3 h-3 mr-1' />
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] border-neutral-200'
							onClick={goNext}
							disabled={currentIndex === screens.length - 1}
						>
							Next
							<ArrowRight className='w-3 h-3 ml-1' />
						</Button>
					</div>
				</div>
				{/* Screen selector */}
				<div className='flex gap-1 mt-3'>
					{screens.map((screen, index) => (
						<button
							key={screen.id}
							onClick={() => setCurrentScreen(screen.id)}
							className={`flex-1 h-1.5 rounded ${
								index === currentIndex
									? "bg-neutral-900"
									: index < currentIndex
										? "bg-neutral-400"
										: "bg-neutral-200"
							}`}
							title={screen.label}
						/>
					))}
				</div>
			</div>

			{/* Screen Content */}
			<div className='flex-1 overflow-auto'>
				{currentScreen === "table-initial" && <Screen1TableInitial />}
				{currentScreen === "table-dropdown-open" && (
					<Screen2TableDropdownOpen />
				)}
				{currentScreen === "detail-overview" && <Screen3DetailOverview />}
				{currentScreen === "detail-resume" && <Screen4DetailResume />}
				{currentScreen === "modal-move-stage" && <Screen5MoveStageModal />}
				{currentScreen === "modal-assign" && <Screen6AssignModal />}
				{currentScreen === "modal-schedule" && <Screen7ScheduleModal />}
				{currentScreen === "modal-reject" && <Screen8RejectModal />}
				{currentScreen === "table-updated" && <Screen9TableUpdated />}
			</div>
		</div>
	);
}

// Screen 1: Initial Table
function Screen1TableInitial() {
	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-3'>
				<div className='flex items-center justify-between mb-3'>
					<div>
						<h1 className='text-[15px] font-semibold text-neutral-900'>
							Candidates
						</h1>
						<p className='text-[11px] text-neutral-500 mt-0.5'>8 candidates</p>
					</div>
				</div>

				{/* Role Tabs */}
				<div className='flex items-center gap-1.5 mb-3'>
					{["All", "MERN", "QA", "Flutter", "UI/UX"].map((tab, i) => (
						<button
							key={tab}
							className={`px-3 py-1.5 text-[12px] font-medium rounded border transition-colors ${
								i === 0
									? "bg-neutral-900 text-white border-neutral-900"
									: "bg-white text-neutral-600 border-neutral-200"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Quick Chips */}
				<div className='flex items-center gap-1.5 mb-3'>
					{[
						"Intern",
						"Fresher",
						"Experienced",
						"Immediate Joiner",
						"Backup",
					].map((filter) => (
						<button
							key={filter}
							className='px-2.5 py-1 text-[11px] font-medium rounded border bg-white text-neutral-500 border-neutral-200'
						>
							{filter}
						</button>
					))}
				</div>

				{/* Toolbar */}
				<div className='flex gap-2'>
					<div className='relative flex-1 max-w-xs'>
						<Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-400' />
						<Input
							placeholder='Search by name, phone, or role...'
							className='pl-8 h-8 text-[12px] border-neutral-200'
						/>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Filter className='w-3.5 h-3.5' />
						Advanced Filters
					</Button>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Upload className='w-3.5 h-3.5' />
						Upload Candidates
					</Button>
					<Button
						size='sm'
						className='h-8 text-[12px] gap-1.5 bg-neutral-900 hover:bg-neutral-800'
					>
						<Plus className='w-3.5 h-3.5' />
						Add Candidate
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className='flex-1 overflow-auto'>
				<table className='w-full'>
					<thead className='sticky top-0 bg-neutral-50 border-b border-neutral-200'>
						<tr>
							<th className='w-10 px-4 py-2.5'>
								<Checkbox />
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Candidate Name
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Role
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Type
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Tags
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Total Exp
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Notice
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Expected CTC
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Stage
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Interviewer
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Resume
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{mockCandidates.map((candidate) => (
							<tr
								key={candidate.id}
								className='border-b border-neutral-100 hover:bg-neutral-50'
							>
								<td className='px-4 py-2.5'>
									<Checkbox />
								</td>
								<td className='px-4 py-2.5'>
									<span className='text-[12px] text-blue-600 font-medium'>
										{candidate.name}
									</span>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.role}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.type}
								</td>
								<td className='px-4 py-2.5'>
									<div className='flex flex-wrap gap-1'>
										{candidate.tags.map((tag) => (
											<span
												key={tag}
												className='px-1.5 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] rounded border border-neutral-200'
											>
												{tag}
											</span>
										))}
									</div>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.exp}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.notice}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.ctc}
								</td>
								<td className='px-4 py-2.5'>
									<span
										className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${getStageColor(candidate.stage)}`}
									>
										{candidate.stage}
									</span>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-600'>
									{candidate.interviewer}
								</td>
								<td className='px-4 py-2.5'>
									<button className='text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1'>
										<File className='w-3 h-3' />
										View
									</button>
								</td>
								<td className='px-4 py-2.5'>
									<Button
										variant='ghost'
										size='sm'
										className='h-7 px-2 text-[11px] gap-1 border border-neutral-200 hover:bg-neutral-50'
									>
										Actions
										<ChevronDown className='w-3 h-3' />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Screen 2: Table with Dropdown Open
function Screen2TableDropdownOpen() {
	return (
		<div className='h-full flex flex-col bg-white relative'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-3'>
				<div className='flex items-center justify-between mb-3'>
					<div>
						<h1 className='text-[15px] font-semibold text-neutral-900'>
							Candidates
						</h1>
						<p className='text-[11px] text-neutral-500 mt-0.5'>8 candidates</p>
					</div>
				</div>

				{/* Role Tabs */}
				<div className='flex items-center gap-1.5 mb-3'>
					{["All", "MERN", "QA", "Flutter", "UI/UX"].map((tab, i) => (
						<button
							key={tab}
							className={`px-3 py-1.5 text-[12px] font-medium rounded border ${
								i === 0
									? "bg-neutral-900 text-white border-neutral-900"
									: "bg-white text-neutral-600 border-neutral-200"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Quick Chips */}
				<div className='flex items-center gap-1.5 mb-3'>
					{[
						"Intern",
						"Fresher",
						"Experienced",
						"Immediate Joiner",
						"Backup",
					].map((filter) => (
						<button
							key={filter}
							className='px-2.5 py-1 text-[11px] font-medium rounded border bg-white text-neutral-500 border-neutral-200'
						>
							{filter}
						</button>
					))}
				</div>

				{/* Toolbar */}
				<div className='flex gap-2'>
					<div className='relative flex-1 max-w-xs'>
						<Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-400' />
						<Input
							placeholder='Search by name, phone, or role...'
							className='pl-8 h-8 text-[12px] border-neutral-200'
						/>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Filter className='w-3.5 h-3.5' />
						Advanced Filters
					</Button>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Upload className='w-3.5 h-3.5' />
						Upload Candidates
					</Button>
					<Button
						size='sm'
						className='h-8 text-[12px] gap-1.5 bg-neutral-900 hover:bg-neutral-800'
					>
						<Plus className='w-3.5 h-3.5' />
						Add Candidate
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className='flex-1 overflow-auto'>
				<table className='w-full'>
					<thead className='sticky top-0 bg-neutral-50 border-b border-neutral-200'>
						<tr>
							<th className='w-10 px-4 py-2.5'>
								<Checkbox />
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Candidate Name
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Role
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Type
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Tags
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Total Exp
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Notice
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Expected CTC
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Stage
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Interviewer
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Resume
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{mockCandidates.map((candidate, index) => (
							<tr
								key={candidate.id}
								className={`border-b border-neutral-100 ${index === 0 ? "bg-neutral-50" : "hover:bg-neutral-50"}`}
							>
								<td className='px-4 py-2.5'>
									<Checkbox />
								</td>
								<td className='px-4 py-2.5'>
									<span className='text-[12px] text-blue-600 font-medium'>
										{candidate.name}
									</span>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.role}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.type}
								</td>
								<td className='px-4 py-2.5'>
									<div className='flex flex-wrap gap-1'>
										{candidate.tags.map((tag) => (
											<span
												key={tag}
												className='px-1.5 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] rounded border border-neutral-200'
											>
												{tag}
											</span>
										))}
									</div>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.exp}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.notice}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.ctc}
								</td>
								<td className='px-4 py-2.5'>
									<span
										className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${getStageColor(candidate.stage)}`}
									>
										{candidate.stage}
									</span>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-600'>
									{candidate.interviewer}
								</td>
								<td className='px-4 py-2.5'>
									<button className='text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1'>
										<File className='w-3 h-3' />
										View
									</button>
								</td>
								<td className='px-4 py-2.5 relative'>
									<Button
										variant='ghost'
										size='sm'
										className='h-7 px-2 text-[11px] gap-1 border border-neutral-200 bg-white'
									>
										Actions
										<ChevronDown className='w-3 h-3' />
									</Button>

									{/* Dropdown Menu - Only for first row */}
									{index === 0 && (
										<div className='absolute right-4 top-12 w-48 bg-white rounded-lg border border-neutral-200 shadow-lg z-50'>
											<div className='py-1'>
												<button className='w-full px-3 py-2 text-left text-[12px] text-neutral-900 hover:bg-neutral-50 flex items-center gap-2'>
													<FileText className='w-3.5 h-3.5' />
													View Candidate
												</button>
												<button className='w-full px-3 py-2 text-left text-[12px] text-neutral-900 hover:bg-neutral-50 flex items-center gap-2'>
													<File className='w-3.5 h-3.5' />
													View Resume
												</button>
												<button className='w-full px-3 py-2 text-left text-[12px] text-neutral-900 hover:bg-neutral-50 flex items-center gap-2'>
													<GitBranch className='w-3.5 h-3.5' />
													Move Stage
												</button>
												<button className='w-full px-3 py-2 text-left text-[12px] text-neutral-900 hover:bg-neutral-50 flex items-center gap-2'>
													<UserPlus className='w-3.5 h-3.5' />
													Assign Interviewer
												</button>
												<button className='w-full px-3 py-2 text-left text-[12px] text-neutral-900 hover:bg-neutral-50 flex items-center gap-2'>
													<Calendar className='w-3.5 h-3.5' />
													Schedule Interview
												</button>
												<button className='w-full px-3 py-2 text-left text-[12px] text-red-600 hover:bg-red-50 flex items-center gap-2'>
													<XCircle className='w-3.5 h-3.5' />
													Reject Candidate
												</button>
											</div>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Screen 3: Detail Overview
function Screen3DetailOverview() {
	const candidate = mockCandidates[0];
	const stages = ["New", "Screening", "Technical", "Offer", "Joined"];
	const currentIndex = stages.indexOf(candidate.stage);

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-4'>
				<div className='flex items-center gap-3 mb-3'>
					<button className='w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50'>
						<ArrowLeft className='w-4 h-4' />
					</button>
					<div className='flex-1'>
						<h2 className='text-[16px] font-semibold text-neutral-900'>
							{candidate.name}
						</h2>
						<p className='text-[12px] text-neutral-600'>{candidate.role}</p>
					</div>
					<span className='inline-block px-2.5 py-1 rounded text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200'>
						{candidate.stage}
					</span>
				</div>

				{/* Key Info */}
				<div className='grid grid-cols-4 gap-4 text-[12px] p-3 bg-neutral-50 rounded border border-neutral-200'>
					<div>
						<div className='text-neutral-500 mb-0.5'>Total Experience</div>
						<div className='text-neutral-900 font-medium'>{candidate.exp}</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Notice Period</div>
						<div className='text-neutral-900 font-medium'>
							{candidate.notice}
						</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Expected CTC</div>
						<div className='text-neutral-900 font-medium'>{candidate.ctc}</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Location</div>
						<div className='text-neutral-900 font-medium'>Bangalore</div>
					</div>
				</div>
			</div>

			{/* Stage Tracker */}
			<div className='px-5 py-4 border-b border-neutral-200 bg-neutral-50'>
				<h4 className='text-[10px] font-semibold text-neutral-600 uppercase tracking-wide mb-3'>
					Stage Progression
				</h4>
				<div className='flex items-center'>
					{stages.map((stage, index) => {
						const isCompleted = index < currentIndex;
						const isCurrent = stage === candidate.stage;

						return (
							<div key={stage} className='flex items-center flex-1'>
								<div className='flex flex-col items-center gap-1.5 flex-1'>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold border-2 ${
											isCompleted
												? "bg-emerald-500 border-emerald-500 text-white"
												: isCurrent
													? "bg-neutral-900 border-neutral-900 text-white"
													: "bg-white border-neutral-200 text-neutral-400"
										}`}
									>
										{isCompleted ? (
											<CheckCircle className='w-4 h-4' />
										) : (
											index + 1
										)}
									</div>
									<span
										className={`text-[10px] font-medium ${isCurrent ? "text-neutral-900" : "text-neutral-500"}`}
									>
										{stage}
									</span>
								</div>
								{index < stages.length - 1 && (
									<div
										className={`h-0.5 w-full -mt-4 ${isCompleted ? "bg-emerald-500" : "bg-neutral-200"}`}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Tabs */}
			<div className='flex-1 overflow-hidden flex flex-col'>
				<div className='border-b border-neutral-200 px-5'>
					<div className='flex gap-1'>
						{[
							"Overview",
							"Resume",
							"Screening",
							"Technical",
							"Offer",
							"Activity",
						].map((tab, i) => (
							<button
								key={tab}
								className={`px-4 py-2.5 text-[12px] font-medium border-b-2 ${
									i === 0
										? "border-neutral-900 text-neutral-900"
										: "border-transparent text-neutral-500"
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				<div className='flex-1 overflow-y-auto p-5'>
					<div className='space-y-4 max-w-2xl'>
						<div>
							<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
								Contact Information
							</h4>
							<div className='space-y-1.5 text-[12px]'>
								<div className='flex items-center gap-2'>
									<Mail className='w-3.5 h-3.5 text-neutral-400' />
									<span className='text-neutral-900'>
										priya.sharma@email.com
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Phone className='w-3.5 h-3.5 text-neutral-400' />
									<span className='text-neutral-900'>+91 98765 43210</span>
								</div>
								<div className='flex items-center gap-2'>
									<MapPin className='w-3.5 h-3.5 text-neutral-400' />
									<span className='text-neutral-900'>Bangalore</span>
								</div>
							</div>
						</div>

						<div>
							<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
								Experience
							</h4>
							<div className='grid grid-cols-2 gap-3 text-[12px]'>
								<div className='p-3 bg-neutral-50 rounded border border-neutral-200'>
									<div className='text-neutral-500 mb-0.5'>
										Total Experience
									</div>
									<div className='text-neutral-900 font-medium'>3.5 years</div>
								</div>
								<div className='p-3 bg-neutral-50 rounded border border-neutral-200'>
									<div className='text-neutral-500 mb-0.5'>
										Relevant Experience
									</div>
									<div className='text-neutral-900 font-medium'>2.5 years</div>
								</div>
							</div>
						</div>

						<div>
							<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
								Compensation
							</h4>
							<div className='grid grid-cols-2 gap-3 text-[12px]'>
								<div className='p-3 bg-neutral-50 rounded border border-neutral-200'>
									<div className='text-neutral-500 mb-0.5'>Current CTC</div>
									<div className='text-neutral-900 font-medium'>₹10 LPA</div>
								</div>
								<div className='p-3 bg-neutral-50 rounded border border-neutral-200'>
									<div className='text-neutral-500 mb-0.5'>Expected CTC</div>
									<div className='text-neutral-900 font-medium'>₹14 LPA</div>
								</div>
							</div>
						</div>

						<div>
							<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
								Skills
							</h4>
							<div className='flex flex-wrap gap-1.5'>
								{[
									"React",
									"Node.js",
									"MongoDB",
									"Express",
									"TypeScript",
									"Redux",
								].map((skill) => (
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
		</div>
	);
}

// Screen 4: Detail Resume Tab
function Screen4DetailResume() {
	const candidate = mockCandidates[0];
	const stages = ["New", "Screening", "Technical", "Offer", "Joined"];
	const currentIndex = stages.indexOf(candidate.stage);

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-4'>
				<div className='flex items-center gap-3 mb-3'>
					<button className='w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50'>
						<ArrowLeft className='w-4 h-4' />
					</button>
					<div className='flex-1'>
						<h2 className='text-[16px] font-semibold text-neutral-900'>
							{candidate.name}
						</h2>
						<p className='text-[12px] text-neutral-600'>{candidate.role}</p>
					</div>
					<span className='inline-block px-2.5 py-1 rounded text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200'>
						{candidate.stage}
					</span>
				</div>

				{/* Key Info */}
				<div className='grid grid-cols-4 gap-4 text-[12px] p-3 bg-neutral-50 rounded border border-neutral-200'>
					<div>
						<div className='text-neutral-500 mb-0.5'>Total Experience</div>
						<div className='text-neutral-900 font-medium'>{candidate.exp}</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Notice Period</div>
						<div className='text-neutral-900 font-medium'>
							{candidate.notice}
						</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Expected CTC</div>
						<div className='text-neutral-900 font-medium'>{candidate.ctc}</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Location</div>
						<div className='text-neutral-900 font-medium'>Bangalore</div>
					</div>
				</div>
			</div>

			{/* Stage Tracker */}
			<div className='px-5 py-4 border-b border-neutral-200 bg-neutral-50'>
				<h4 className='text-[10px] font-semibold text-neutral-600 uppercase tracking-wide mb-3'>
					Stage Progression
				</h4>
				<div className='flex items-center'>
					{stages.map((stage, index) => {
						const isCompleted = index < currentIndex;
						const isCurrent = stage === candidate.stage;

						return (
							<div key={stage} className='flex items-center flex-1'>
								<div className='flex flex-col items-center gap-1.5 flex-1'>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold border-2 ${
											isCompleted
												? "bg-emerald-500 border-emerald-500 text-white"
												: isCurrent
													? "bg-neutral-900 border-neutral-900 text-white"
													: "bg-white border-neutral-200 text-neutral-400"
										}`}
									>
										{isCompleted ? (
											<CheckCircle className='w-4 h-4' />
										) : (
											index + 1
										)}
									</div>
									<span
										className={`text-[10px] font-medium ${isCurrent ? "text-neutral-900" : "text-neutral-500"}`}
									>
										{stage}
									</span>
								</div>
								{index < stages.length - 1 && (
									<div
										className={`h-0.5 w-full -mt-4 ${isCompleted ? "bg-emerald-500" : "bg-neutral-200"}`}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Tabs */}
			<div className='flex-1 overflow-hidden flex flex-col'>
				<div className='border-b border-neutral-200 px-5'>
					<div className='flex gap-1'>
						{[
							"Overview",
							"Resume",
							"Screening",
							"Technical",
							"Offer",
							"Activity",
						].map((tab, i) => (
							<button
								key={tab}
								className={`px-4 py-2.5 text-[12px] font-medium border-b-2 ${
									i === 1
										? "border-neutral-900 text-neutral-900"
										: "border-transparent text-neutral-500"
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				<div className='flex-1 overflow-y-auto p-5 bg-neutral-100'>
					<div className='max-w-4xl mx-auto'>
						{/* Resume Viewer */}
						<div
							className='bg-white rounded border border-neutral-200 shadow-sm'
							style={{ height: "600px" }}
						>
							<div className='h-full flex flex-col'>
								<div className='border-b border-neutral-200 px-4 py-3 flex items-center justify-between bg-neutral-50'>
									<div>
										<div className='text-[13px] font-medium text-neutral-900'>
											Priya_Sharma_Resume.pdf
										</div>
										<div className='text-[11px] text-neutral-500'>
											PDF Document • 245 KB
										</div>
									</div>
									<Button
										variant='outline'
										size='sm'
										className='h-7 text-[11px] gap-1 border-neutral-200'
									>
										<Download className='w-3 h-3' />
										Download
									</Button>
								</div>
								<div className='flex-1 p-8 overflow-auto'>
									{/* PDF Placeholder */}
									<div className='bg-white border border-neutral-200 rounded p-8'>
										<div className='text-center mb-6'>
											<h2 className='text-[20px] font-bold text-neutral-900'>
												PRIYA SHARMA
											</h2>
											<p className='text-[13px] text-neutral-600 mt-1'>
												Full Stack Developer (MERN)
											</p>
											<p className='text-[11px] text-neutral-500 mt-1'>
												priya.sharma@email.com • +91 98765 43210 • Bangalore,
												India
											</p>
										</div>

										<div className='space-y-4'>
											<div>
												<h3 className='text-[14px] font-semibold text-neutral-900 border-b border-neutral-200 pb-1 mb-2'>
													PROFESSIONAL SUMMARY
												</h3>
												<p className='text-[12px] text-neutral-700 leading-relaxed'>
													Experienced Full Stack Developer with 3.5 years of
													expertise in building scalable web applications using
													MERN stack. Proven track record of delivering
													high-quality solutions and collaborating with
													cross-functional teams.
												</p>
											</div>

											<div>
												<h3 className='text-[14px] font-semibold text-neutral-900 border-b border-neutral-200 pb-1 mb-2'>
													TECHNICAL SKILLS
												</h3>
												<p className='text-[12px] text-neutral-700'>
													<strong>Frontend:</strong> React.js, Redux,
													TypeScript, HTML5, CSS3, Tailwind CSS
													<br />
													<strong>Backend:</strong> Node.js, Express.js, REST
													APIs, GraphQL
													<br />
													<strong>Database:</strong> MongoDB, PostgreSQL, MySQL
													<br />
													<strong>Tools:</strong> Git, Docker, AWS, CI/CD
												</p>
											</div>

											<div>
												<h3 className='text-[14px] font-semibold text-neutral-900 border-b border-neutral-200 pb-1 mb-2'>
													WORK EXPERIENCE
												</h3>
												<div className='space-y-3'>
													<div>
														<div className='flex justify-between items-start mb-1'>
															<div>
																<p className='text-[13px] font-semibold text-neutral-900'>
																	Senior Developer
																</p>
																<p className='text-[11px] text-neutral-600'>
																	Tech Solutions Pvt Ltd
																</p>
															</div>
															<p className='text-[11px] text-neutral-500'>
																Jan 2022 - Present
															</p>
														</div>
														<ul className='list-disc list-inside text-[12px] text-neutral-700 space-y-0.5 ml-2'>
															<li>
																Developed and maintained multiple client-facing
																web applications
															</li>
															<li>
																Improved application performance by 40% through
																optimization
															</li>
															<li>
																Mentored junior developers and conducted code
																reviews
															</li>
														</ul>
													</div>
												</div>
											</div>

											<div>
												<h3 className='text-[14px] font-semibold text-neutral-900 border-b border-neutral-200 pb-1 mb-2'>
													EDUCATION
												</h3>
												<p className='text-[12px] text-neutral-700'>
													<strong>B.Tech in Computer Science</strong>
													<br />
													XYZ University • 2016-2020 • CGPA: 8.5/10
												</p>
											</div>
										</div>
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

// Screen 5: Move Stage Modal
function Screen5MoveStageModal() {
	const candidate = mockCandidates[0];

	return (
		<div className='h-full flex items-center justify-center bg-black/40'>
			<div className='bg-white rounded-lg p-5 w-[420px] border border-neutral-200 shadow-xl'>
				<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
					Move Stage
				</h3>

				<div className='space-y-3 mb-5'>
					<div>
						<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
							Candidate
						</Label>
						<div className='text-[13px] text-neutral-900 font-medium'>
							{candidate.name}
						</div>
						<div className='text-[11px] text-neutral-500'>{candidate.role}</div>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
							Current Stage
						</Label>
						<div className='inline-block px-2 py-1 rounded text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200'>
							{candidate.stage}
						</div>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							New Stage *
						</Label>
						<Select defaultValue='Technical'>
							<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='New'>New</SelectItem>
								<SelectItem value='Screening'>Screening</SelectItem>
								<SelectItem value='Technical'>Technical</SelectItem>
								<SelectItem value='Offer'>Offer</SelectItem>
								<SelectItem value='Joined'>Joined</SelectItem>
								<SelectItem value='Rejected'>Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className='flex gap-2'>
					<Button
						variant='outline'
						size='sm'
						className='flex-1 h-9 text-[13px] border-neutral-200'
					>
						Cancel
					</Button>
					<Button
						size='sm'
						className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
					>
						Apply
					</Button>
				</div>
			</div>
		</div>
	);
}

// Screen 6: Assign Interviewer Modal
function Screen6AssignModal() {
	const candidate = mockCandidates[0];

	return (
		<div className='h-full flex items-center justify-center bg-black/40'>
			<div className='bg-white rounded-lg p-5 w-[480px] border border-neutral-200 shadow-xl'>
				<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
					Assign Interviewer
				</h3>

				<div className='space-y-3 mb-5'>
					<div>
						<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
							Candidate
						</Label>
						<div className='text-[13px] text-neutral-900 font-medium'>
							{candidate.name}
						</div>
						<div className='text-[11px] text-neutral-500'>
							{candidate.role} • {candidate.stage}
						</div>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Select Interviewer *
						</Label>
						<Select defaultValue='rahul'>
							<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='rahul'>Rahul Verma (Tech Lead)</SelectItem>
								<SelectItem value='neha'>
									Neha Gupta (Senior Developer)
								</SelectItem>
								<SelectItem value='amit'>Amit Patel (HR Manager)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Interview Round *
						</Label>
						<Select defaultValue='technical'>
							<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='screening'>Screening Round</SelectItem>
								<SelectItem value='technical'>Technical Round</SelectItem>
								<SelectItem value='final'>Final Round</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Notes (Optional)
						</Label>
						<Textarea
							className='text-[13px] min-h-[70px] border-neutral-200'
							placeholder='Add any special instructions or notes...'
						/>
					</div>
				</div>

				<div className='flex gap-2'>
					<Button
						variant='outline'
						size='sm'
						className='flex-1 h-9 text-[13px] border-neutral-200'
					>
						Cancel
					</Button>
					<Button
						size='sm'
						className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
					>
						Assign
					</Button>
				</div>
			</div>
		</div>
	);
}

// Screen 7: Schedule Interview Modal
function Screen7ScheduleModal() {
	const candidate = mockCandidates[0];

	return (
		<div className='h-full flex items-center justify-center bg-black/40'>
			<div className='bg-white rounded-lg p-5 w-[480px] border border-neutral-200 shadow-xl'>
				<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
					Schedule Interview
				</h3>

				<div className='space-y-3 mb-5'>
					<div>
						<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
							Candidate
						</Label>
						<div className='text-[13px] text-neutral-900 font-medium'>
							{candidate.name}
						</div>
						<div className='text-[11px] text-neutral-500'>{candidate.role}</div>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Interview Type *
						</Label>
						<Select defaultValue='technical'>
							<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='screening'>Screening Interview</SelectItem>
								<SelectItem value='technical'>Technical Interview</SelectItem>
								<SelectItem value='final'>Final Round Interview</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='grid grid-cols-2 gap-3'>
						<div>
							<Label className='text-[11px] text-neutral-600 mb-2 block'>
								Date *
							</Label>
							<Input
								type='date'
								defaultValue='2026-03-25'
								className='h-9 text-[13px] border-neutral-200'
							/>
						</div>
						<div>
							<Label className='text-[11px] text-neutral-600 mb-2 block'>
								Time *
							</Label>
							<Input
								type='time'
								defaultValue='14:00'
								className='h-9 text-[13px] border-neutral-200'
							/>
						</div>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Interviewer
						</Label>
						<Select defaultValue='rahul'>
							<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='rahul'>Rahul Verma</SelectItem>
								<SelectItem value='neha'>Neha Gupta</SelectItem>
								<SelectItem value='amit'>Amit Patel</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Meeting Link or Location
						</Label>
						<Input
							defaultValue='https://meet.google.com/xyz-abc-123'
							className='h-9 text-[13px] border-neutral-200'
							placeholder='Enter Google Meet / Zoom link or physical location'
						/>
					</div>
				</div>

				<div className='flex gap-2'>
					<Button
						variant='outline'
						size='sm'
						className='flex-1 h-9 text-[13px] border-neutral-200'
					>
						Cancel
					</Button>
					<Button
						size='sm'
						className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
					>
						Schedule
					</Button>
				</div>
			</div>
		</div>
	);
}

// Screen 8: Reject Modal
function Screen8RejectModal() {
	const candidate = mockCandidates[0];

	return (
		<div className='h-full flex items-center justify-center bg-black/40'>
			<div className='bg-white rounded-lg p-5 w-[450px] border border-neutral-200 shadow-xl'>
				<div className='flex items-center gap-3 mb-4'>
					<div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center'>
						<AlertCircle className='w-5 h-5 text-red-600' />
					</div>
					<div>
						<h3 className='text-[14px] font-semibold text-neutral-900'>
							Reject Candidate
						</h3>
						<p className='text-[11px] text-neutral-500'>
							This action will mark the candidate as rejected
						</p>
					</div>
				</div>

				<div className='space-y-3 mb-5'>
					<div>
						<Label className='text-[11px] text-neutral-600 mb-1 block'>
							Candidate
						</Label>
						<div className='text-[13px] text-neutral-900 font-medium'>
							{candidate.name}
						</div>
						<div className='text-[11px] text-neutral-500'>
							{candidate.role} • Current Stage: {candidate.stage}
						</div>
					</div>

					<div>
						<Label className='text-[11px] text-neutral-600 mb-2 block'>
							Rejection Reason (Optional)
						</Label>
						<Textarea
							className='text-[13px] min-h-[80px] border-neutral-200'
							placeholder='Enter reason for rejection (will be logged in activity)...'
						/>
					</div>
				</div>

				<div className='flex gap-2'>
					<Button
						variant='outline'
						size='sm'
						className='flex-1 h-9 text-[13px] border-neutral-200'
					>
						Cancel
					</Button>
					<Button
						size='sm'
						className='flex-1 h-9 text-[13px] bg-red-600 hover:bg-red-700 text-white'
					>
						Confirm Reject
					</Button>
				</div>
			</div>
		</div>
	);
}

// Screen 9: Updated Table
function Screen9TableUpdated() {
	const updatedCandidates = mockCandidates.map((c, i) =>
		i === 0 ? { ...c, stage: "Technical", interviewer: "Rahul Verma" } : c,
	);

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-3'>
				<div className='flex items-center justify-between mb-3'>
					<div>
						<h1 className='text-[15px] font-semibold text-neutral-900'>
							Candidates
						</h1>
						<p className='text-[11px] text-neutral-500 mt-0.5'>8 candidates</p>
					</div>
				</div>

				{/* Role Tabs */}
				<div className='flex items-center gap-1.5 mb-3'>
					{["All", "MERN", "QA", "Flutter", "UI/UX"].map((tab, i) => (
						<button
							key={tab}
							className={`px-3 py-1.5 text-[12px] font-medium rounded border ${
								i === 0
									? "bg-neutral-900 text-white border-neutral-900"
									: "bg-white text-neutral-600 border-neutral-200"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Quick Chips */}
				<div className='flex items-center gap-1.5 mb-3'>
					{[
						"Intern",
						"Fresher",
						"Experienced",
						"Immediate Joiner",
						"Backup",
					].map((filter) => (
						<button
							key={filter}
							className='px-2.5 py-1 text-[11px] font-medium rounded border bg-white text-neutral-500 border-neutral-200'
						>
							{filter}
						</button>
					))}
				</div>

				{/* Toolbar */}
				<div className='flex gap-2'>
					<div className='relative flex-1 max-w-xs'>
						<Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-400' />
						<Input
							placeholder='Search by name, phone, or role...'
							className='pl-8 h-8 text-[12px] border-neutral-200'
						/>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Filter className='w-3.5 h-3.5' />
						Advanced Filters
					</Button>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Upload className='w-3.5 h-3.5' />
						Upload Candidates
					</Button>
					<Button
						size='sm'
						className='h-8 text-[12px] gap-1.5 bg-neutral-900 hover:bg-neutral-800'
					>
						<Plus className='w-3.5 h-3.5' />
						Add Candidate
					</Button>
				</div>
			</div>

			{/* Success Banner */}
			<div className='bg-emerald-50 border-b border-emerald-200 px-5 py-2'>
				<div className='flex items-center gap-2 text-[12px] text-emerald-900'>
					<CheckCircle className='w-4 h-4' />
					<span>
						Stage updated successfully. Priya Sharma moved to Technical stage
						and assigned to Rahul Verma.
					</span>
				</div>
			</div>

			{/* Table */}
			<div className='flex-1 overflow-auto'>
				<table className='w-full'>
					<thead className='sticky top-0 bg-neutral-50 border-b border-neutral-200'>
						<tr>
							<th className='w-10 px-4 py-2.5'>
								<Checkbox />
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Candidate Name
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Role
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Type
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Tags
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Total Exp
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Notice
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Expected CTC
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Stage
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Interviewer
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Resume
							</th>
							<th className='text-left px-4 py-2.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wide'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{updatedCandidates.map((candidate, index) => (
							<tr
								key={candidate.id}
								className={`border-b border-neutral-100 ${index === 0 ? "bg-emerald-50/30" : "hover:bg-neutral-50"}`}
							>
								<td className='px-4 py-2.5'>
									<Checkbox />
								</td>
								<td className='px-4 py-2.5'>
									<span className='text-[12px] text-blue-600 font-medium'>
										{candidate.name}
									</span>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.role}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.type}
								</td>
								<td className='px-4 py-2.5'>
									<div className='flex flex-wrap gap-1'>
										{candidate.tags.map((tag) => (
											<span
												key={tag}
												className='px-1.5 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] rounded border border-neutral-200'
											>
												{tag}
											</span>
										))}
									</div>
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.exp}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.notice}
								</td>
								<td className='px-4 py-2.5 text-[12px] text-neutral-700'>
									{candidate.ctc}
								</td>
								<td className='px-4 py-2.5'>
									<span
										className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${getStageColor(candidate.stage)}`}
									>
										{candidate.stage}
									</span>
								</td>
								<td className='px-4 py-2.5'>
									<span
										className={`text-[12px] ${index === 0 ? "text-emerald-700 font-medium" : "text-neutral-600"}`}
									>
										{candidate.interviewer}
									</span>
								</td>
								<td className='px-4 py-2.5'>
									<button className='text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1'>
										<File className='w-3 h-3' />
										View
									</button>
								</td>
								<td className='px-4 py-2.5'>
									<Button
										variant='ghost'
										size='sm'
										className='h-7 px-2 text-[11px] gap-1 border border-neutral-200 hover:bg-neutral-50'
									>
										Actions
										<ChevronDown className='w-3 h-3' />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Mock Data
const mockCandidates = [
	{
		id: "1",
		name: "Priya Sharma",
		role: "MERN",
		type: "Experienced",
		tags: ["Experienced"],
		exp: "3.5 years",
		notice: "30 days",
		ctc: "₹14 LPA",
		stage: "Screening",
		interviewer: "-",
	},
	{
		id: "2",
		name: "Arjun Kumar",
		role: "QA",
		type: "Fresher",
		tags: ["Fresher", "Immediate Joiner"],
		exp: "0 years",
		notice: "0 days",
		ctc: "₹6 LPA",
		stage: "New",
		interviewer: "-",
	},
	{
		id: "3",
		name: "Sneha Patel",
		role: "UI/UX",
		type: "Experienced",
		tags: ["Experienced"],
		exp: "5 years",
		notice: "60 days",
		ctc: "₹18 LPA",
		stage: "Technical",
		interviewer: "Neha Gupta",
	},
	{
		id: "4",
		name: "Rahul Singh",
		role: "Flutter",
		type: "Experienced",
		tags: ["Experienced", "Backup"],
		exp: "2 years",
		notice: "30 days",
		ctc: "₹12 LPA",
		stage: "Offer",
		interviewer: "Amit Patel",
	},
	{
		id: "5",
		name: "Ananya Desai",
		role: "MERN",
		type: "Intern",
		tags: ["Intern"],
		exp: "0 years",
		notice: "0 days",
		ctc: "₹3 LPA",
		stage: "New",
		interviewer: "-",
	},
];

function getStageColor(stage: string) {
	switch (stage) {
		case "New":
			return "bg-neutral-100 text-neutral-700 border-neutral-200";
		case "Screening":
			return "bg-blue-50 text-blue-700 border-blue-200";
		case "Technical":
			return "bg-amber-50 text-amber-700 border-amber-200";
		case "Offer":
			return "bg-emerald-50 text-emerald-700 border-emerald-200";
		case "Joined":
			return "bg-emerald-50 text-emerald-700 border-emerald-200";
		case "Rejected":
			return "bg-red-50 text-red-700 border-red-200";
		default:
			return "bg-neutral-100 text-neutral-700 border-neutral-200";
	}
}
