import { useState, useMemo, useRef, useEffect } from "react";
import {
	Search,
	Filter,
	Upload,
	Plus,
	X,
	ChevronDown,
	GitBranch,
	UserPlus,
	Calendar,
	FileText,
	XCircle,
	Mail,
	Phone,
	MapPin,
	Save,
	File,
	Download,
	CheckCircle,
	AlertCircle,
	Clock,
	ArrowLeft,
	ArrowRight,
} from "lucide-react";
import {
	candidates as initialCandidates,
	Candidate,
	users,
	jobOpenings,
} from "../data/mockData";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../components/ui/sheet";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { RichTextEditor } from "../components/RichTextEditor";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

type RoleTab = "All" | "MERN" | "QA" | "Flutter" | "UI/UX";
type QuickFilter =
	| "Intern"
	| "Fresher"
	| "Experienced"
	| "Immediate Joiner"
	| "Backup";
type SourceType = "Direct" | "Referral" | "Job Portal" | "Recruitment Agency";

type ViewState = "list" | "detail" | "resume-viewer";

export function CandidatesComplete() {
	const [viewState, setViewState] = useState<ViewState>("list");
	const [searchQuery, setSearchQuery] = useState("");
	const [roleTab, setRoleTab] = useState<RoleTab>("All");
	const [quickFilters, setQuickFilters] = useState<Set<QuickFilter>>(new Set());
	const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
	const [candidates, setCandidates] = useState(initialCandidates);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
		null,
	);
	const [activeDropdownRow, setActiveDropdownRow] = useState<string | null>(
		null,
	);

	// Inline editing state
	const [editingCell, setEditingCell] = useState<{
		id: string;
		field: string;
	} | null>(null);
	const [editValue, setEditValue] = useState<string>("");
	const [showTagInput, setShowTagInput] = useState<string | null>(null);
	const [newTagValue, setNewTagValue] = useState("");

	// Modal states
	const [showAddCandidateDrawer, setShowAddCandidateDrawer] = useState(false);
	const [showMoveStageModal, setShowMoveStageModal] = useState(false);
	const [showAssignModal, setShowAssignModal] = useState(false);
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [modalCandidate, setModalCandidate] = useState<Candidate | null>(null);

	// Filter states
	const [stageFilter, setStageFilter] = useState<string>("all");
	const [noticePeriodFilter, setNoticePeriodFilter] = useState("all");

	// Form states for modals
	const [newStage, setNewStage] = useState<Candidate["stage"]>("New");
	const [selectedInterviewer, setSelectedInterviewer] =
		useState<string>("none");
	const [interviewRound, setInterviewRound] = useState("Screening");
	const [interviewNotes, setInterviewNotes] = useState("");
	const [interviewType, setInterviewType] = useState("Screening");
	const [interviewDate, setInterviewDate] = useState("");
	const [interviewTime, setInterviewTime] = useState("");
	const [meetingLink, setMeetingLink] = useState("");
	const [rejectionReason, setRejectionReason] = useState("");

	// Detail panel tab
	const [detailTab, setDetailTab] = useState("overview");

	// Add Candidate form states
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [newCandidate, setNewCandidate] = useState({
		fullName: "",
		email: "",
		phone: "",
		role: "",
		candidateType: "Experienced" as "Intern" | "Fresher" | "Experienced",
		totalExperience: "",
		relevantExperience: "",
		noticePeriod: "30 days",
		currentCTC: "",
		expectedCTC: "",
		location: "",
		education: "",
		sourceType: "Direct" as SourceType | "",
		recruitmentCompanyName: "",
		contactPersonName: "",
		contactNumber: "",
		referrerName: "",
		referrerContact: "",
		portalName: "",
	});

	const toggleQuickFilter = (filter: QuickFilter) => {
		const newFilters = new Set(quickFilters);
		if (newFilters.has(filter)) {
			newFilters.delete(filter);
		} else {
			newFilters.add(filter);
		}
		setQuickFilters(newFilters);
	};

	// Inline editing handlers
	const startEditing = (
		candidateId: string,
		field: string,
		currentValue: string,
	) => {
		setEditingCell({ id: candidateId, field });
		setEditValue(currentValue);
	};

	const saveEdit = (candidateId: string, field: string) => {
		setCandidates((prev) =>
			prev.map((c) => {
				if (c.id === candidateId) {
					return { ...c, [field]: editValue };
				}
				return c;
			}),
		);
		setEditingCell(null);
		setEditValue("");
	};

	const cancelEdit = () => {
		setEditingCell(null);
		setEditValue("");
	};

	const updateCandidateField = (
		candidateId: string,
		field: string,
		value: any,
	) => {
		setCandidates((prev) =>
			prev.map((c) => {
				if (c.id === candidateId) {
					return { ...c, [field]: value };
				}
				return c;
			}),
		);
	};

	const addTag = (candidateId: string) => {
		if (!newTagValue.trim()) return;
		setCandidates((prev) =>
			prev.map((c) => {
				if (c.id === candidateId) {
					const currentTags = c.tags || [];
					if (!currentTags.includes(newTagValue.trim())) {
						return { ...c, tags: [...currentTags, newTagValue.trim()] };
					}
				}
				return c;
			}),
		);
		setNewTagValue("");
		setShowTagInput(null);
	};

	const removeTag = (candidateId: string, tagToRemove: string) => {
		setCandidates((prev) =>
			prev.map((c) => {
				if (c.id === candidateId) {
					return {
						...c,
						tags: (c.tags || []).filter((t) => t !== tagToRemove),
					};
				}
				return c;
			}),
		);
	};

	const filteredCandidates = useMemo(() => {
		return candidates.filter((candidate) => {
			const matchesSearch =
				candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
				candidate.phone.includes(searchQuery) ||
				candidate.email.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesRole = roleTab === "All" || candidate.role === roleTab;

			let matchesQuickFilters = true;
			if (quickFilters.size > 0) {
				matchesQuickFilters = Array.from(quickFilters).some((filter) => {
					if (filter === "Immediate Joiner") {
						return candidate.tags?.includes("Immediate Joiner");
					}
					if (filter === "Backup") {
						return candidate.tags?.includes("Backup");
					}
					return candidate.candidateType === filter;
				});
			}

			const matchesStage =
				stageFilter === "all" || candidate.stage === stageFilter;
			const matchesNoticePeriod =
				noticePeriodFilter === "all" ||
				candidate.noticePeriod === noticePeriodFilter;

			return (
				matchesSearch &&
				matchesRole &&
				matchesQuickFilters &&
				matchesStage &&
				matchesNoticePeriod
			);
		});
	}, [
		candidates,
		searchQuery,
		roleTab,
		quickFilters,
		stageFilter,
		noticePeriodFilter,
	]);

	// Auto-fill Google Meet link when schedule modal opens
	useEffect(() => {
		if (showScheduleModal && modalCandidate) {
			// Find matching job opening by role
			const matchingJob = jobOpenings.find(
				(job) =>
					modalCandidate.role.toLowerCase().includes(job.role.toLowerCase()) ||
					job.role.toLowerCase().includes(modalCandidate.role.toLowerCase()),
			);

			if (matchingJob && matchingJob.googleMeetLink) {
				setMeetingLink(matchingJob.googleMeetLink);
			} else {
				// Default to empty if no match
				setMeetingLink("");
			}
		}
	}, [showScheduleModal, modalCandidate]);

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedIds(new Set(filteredCandidates.map((c) => c.id)));
		} else {
			setSelectedIds(new Set());
		}
	};

	const handleSelectOne = (id: string, checked: boolean) => {
		const newSelected = new Set(selectedIds);
		if (checked) {
			newSelected.add(id);
		} else {
			newSelected.delete(id);
		}
		setSelectedIds(newSelected);
	};

	const addActivityLog = (
		candidateId: string,
		action: string,
		by: string = "Current User",
	) => {
		setCandidates((prev) =>
			prev.map((c) => {
				if (c.id === candidateId) {
					const newLog = {
						date: new Date().toISOString().split("T")[0],
						action,
						by,
					};
					return {
						...c,
						activityLog: [newLog, ...(c.activityLog || [])],
					};
				}
				return c;
			}),
		);
	};

	const getStageColor = (stage: string) => {
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
	};

	const handleMoveStage = () => {
		if (modalCandidate) {
			const oldStage = modalCandidate.stage;
			const updated = candidates.map((c) =>
				c.id === modalCandidate.id ? { ...c, stage: newStage } : c,
			);
			setCandidates(updated);

			addActivityLog(
				modalCandidate.id,
				`Stage changed from ${oldStage} to ${newStage}`,
			);

			if (selectedCandidate?.id === modalCandidate.id) {
				setSelectedCandidate({ ...modalCandidate, stage: newStage });
			}

			setShowMoveStageModal(false);
			setModalCandidate(null);
		}
	};

	const handleAssignInterviewer = () => {
		if (
			modalCandidate &&
			selectedInterviewer &&
			selectedInterviewer !== "none"
		) {
			const updated = candidates.map((c) =>
				c.id === modalCandidate.id
					? { ...c, interviewer: selectedInterviewer }
					: c,
			);
			setCandidates(updated);

			addActivityLog(
				modalCandidate.id,
				`Assigned to ${selectedInterviewer} for ${interviewRound} round`,
			);

			if (selectedCandidate?.id === modalCandidate.id) {
				setSelectedCandidate({
					...modalCandidate,
					interviewer: selectedInterviewer,
				});
			}

			setShowAssignModal(false);
			setModalCandidate(null);
			setSelectedInterviewer("none");
			setInterviewRound("Screening");
			setInterviewNotes("");
		}
	};

	const handleScheduleInterview = () => {
		if (modalCandidate && interviewDate && interviewTime) {
			const actualInterviewer =
				selectedInterviewer && selectedInterviewer !== "none"
					? selectedInterviewer
					: "";
			const updated = candidates.map((c) =>
				c.id === modalCandidate.id
					? {
							...c,
							interviewer: actualInterviewer || c.interviewer,
						}
					: c,
			);
			setCandidates(updated);

			addActivityLog(
				modalCandidate.id,
				`${interviewType} interview scheduled for ${interviewDate} at ${interviewTime}${actualInterviewer ? ` with ${actualInterviewer}` : ""}`,
			);

			setShowScheduleModal(false);
			setModalCandidate(null);
			setInterviewType("Screening");
			setInterviewDate("");
			setInterviewTime("");
			setMeetingLink("");
			setSelectedInterviewer("none");
		}
	};

	const handleRejectCandidate = () => {
		if (modalCandidate) {
			const updated = candidates.map((c) =>
				c.id === modalCandidate.id
					? { ...c, stage: "Rejected" as Candidate["stage"] }
					: c,
			);
			setCandidates(updated);

			addActivityLog(
				modalCandidate.id,
				`Candidate rejected${rejectionReason ? `: ${rejectionReason}` : ""}`,
			);

			if (selectedCandidate?.id === modalCandidate.id) {
				setSelectedCandidate({ ...modalCandidate, stage: "Rejected" });
			}

			setShowRejectModal(false);
			setModalCandidate(null);
			setRejectionReason("");
		}
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			setUploadedFile(file);
		} else {
			alert("Please upload a PDF file");
		}
	};

	const handleAddCandidate = () => {
		// Check for email uniqueness
		const emailExists = candidates.some(
			(c) => c.email.toLowerCase() === newCandidate.email.toLowerCase(),
		);
		if (emailExists) {
			alert(
				"A candidate with this email address already exists. Please use a different email.",
			);
			return;
		}

		let sourceDetails: Candidate["sourceDetails"] | undefined;

		if (newCandidate.sourceType) {
			sourceDetails = {
				type: newCandidate.sourceType as SourceType,
			};

			if (newCandidate.sourceType === "Recruitment Agency") {
				sourceDetails.recruitmentCompanyName =
					newCandidate.recruitmentCompanyName;
				sourceDetails.contactPersonName = newCandidate.contactPersonName;
				sourceDetails.contactNumber = newCandidate.contactNumber;
			} else if (newCandidate.sourceType === "Referral") {
				sourceDetails.referrerName = newCandidate.referrerName;
				sourceDetails.referrerContact = newCandidate.referrerContact;
			} else if (newCandidate.sourceType === "Job Portal") {
				sourceDetails.portalName = newCandidate.portalName;
			}
		}

		const candidate: Candidate = {
			id: String(candidates.length + 1),
			name: newCandidate.fullName,
			email: newCandidate.email,
			phone: newCandidate.phone,
			role: newCandidate.role,
			candidateType: newCandidate.candidateType,
			totalExperience: newCandidate.totalExperience,
			relevantExperience: newCandidate.relevantExperience,
			experience: newCandidate.totalExperience,
			noticePeriod: newCandidate.noticePeriod,
			currentCTC: newCandidate.currentCTC,
			expectedCTC: newCandidate.expectedCTC,
			location: newCandidate.location,
			tags: [newCandidate.candidateType],
			stage: "New",
			skills: [],
			education: newCandidate.education,
			appliedDate: new Date().toISOString().split("T")[0],
			sourceDetails: sourceDetails,
			resumeFileName: uploadedFile?.name,
			resumeUrl: uploadedFile ? URL.createObjectURL(uploadedFile) : undefined,
			activityLog: [
				{
					date: new Date().toISOString().split("T")[0],
					action: "Application received",
					by: "System",
				},
			],
		};

		setCandidates([...candidates, candidate]);
		setShowAddCandidateDrawer(false);

		setNewCandidate({
			fullName: "",
			email: "",
			phone: "",
			role: "",
			candidateType: "Experienced",
			totalExperience: "",
			relevantExperience: "",
			noticePeriod: "",
			currentCTC: "",
			expectedCTC: "",
			location: "",
			education: "",
			sourceType: "",
			recruitmentCompanyName: "",
			contactPersonName: "",
			contactNumber: "",
			referrerName: "",
			referrerContact: "",
			portalName: "",
		});
		setUploadedFile(null);
	};

	const handleBulkReject = () => {
		const updated = candidates.map((c) =>
			selectedIds.has(c.id)
				? { ...c, stage: "Rejected" as Candidate["stage"] }
				: c,
		);
		setCandidates(updated);

		selectedIds.forEach((id) => {
			addActivityLog(id, "Bulk rejection");
		});

		setSelectedIds(new Set());
	};

	// Bulk action handlers
	const [showBulkMoveStageModal, setShowBulkMoveStageModal] = useState(false);
	const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
	const [showBulkScheduleModal, setShowBulkScheduleModal] = useState(false);
	const [showBulkTagModal, setShowBulkTagModal] = useState(false);
	const [bulkStage, setBulkStage] = useState<Candidate["stage"]>("Screening");
	const [bulkInterviewer, setBulkInterviewer] = useState("");
	const [bulkTag, setBulkTag] = useState("");
	const [bulkInterviewDate, setBulkInterviewDate] = useState("");
	const [bulkInterviewTime, setBulkInterviewTime] = useState("");
	const [bulkInterviewType, setBulkInterviewType] = useState("Screening");

	const handleBulkMoveStage = () => {
		const updated = candidates.map((c) =>
			selectedIds.has(c.id) ? { ...c, stage: bulkStage } : c,
		);
		setCandidates(updated);

		selectedIds.forEach((id) => {
			addActivityLog(id, `Bulk stage change to ${bulkStage}`);
		});

		setSelectedIds(new Set());
		setShowBulkMoveStageModal(false);
	};

	const handleBulkAssignInterviewer = () => {
		if (bulkInterviewer) {
			const updated = candidates.map((c) =>
				selectedIds.has(c.id) ? { ...c, interviewer: bulkInterviewer } : c,
			);
			setCandidates(updated);

			selectedIds.forEach((id) => {
				addActivityLog(id, `Bulk assigned to ${bulkInterviewer}`);
			});

			setSelectedIds(new Set());
			setShowBulkAssignModal(false);
			setBulkInterviewer("");
		}
	};

	const handleBulkAddTag = () => {
		if (bulkTag.trim()) {
			const updated = candidates.map((c) => {
				if (selectedIds.has(c.id)) {
					const existingTags = c.tags || [];
					if (!existingTags.includes(bulkTag.trim())) {
						return { ...c, tags: [...existingTags, bulkTag.trim()] };
					}
				}
				return c;
			});
			setCandidates(updated);

			selectedIds.forEach((id) => {
				addActivityLog(id, `Bulk tag added: ${bulkTag.trim()}`);
			});

			setSelectedIds(new Set());
			setShowBulkTagModal(false);
			setBulkTag("");
		}
	};

	const handleBulkScheduleInterview = () => {
		if (bulkInterviewDate && bulkInterviewTime) {
			selectedIds.forEach((id) => {
				addActivityLog(
					id,
					`Bulk ${bulkInterviewType} interview scheduled for ${bulkInterviewDate} at ${bulkInterviewTime}`,
				);
			});

			setSelectedIds(new Set());
			setShowBulkScheduleModal(false);
			setBulkInterviewDate("");
			setBulkInterviewTime("");
			setBulkInterviewType("Screening");
		}
	};

	const allSelected =
		filteredCandidates.length > 0 &&
		selectedIds.size === filteredCandidates.length;
	const someSelected =
		selectedIds.size > 0 && selectedIds.size < filteredCandidates.length;

	// Render based on view state
	if (viewState === "detail" && selectedCandidate) {
		return (
			<CandidateDetailView
				candidate={selectedCandidate}
				onBack={() => {
					setViewState("list");
					setSelectedCandidate(null);
				}}
				onViewResume={() => setViewState("resume-viewer")}
				detailTab={detailTab}
				setDetailTab={setDetailTab}
				candidates={candidates}
				setCandidates={setCandidates}
				addActivityLog={addActivityLog}
			/>
		);
	}

	if (viewState === "resume-viewer" && selectedCandidate) {
		return (
			<ResumeViewerScreen
				candidate={selectedCandidate}
				onBack={() => setViewState("detail")}
			/>
		);
	}

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Header */}
			<div className='border-b border-neutral-200 px-5 py-3'>
				<div className='flex items-center justify-between mb-3'>
					<div>
						<h1 className='text-[15px] font-semibold text-neutral-900'>
							Candidates
						</h1>
						<p className='text-[11px] text-neutral-500 mt-0.5'>
							{filteredCandidates.length} candidate
							{filteredCandidates.length !== 1 ? "s" : ""}
							{selectedIds.size > 0 && ` • ${selectedIds.size} selected`}
							<span className='ml-2 text-neutral-400'>
								• Click any field to edit inline
							</span>
						</p>
					</div>
				</div>

				{/* Role Tabs */}
				<div className='flex items-center gap-1.5 mb-3'>
					{(["All", "MERN", "QA", "Flutter", "UI/UX"] as RoleTab[]).map(
						(tab) => (
							<button
								key={tab}
								onClick={() => setRoleTab(tab)}
								className={`px-3 py-1.5 text-[12px] font-medium rounded border transition-colors ${
									roleTab === tab
										? "bg-neutral-900 text-white border-neutral-900"
										: "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
								}`}
							>
								{tab}
							</button>
						),
					)}
				</div>

				{/* Quick Filter Chips */}
				<div className='flex items-center gap-1.5 mb-3'>
					{(
						[
							"Intern",
							"Fresher",
							"Experienced",
							"Immediate Joiner",
							"Backup",
						] as QuickFilter[]
					).map((filter) => (
						<button
							key={filter}
							onClick={() => toggleQuickFilter(filter)}
							className={`px-2.5 py-1 text-[11px] font-medium rounded border transition-colors ${
								quickFilters.has(filter)
									? "bg-neutral-100 text-neutral-900 border-neutral-300"
									: "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
							}`}
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
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='pl-8 h-8 text-[12px] border-neutral-200'
						/>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
						onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
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
						onClick={() => setShowAddCandidateDrawer(true)}
					>
						<Plus className='w-3.5 h-3.5' />
						Add Candidate
					</Button>
				</div>

				{/* Advanced Filters */}
				{showAdvancedFilters && (
					<div className='mt-3 p-3 bg-neutral-50 rounded border border-neutral-200'>
						<div className='grid grid-cols-4 gap-3'>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Stage
								</Label>
								<Select value={stageFilter} onValueChange={setStageFilter}>
									<SelectTrigger className='h-8 text-[12px] border-neutral-200'>
										<SelectValue placeholder='All Stages' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All Stages</SelectItem>
										<SelectItem value='New'>New</SelectItem>
										<SelectItem value='Screening'>Screening</SelectItem>
										<SelectItem value='Technical'>Technical</SelectItem>
										<SelectItem value='Offer'>Offer</SelectItem>
										<SelectItem value='Joined'>Joined</SelectItem>
										<SelectItem value='Rejected'>Rejected</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Notice Period
								</Label>
								<Select
									value={noticePeriodFilter}
									onValueChange={setNoticePeriodFilter}
								>
									<SelectTrigger className='h-8 text-[12px] border-neutral-200'>
										<SelectValue placeholder='All' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All</SelectItem>
										<SelectItem value='0 days'>Immediate</SelectItem>
										<SelectItem value='15 days'>15 days</SelectItem>
										<SelectItem value='30 days'>30 days</SelectItem>
										<SelectItem value='60 days'>60 days</SelectItem>
										<SelectItem value='90 days'>90 days</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='col-span-2 flex items-end gap-2'>
								<Button
									variant='outline'
									size='sm'
									className='h-8 text-[12px] border-neutral-200'
									onClick={() => {
										setStageFilter("all");
										setNoticePeriodFilter("all");
									}}
								>
									Reset Filters
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Bulk Actions Bar */}
			{selectedIds.size > 0 && (
				<div className='bg-blue-50 border-b border-blue-200 px-5 py-2 flex items-center gap-3'>
					<span className='text-[12px] text-blue-900 font-medium'>
						{selectedIds.size} selected
					</span>
					<div className='flex gap-1.5 ml-auto'>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
							onClick={() => setShowBulkMoveStageModal(true)}
						>
							Move Stage
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
							onClick={() => setShowBulkAssignModal(true)}
						>
							Assign Interviewer
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
							onClick={() => setShowBulkScheduleModal(true)}
						>
							Schedule Interview
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
							onClick={() => setShowBulkTagModal(true)}
						>
							Add Tag
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='h-7 text-[11px] gap-1 text-red-700 border-red-200 bg-white hover:bg-red-50'
							onClick={handleBulkReject}
						>
							Reject
						</Button>
						<Button
							variant='ghost'
							size='sm'
							className='h-7 text-[11px]'
							onClick={() => setSelectedIds(new Set())}
						>
							Clear Selection
						</Button>
					</div>
				</div>
			)}

			{/* Table */}
			<div className='flex-1 overflow-auto'>
				<table className='w-full'>
					<thead className='sticky top-0 bg-neutral-50 border-b border-neutral-200 z-10'>
						<tr>
							<th className='w-10 px-4 py-2.5'>
								<Checkbox
									checked={allSelected}
									onCheckedChange={handleSelectAll}
								/>
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
						{filteredCandidates.map((candidate) => (
							<tr
								key={candidate.id}
								className='border-b border-neutral-100 hover:bg-neutral-50 transition-colors'
							>
								<td className='px-4 py-2.5'>
									<Checkbox
										checked={selectedIds.has(candidate.id)}
										onCheckedChange={(checked) =>
											handleSelectOne(candidate.id, checked as boolean)
										}
										onClick={(e) => e.stopPropagation()}
									/>
								</td>
								<td className='px-4 py-2.5'>
									<button
										onClick={() => {
											setSelectedCandidate(candidate);
											setViewState("detail");
											setDetailTab("overview");
										}}
										className='text-[12px] text-blue-600 font-medium hover:text-blue-700 text-left truncate max-w-[150px] block'
									>
										{candidate.name}
									</button>
								</td>
								<td className='px-4 py-2.5'>
									<div className='text-[12px] text-neutral-700 truncate max-w-[120px]'>
										{candidate.role}
									</div>
								</td>
								<td className='px-4 py-2.5'>
									<Select
										value={candidate.candidateType || "Experienced"}
										onValueChange={(value) =>
											updateCandidateField(candidate.id, "candidateType", value)
										}
									>
										<SelectTrigger className='h-7 text-[11px] border-neutral-200 w-auto'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='Intern'>Intern</SelectItem>
											<SelectItem value='Fresher'>Fresher</SelectItem>
											<SelectItem value='Experienced'>Experienced</SelectItem>
										</SelectContent>
									</Select>
								</td>
								<td className='px-4 py-2.5'>
									<div className='flex gap-1 items-center'>
										{(candidate.tags || []).slice(0, 2).map((tag) => (
											<span
												key={tag}
												className='px-1.5 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] rounded border border-neutral-200 whitespace-nowrap'
											>
												{tag}
											</span>
										))}
										{(candidate.tags || []).length > 2 && (
											<span className='px-1.5 py-0.5 text-[10px] text-neutral-500 whitespace-nowrap'>
												+{(candidate.tags || []).length - 2}
											</span>
										)}
									</div>
								</td>
								<td className='px-4 py-2.5'>
									<div className='text-[12px] text-neutral-700 truncate max-w-[100px]'>
										{candidate.totalExperience}
									</div>
								</td>
								<td className='px-4 py-2.5'>
									{editingCell?.id === candidate.id &&
									editingCell?.field === "noticePeriod" ? (
										<div className='flex items-center gap-1'>
											<Input
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												className='h-7 text-[12px] w-20'
												autoFocus
												onKeyDown={(e) => {
													if (e.key === "Enter")
														saveEdit(candidate.id, "noticePeriod");
													if (e.key === "Escape") cancelEdit();
												}}
											/>
											<Button
												size='sm'
												className='h-6 w-6 p-0'
												onClick={() => saveEdit(candidate.id, "noticePeriod")}
											>
												<Save className='w-3 h-3' />
											</Button>
										</div>
									) : (
										<div
											onClick={() =>
												startEditing(
													candidate.id,
													"noticePeriod",
													candidate.noticePeriod,
												)
											}
											className='text-[12px] text-neutral-700 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded truncate max-w-[100px]'
										>
											{candidate.noticePeriod}
										</div>
									)}
								</td>
								<td className='px-4 py-2.5'>
									{editingCell?.id === candidate.id &&
									editingCell?.field === "expectedCTC" ? (
										<div className='flex items-center gap-1'>
											<Input
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												className='h-7 text-[12px] w-24'
												autoFocus
												onKeyDown={(e) => {
													if (e.key === "Enter")
														saveEdit(candidate.id, "expectedCTC");
													if (e.key === "Escape") cancelEdit();
												}}
											/>
											<Button
												size='sm'
												className='h-6 w-6 p-0'
												onClick={() => saveEdit(candidate.id, "expectedCTC")}
											>
												<Save className='w-3 h-3' />
											</Button>
										</div>
									) : (
										<div
											onClick={() =>
												startEditing(
													candidate.id,
													"expectedCTC",
													candidate.expectedCTC,
												)
											}
											className='text-[12px] text-neutral-700 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded truncate max-w-[100px]'
										>
											{candidate.expectedCTC}
										</div>
									)}
								</td>
								<td className='px-4 py-2.5'>
									<Select
										value={candidate.stage}
										onValueChange={(value) =>
											updateCandidateField(candidate.id, "stage", value)
										}
									>
										<SelectTrigger
											className={`h-7 text-[11px] font-medium border-0 w-auto inline-flex ${getStageColor(candidate.stage)}`}
										>
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
								</td>
								<td className='px-4 py-2.5'>
									<div className='text-[12px] text-neutral-700 truncate max-w-[100px]'>
										{candidate.interviewer || "-"}
									</div>
								</td>
								<td className='px-4 py-2.5'>
									{candidate.resumeFileName ? (
										<button
											onClick={() => {
												const url = `/resume-viewer?name=${encodeURIComponent(candidate.name)}&role=${encodeURIComponent(candidate.role)}`;
												window.open(url, "_blank");
											}}
											className='h-7 px-2 text-[11px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded border border-blue-200 flex items-center gap-1 transition-colors'
										>
											<File className='w-3 h-3' />
											View
										</button>
									) : (
										<span className='text-[11px] text-neutral-400'>-</span>
									)}
								</td>
								<td className='px-4 py-2.5'>
									<DropdownMenu
										open={activeDropdownRow === candidate.id}
										onOpenChange={(open) =>
											setActiveDropdownRow(open ? candidate.id : null)
										}
									>
										<DropdownMenuTrigger asChild>
											<Button
												variant='ghost'
												size='sm'
												className='h-7 px-2 text-[11px] gap-1 border border-neutral-200 hover:bg-neutral-50'
											>
												Actions
												<ChevronDown className='w-3 h-3' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end' className='w-48'>
											<DropdownMenuItem
												onClick={() => {
													setSelectedCandidate(candidate);
													setViewState("detail");
													setDetailTab("overview");
													setActiveDropdownRow(null);
												}}
											>
												<FileText className='w-3.5 h-3.5 mr-2' />
												View Candidate
											</DropdownMenuItem>
											{candidate.resumeFileName && (
												<DropdownMenuItem
													onClick={() => {
														setSelectedCandidate(candidate);
														setViewState("resume-viewer");
														setActiveDropdownRow(null);
													}}
												>
													<File className='w-3.5 h-3.5 mr-2' />
													View Resume
												</DropdownMenuItem>
											)}
											<DropdownMenuItem
												onClick={() => {
													setModalCandidate(candidate);
													setNewStage(candidate.stage);
													setShowMoveStageModal(true);
													setActiveDropdownRow(null);
												}}
											>
												<GitBranch className='w-3.5 h-3.5 mr-2' />
												Move Stage
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => {
													setModalCandidate(candidate);
													setShowAssignModal(true);
													setActiveDropdownRow(null);
												}}
											>
												<UserPlus className='w-3.5 h-3.5 mr-2' />
												Assign Interviewer
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => {
													setModalCandidate(candidate);
													setShowScheduleModal(true);
													setActiveDropdownRow(null);
												}}
											>
												<Calendar className='w-3.5 h-3.5 mr-2' />
												Schedule Interview
											</DropdownMenuItem>
											<DropdownMenuItem
												className='text-red-600'
												onClick={() => {
													setModalCandidate(candidate);
													setShowRejectModal(true);
													setActiveDropdownRow(null);
												}}
											>
												<XCircle className='w-3.5 h-3.5 mr-2' />
												Reject Candidate
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{filteredCandidates.length === 0 && (
					<div className='py-16 text-center text-neutral-500 text-[12px]'>
						No candidates found
					</div>
				)}
			</div>

			{/* Add Candidate Drawer */}
			<Sheet
				open={showAddCandidateDrawer}
				onOpenChange={setShowAddCandidateDrawer}
			>
				<SheetContent className='w-[600px] sm:max-w-[600px] flex flex-col p-0'>
					<div className='px-6 py-4 border-b border-neutral-200'>
						<SheetHeader>
							<SheetTitle className='text-[15px]'>Add Candidate</SheetTitle>
							<SheetDescription className='text-[12px]'>
								Enter candidate details to add to the system
							</SheetDescription>
						</SheetHeader>
					</div>

					<div className='flex-1 overflow-y-auto px-6 py-4 space-y-3.5'>
						<div>
							<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
								Full Name *
							</Label>
							<Input
								value={newCandidate.fullName}
								onChange={(e) =>
									setNewCandidate({ ...newCandidate, fullName: e.target.value })
								}
								className='h-9 text-[13px] border-neutral-200'
								placeholder='Enter full name'
							/>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Email *
								</Label>
								<Input
									type='email'
									value={newCandidate.email}
									onChange={(e) =>
										setNewCandidate({ ...newCandidate, email: e.target.value })
									}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='email@example.com'
								/>
							</div>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Phone *
								</Label>
								<Input
									value={newCandidate.phone}
									onChange={(e) =>
										setNewCandidate({ ...newCandidate, phone: e.target.value })
									}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='+91 XXXXX XXXXX'
								/>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Role Applied *
								</Label>
								<Select
									value={newCandidate.role}
									onValueChange={(value) =>
										setNewCandidate({ ...newCandidate, role: value })
									}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue placeholder='Select role' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='MERN'>MERN</SelectItem>
										<SelectItem value='QA'>QA</SelectItem>
										<SelectItem value='Flutter'>Flutter</SelectItem>
										<SelectItem value='UI/UX'>UI/UX</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Candidate Type *
								</Label>
								<Select
									value={newCandidate.candidateType}
									onValueChange={(
										value: "Intern" | "Fresher" | "Experienced",
									) =>
										setNewCandidate({ ...newCandidate, candidateType: value })
									}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Intern'>Intern</SelectItem>
										<SelectItem value='Fresher'>Fresher</SelectItem>
										<SelectItem value='Experienced'>Experienced</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Total Experience
								</Label>
								<Input
									value={newCandidate.totalExperience}
									onChange={(e) =>
										setNewCandidate({
											...newCandidate,
											totalExperience: e.target.value,
										})
									}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='e.g., 3 years'
								/>
							</div>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Relevant Experience
								</Label>
								<Input
									value={newCandidate.relevantExperience}
									onChange={(e) =>
										setNewCandidate({
											...newCandidate,
											relevantExperience: e.target.value,
										})
									}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='e.g., 2 years'
								/>
							</div>
						</div>

						<div>
							<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
								Notice Period
							</Label>
							<Select
								value={newCandidate.noticePeriod}
								onValueChange={(value) =>
									setNewCandidate({ ...newCandidate, noticePeriod: value })
								}
							>
								<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
									<SelectValue placeholder='Select notice period' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='0 days'>Immediate</SelectItem>
									<SelectItem value='15 days'>15 days</SelectItem>
									<SelectItem value='30 days'>30 days</SelectItem>
									<SelectItem value='60 days'>60 days</SelectItem>
									<SelectItem value='90 days'>90 days</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Current CTC
								</Label>
								<Input
									value={newCandidate.currentCTC}
									onChange={(e) =>
										setNewCandidate({
											...newCandidate,
											currentCTC: e.target.value,
										})
									}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='e.g., ₹12 LPA'
								/>
							</div>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Expected CTC
								</Label>
								<Input
									value={newCandidate.expectedCTC}
									onChange={(e) =>
										setNewCandidate({
											...newCandidate,
											expectedCTC: e.target.value,
										})
									}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='e.g., ₹15 LPA'
								/>
							</div>
						</div>

						<div>
							<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
								Location
							</Label>
							<Input
								value={newCandidate.location}
								onChange={(e) =>
									setNewCandidate({ ...newCandidate, location: e.target.value })
								}
								className='h-9 text-[13px] border-neutral-200'
								placeholder='e.g., Bangalore'
							/>
						</div>
						<div>
							<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
								Education
							</Label>
							<Input
								value={newCandidate.education}
								onChange={(e) =>
									setNewCandidate({
										...newCandidate,
										education: e.target.value,
									})
								}
								className='h-9 text-[13px] border-neutral-200'
								placeholder='e.g., Bachelor of Engineering'
							/>
						</div>

						<div>
							<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
								Source
							</Label>
							<Select
								value={newCandidate.sourceType}
								onValueChange={(value: SourceType) =>
									setNewCandidate({ ...newCandidate, sourceType: value })
								}
							>
								<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
									<SelectValue placeholder='Select source' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Direct'>Direct</SelectItem>
									<SelectItem value='Referral'>Referral</SelectItem>
									<SelectItem value='Job Portal'>Job Portal</SelectItem>
									<SelectItem value='Recruitment Agency'>
										Recruitment Agency
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{newCandidate.sourceType === "Recruitment Agency" && (
							<div className='space-y-3 p-3 bg-neutral-50 rounded border border-neutral-200'>
								<h4 className='text-[12px] font-semibold text-neutral-900'>
									Recruitment Agency Details
								</h4>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
										Company Name
									</Label>
									<Input
										value={newCandidate.recruitmentCompanyName}
										onChange={(e) =>
											setNewCandidate({
												...newCandidate,
												recruitmentCompanyName: e.target.value,
											})
										}
										className='h-9 text-[13px] border-neutral-200'
										placeholder='Agency name'
									/>
								</div>
								<div className='grid grid-cols-2 gap-3'>
									<div>
										<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
											Contact Person
										</Label>
										<Input
											value={newCandidate.contactPersonName}
											onChange={(e) =>
												setNewCandidate({
													...newCandidate,
													contactPersonName: e.target.value,
												})
											}
											className='h-9 text-[13px] border-neutral-200'
											placeholder='Person name'
										/>
									</div>
									<div>
										<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
											Contact Number
										</Label>
										<Input
											value={newCandidate.contactNumber}
											onChange={(e) =>
												setNewCandidate({
													...newCandidate,
													contactNumber: e.target.value,
												})
											}
											className='h-9 text-[13px] border-neutral-200'
											placeholder='Phone number'
										/>
									</div>
								</div>
							</div>
						)}

						{newCandidate.sourceType === "Referral" && (
							<div className='space-y-3 p-3 bg-neutral-50 rounded border border-neutral-200'>
								<h4 className='text-[12px] font-semibold text-neutral-900'>
									Referral Details
								</h4>
								<div className='grid grid-cols-2 gap-3'>
									<div>
										<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
											Referrer Name
										</Label>
										<Input
											value={newCandidate.referrerName}
											onChange={(e) =>
												setNewCandidate({
													...newCandidate,
													referrerName: e.target.value,
												})
											}
											className='h-9 text-[13px] border-neutral-200'
											placeholder='Referrer name'
										/>
									</div>
									<div>
										<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
											Referrer Contact
										</Label>
										<Input
											value={newCandidate.referrerContact}
											onChange={(e) =>
												setNewCandidate({
													...newCandidate,
													referrerContact: e.target.value,
												})
											}
											className='h-9 text-[13px] border-neutral-200'
											placeholder='Contact number'
										/>
									</div>
								</div>
							</div>
						)}

						{newCandidate.sourceType === "Job Portal" && (
							<div className='space-y-3 p-3 bg-neutral-50 rounded border border-neutral-200'>
								<h4 className='text-[12px] font-semibold text-neutral-900'>
									Job Portal Details
								</h4>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
										Portal Name
									</Label>
									<Select
										value={newCandidate.portalName}
										onValueChange={(value) =>
											setNewCandidate({ ...newCandidate, portalName: value })
										}
									>
										<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
											<SelectValue placeholder='Select portal' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='LinkedIn'>LinkedIn</SelectItem>
											<SelectItem value='Naukri'>Naukri</SelectItem>
											<SelectItem value='Indeed'>Indeed</SelectItem>
											<SelectItem value='Monster'>Monster</SelectItem>
											<SelectItem value='Glassdoor'>Glassdoor</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						)}

						<div>
							<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
								Resume Upload (PDF)
							</Label>
							<div className='space-y-2'>
								<input
									ref={fileInputRef}
									type='file'
									accept='.pdf'
									onChange={handleFileUpload}
									className='hidden'
								/>
								<Button
									type='button'
									variant='outline'
									size='sm'
									className='w-full h-9 text-[13px] border-neutral-200'
									onClick={() => fileInputRef.current?.click()}
								>
									<Upload className='w-3.5 h-3.5 mr-2' />
									Choose File
								</Button>
								{uploadedFile && (
									<div className='flex items-center justify-between p-2 bg-neutral-50 rounded border border-neutral-200'>
										<div className='flex items-center gap-2'>
											<File className='w-4 h-4 text-blue-600' />
											<span className='text-[12px] text-neutral-900'>
												{uploadedFile.name}
											</span>
										</div>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-6 px-2 text-[11px]'
											onClick={() => setUploadedFile(null)}
										>
											Remove
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='px-6 py-4 border-t border-neutral-200 bg-white'>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-9 text-[13px] border-neutral-200'
								onClick={() => {
									setShowAddCandidateDrawer(false);
									setUploadedFile(null);
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleAddCandidate}
								disabled={
									!newCandidate.fullName ||
									!newCandidate.email ||
									!newCandidate.phone ||
									!newCandidate.role
								}
							>
								<Save className='w-3.5 h-3.5 mr-1.5' />
								Save Candidate
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			{/* Move Stage Modal */}
			{showMoveStageModal && modalCandidate && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
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
									{modalCandidate.name}
								</div>
								<div className='text-[11px] text-neutral-500'>
									{modalCandidate.role}
								</div>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-1.5 block'>
									Current Stage
								</Label>
								<div
									className={`inline-block px-2 py-1 rounded text-[11px] font-medium border ${getStageColor(modalCandidate.stage)}`}
								>
									{modalCandidate.stage}
								</div>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									New Stage *
								</Label>
								<Select
									value={newStage}
									onValueChange={(v) => setNewStage(v as Candidate["stage"])}
								>
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
								onClick={() => {
									setShowMoveStageModal(false);
									setModalCandidate(null);
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleMoveStage}
							>
								Apply
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Assign Interviewer Modal */}
			{showAssignModal && modalCandidate && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
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
									{modalCandidate.name}
								</div>
								<div className='text-[11px] text-neutral-500'>
									{modalCandidate.role} • {modalCandidate.stage}
								</div>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Select Interviewer *
								</Label>
								<Select
									value={selectedInterviewer}
									onValueChange={setSelectedInterviewer}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue placeholder='Choose interviewer' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='none'>Select an interviewer</SelectItem>
										{users
											.filter((u) => u.status === "Active")
											.map((user) => (
												<SelectItem key={user.id} value={user.name}>
													{user.name} ({user.role})
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Interview Round *
								</Label>
								<Select
									value={interviewRound}
									onValueChange={setInterviewRound}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Screening'>Screening Round</SelectItem>
										<SelectItem value='Technical'>Technical Round</SelectItem>
										<SelectItem value='Final'>Final Round</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Notes (Optional)
								</Label>
								<Textarea
									value={interviewNotes}
									onChange={(e) => setInterviewNotes(e.target.value)}
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
								onClick={() => {
									setShowAssignModal(false);
									setModalCandidate(null);
									setSelectedInterviewer("none");
									setInterviewRound("Screening");
									setInterviewNotes("");
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleAssignInterviewer}
								disabled={
									!selectedInterviewer || selectedInterviewer === "none"
								}
							>
								Assign
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Schedule Interview Modal */}
			{showScheduleModal && modalCandidate && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
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
									{modalCandidate.name}
								</div>
								<div className='text-[11px] text-neutral-500'>
									{modalCandidate.role}
								</div>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Interview Type *
								</Label>
								<Select value={interviewType} onValueChange={setInterviewType}>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Screening'>
											Screening Interview
										</SelectItem>
										<SelectItem value='Technical'>
											Technical Interview
										</SelectItem>
										<SelectItem value='Final'>Final Round Interview</SelectItem>
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
										value={interviewDate}
										onChange={(e) => setInterviewDate(e.target.value)}
										className='h-9 text-[13px] border-neutral-200'
										min={new Date().toISOString().split("T")[0]}
									/>
								</div>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-2 block'>
										Time *
									</Label>
									<Input
										type='time'
										value={interviewTime}
										onChange={(e) => setInterviewTime(e.target.value)}
										className='h-9 text-[13px] border-neutral-200'
									/>
								</div>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Interviewer
								</Label>
								<Select
									value={selectedInterviewer}
									onValueChange={setSelectedInterviewer}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue placeholder='Choose interviewer (optional)' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='none'>No interviewer</SelectItem>
										{users
											.filter((u) => u.status === "Active")
											.map((user) => (
												<SelectItem key={user.id} value={user.name}>
													{user.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Meeting Link or Location
								</Label>
								<Input
									value={meetingLink}
									onChange={(e) => setMeetingLink(e.target.value)}
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
								onClick={() => {
									setShowScheduleModal(false);
									setModalCandidate(null);
									setInterviewType("Screening");
									setInterviewDate("");
									setInterviewTime("");
									setMeetingLink("");
									setSelectedInterviewer("none");
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleScheduleInterview}
								disabled={!interviewDate || !interviewTime}
							>
								Schedule
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Reject Candidate Modal */}
			{showRejectModal && modalCandidate && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
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
									{modalCandidate.name}
								</div>
								<div className='text-[11px] text-neutral-500'>
									{modalCandidate.role} • Current Stage: {modalCandidate.stage}
								</div>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Rejection Reason (Optional)
								</Label>
								<Textarea
									value={rejectionReason}
									onChange={(e) => setRejectionReason(e.target.value)}
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
								onClick={() => {
									setShowRejectModal(false);
									setModalCandidate(null);
									setRejectionReason("");
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-red-600 hover:bg-red-700 text-white'
								onClick={handleRejectCandidate}
							>
								Confirm Reject
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Bulk Move Stage Modal */}
			{showBulkMoveStageModal && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[400px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Bulk Move Stage
						</h3>
						<div className='space-y-3 mb-5'>
							<div>
								<p className='text-[12px] text-neutral-600 mb-3'>
									Move <strong>{selectedIds.size} candidate(s)</strong> to a new
									stage
								</p>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Select Stage
								</Label>
								<Select
									value={bulkStage}
									onValueChange={(value) =>
										setBulkStage(value as Candidate["stage"])
									}
								>
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
								onClick={() => setShowBulkMoveStageModal(false)}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleBulkMoveStage}
							>
								Move Stage
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Bulk Assign Interviewer Modal */}
			{showBulkAssignModal && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[400px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Bulk Assign Interviewer
						</h3>
						<div className='space-y-3 mb-5'>
							<div>
								<p className='text-[12px] text-neutral-600 mb-3'>
									Assign interviewer to{" "}
									<strong>{selectedIds.size} candidate(s)</strong>
								</p>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Select Interviewer
								</Label>
								<Select
									value={bulkInterviewer}
									onValueChange={setBulkInterviewer}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue placeholder='Choose interviewer' />
									</SelectTrigger>
									<SelectContent>
										{users
											.filter((u) => u.status === "Active")
											.map((user) => (
												<SelectItem key={user.id} value={user.name}>
													{user.name} ({user.role})
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-9 text-[13px] border-neutral-200'
								onClick={() => {
									setShowBulkAssignModal(false);
									setBulkInterviewer("");
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleBulkAssignInterviewer}
								disabled={!bulkInterviewer}
							>
								Assign
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Bulk Add Tag Modal */}
			{showBulkTagModal && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[400px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Bulk Add Tag
						</h3>
						<div className='space-y-3 mb-5'>
							<div>
								<p className='text-[12px] text-neutral-600 mb-3'>
									Add tag to <strong>{selectedIds.size} candidate(s)</strong>
								</p>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Tag Name
								</Label>
								<Input
									value={bulkTag}
									onChange={(e) => setBulkTag(e.target.value)}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='e.g., High Priority, Remote Only'
									onKeyDown={(e) => {
										if (e.key === "Enter") handleBulkAddTag();
									}}
								/>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-9 text-[13px] border-neutral-200'
								onClick={() => {
									setShowBulkTagModal(false);
									setBulkTag("");
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleBulkAddTag}
								disabled={!bulkTag.trim()}
							>
								Add Tag
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Bulk Schedule Interview Modal */}
			{showBulkScheduleModal && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[480px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Bulk Schedule Interview
						</h3>
						<div className='space-y-3 mb-5'>
							<div>
								<p className='text-[12px] text-neutral-600 mb-3'>
									Schedule interview for{" "}
									<strong>{selectedIds.size} candidate(s)</strong>
								</p>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Interview Type
								</Label>
								<Select
									value={bulkInterviewType}
									onValueChange={setBulkInterviewType}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Screening'>Screening Round</SelectItem>
										<SelectItem value='Technical'>Technical Round</SelectItem>
										<SelectItem value='Final'>Final Round</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='grid grid-cols-2 gap-3'>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-2 block'>
										Date
									</Label>
									<Input
										type='date'
										value={bulkInterviewDate}
										onChange={(e) => setBulkInterviewDate(e.target.value)}
										className='h-9 text-[13px] border-neutral-200'
									/>
								</div>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-2 block'>
										Time
									</Label>
									<Input
										type='time'
										value={bulkInterviewTime}
										onChange={(e) => setBulkInterviewTime(e.target.value)}
										className='h-9 text-[13px] border-neutral-200'
									/>
								</div>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-9 text-[13px] border-neutral-200'
								onClick={() => {
									setShowBulkScheduleModal(false);
									setBulkInterviewDate("");
									setBulkInterviewTime("");
									setBulkInterviewType("Screening");
								}}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='flex-1 h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleBulkScheduleInterview}
								disabled={!bulkInterviewDate || !bulkInterviewTime}
							>
								Schedule
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
interface CandidateDetailViewProps {
	candidate: Candidate;
	onBack: () => void;
	onViewResume: () => void;
	detailTab: string;
	setDetailTab: (tab: string) => void;
	candidates: Candidate[];
	setCandidates: (candidates: Candidate[]) => void;
	addActivityLog: (id: string, action: string, by?: string) => void;
}

function CandidateDetailView(props: CandidateDetailViewProps) {
	const { candidate, onBack, onViewResume, detailTab, setDetailTab } = props;

	const stages: Candidate["stage"][] = [
		"New",
		"Screening",
		"Technical",
		"Offer",
		"Joined",
	];
	const currentStageIndex = stages.indexOf(candidate.stage);

	// Add state for resume editing
	const resumeFileInputRef = useRef<HTMLInputElement>(null);
	const [isReplacingResume, setIsReplacingResume] = useState(false);

	// Add state for tag editing
	const [showTagInput, setShowTagInput] = useState(false);
	const [newTagValue, setNewTagValue] = useState("");

	// Add state for inline field editing
	const [editingField, setEditingField] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	// Add state for modals
	const [showMoveStageModal, setShowMoveStageModal] = useState(false);
	const [showAssignModal, setShowAssignModal] = useState(false);
	const [newStage, setNewStage] = useState(candidate.stage);
	const [newInterviewer, setNewInterviewer] = useState(
		candidate.interviewer || "",
	);

	// Handle field editing
	const startEditing = (field: string, currentValue: string) => {
		setEditingField(field);
		setEditValue(currentValue);
	};

	const saveField = (field: keyof Candidate) => {
		const updatedCandidates = props.candidates.map((c) =>
			c.id === candidate.id ? { ...c, [field]: editValue } : c,
		);
		props.setCandidates(updatedCandidates);
		props.addActivityLog(
			candidate.id,
			`${field} updated to: ${editValue}`,
			"Admin",
		);
		setEditingField(null);
		setEditValue("");
	};

	const cancelEditing = () => {
		setEditingField(null);
		setEditValue("");
	};

	// Handle stage change
	const handleMoveStage = () => {
		const updatedCandidates = props.candidates.map((c) =>
			c.id === candidate.id ? { ...c, stage: newStage } : c,
		);
		props.setCandidates(updatedCandidates);
		props.addActivityLog(
			candidate.id,
			`Stage changed to: ${newStage}`,
			"Admin",
		);
		setShowMoveStageModal(false);
	};

	// Handle assign interviewer
	const handleAssignInterviewer = () => {
		const updatedCandidates = props.candidates.map((c) =>
			c.id === candidate.id ? { ...c, interviewer: newInterviewer } : c,
		);
		props.setCandidates(updatedCandidates);
		props.addActivityLog(
			candidate.id,
			`Interviewer assigned: ${newInterviewer}`,
			"Admin",
		);
		setShowAssignModal(false);
	};

	// Move to next stage
	const moveToNextStage = () => {
		const currentIndex = stages.indexOf(candidate.stage);
		if (currentIndex < stages.length - 1) {
			const nextStage = stages[currentIndex + 1];
			const updatedCandidates = props.candidates.map((c) =>
				c.id === candidate.id ? { ...c, stage: nextStage } : c,
			);
			props.setCandidates(updatedCandidates);
			props.addActivityLog(
				candidate.id,
				`Moved to ${nextStage} stage`,
				"Admin",
			);
		}
	};

	// Handle resume replacement
	const handleReplaceResume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			const updatedCandidates = props.candidates.map((c) =>
				c.id === candidate.id
					? {
							...c,
							resumeFileName: file.name,
							resumeUrl: URL.createObjectURL(file),
						}
					: c,
			);
			props.setCandidates(updatedCandidates);
			props.addActivityLog(
				candidate.id,
				`Resume updated: ${file.name}`,
				"Admin",
			);
			setIsReplacingResume(false);

			// Reset file input
			if (resumeFileInputRef.current) {
				resumeFileInputRef.current.value = "";
			}
		} else {
			alert("Please upload a PDF file");
		}
	};

	// Handle tag management
	const addTag = () => {
		if (newTagValue.trim()) {
			const updatedCandidates = props.candidates.map((c) =>
				c.id === candidate.id
					? { ...c, tags: [...(c.tags || []), newTagValue.trim()] }
					: c,
			);
			props.setCandidates(updatedCandidates);
			props.addActivityLog(
				candidate.id,
				`Tag added: ${newTagValue.trim()}`,
				"Admin",
			);
			setNewTagValue("");
			setShowTagInput(false);
		}
	};

	const removeTag = (tagToRemove: string) => {
		const updatedCandidates = props.candidates.map((c) =>
			c.id === candidate.id
				? { ...c, tags: (c.tags || []).filter((tag) => tag !== tagToRemove) }
				: c,
		);
		props.setCandidates(updatedCandidates);
		props.addActivityLog(candidate.id, `Tag removed: ${tagToRemove}`, "Admin");
	};

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
						<p className='text-[12px] text-neutral-600'>{candidate.role}</p>
					</div>
					<div>
						<span
							className={`inline-block px-2.5 py-1 rounded text-[11px] font-medium border ${
								candidate.stage === "New"
									? "bg-neutral-100 text-neutral-700 border-neutral-200"
									: candidate.stage === "Screening"
										? "bg-blue-50 text-blue-700 border-blue-200"
										: candidate.stage === "Technical"
											? "bg-amber-50 text-amber-700 border-amber-200"
											: candidate.stage === "Offer"
												? "bg-emerald-50 text-emerald-700 border-emerald-200"
												: candidate.stage === "Joined"
													? "bg-emerald-50 text-emerald-700 border-emerald-200"
													: "bg-red-50 text-red-700 border-red-200"
							}`}
						>
							{candidate.stage}
						</span>
					</div>
				</div>

				{/* Key Info */}
				<div className='grid grid-cols-4 gap-4 text-[12px] p-3 bg-neutral-50 rounded border border-neutral-200'>
					<div>
						<div className='text-neutral-500 mb-0.5'>Total Experience</div>
						<div className='text-neutral-900 font-medium'>
							{candidate.totalExperience}
						</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Notice Period</div>
						<div className='text-neutral-900 font-medium'>
							{candidate.noticePeriod}
						</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Expected CTC</div>
						<div className='text-neutral-900 font-medium'>
							{candidate.expectedCTC}
						</div>
					</div>
					<div>
						<div className='text-neutral-500 mb-0.5'>Location</div>
						<div className='text-neutral-900 font-medium'>
							{candidate.location}
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className='mt-3 flex items-center gap-2'>
					{candidate.stage !== "Joined" && candidate.stage !== "Rejected" && (
						<Button
							size='sm'
							className='h-8 text-[12px] gap-1.5 bg-neutral-900 hover:bg-neutral-800'
							onClick={moveToNextStage}
							disabled={currentStageIndex >= stages.length - 1}
						>
							<ArrowRight className='w-3.5 h-3.5' />
							Move to Next Stage
						</Button>
					)}
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
						onClick={() => setShowMoveStageModal(true)}
					>
						<GitBranch className='w-3.5 h-3.5' />
						Change Stage
					</Button>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
						onClick={() => setShowAssignModal(true)}
					>
						<UserPlus className='w-3.5 h-3.5' />
						Assign Interviewer
					</Button>
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-[12px] gap-1.5 border-neutral-200'
					>
						<Mail className='w-3.5 h-3.5' />
						Send Email
					</Button>
					{candidate.stage !== "Rejected" && (
						<Button
							variant='outline'
							size='sm'
							className='h-8 text-[12px] gap-1.5 text-red-700 border-red-200 hover:bg-red-50 ml-auto'
							onClick={() => {
								const updatedCandidates = props.candidates.map((c) =>
									c.id === candidate.id ? { ...c, stage: "Rejected" } : c,
								);
								props.setCandidates(updatedCandidates);
								props.addActivityLog(
									candidate.id,
									"Candidate rejected",
									"Admin",
								);
							}}
						>
							<X className='w-3.5 h-3.5' />
							Reject
						</Button>
					)}
				</div>
			</div>

			{/* Stage Tracker */}
			{candidate.stage !== "Rejected" && (
				<div className='px-5 py-4 border-b border-neutral-200 bg-neutral-50'>
					<h4 className='text-[10px] font-semibold text-neutral-600 uppercase tracking-wide mb-3'>
						Stage Progression
					</h4>
					<div className='flex items-center'>
						{stages.map((stage, index) => {
							const isActive = index <= currentStageIndex;
							const isCurrent = stage === candidate.stage;
							const isCompleted = index < currentStageIndex;

							return (
								<div key={stage} className='flex items-center flex-1'>
									<div className='flex flex-col items-center gap-1.5 flex-1'>
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold border-2 transition-all ${
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
											className={`text-[10px] font-medium text-center ${
												isCurrent ? "text-neutral-900" : "text-neutral-500"
											}`}
										>
											{stage}
										</span>
									</div>
									{index < stages.length - 1 && (
										<div
											className={`h-0.5 w-full -mt-4 ${
												isCompleted
													? "bg-emerald-500"
													: isActive
														? "bg-neutral-200"
														: "bg-neutral-100"
											}`}
										/>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* Tabs */}
			<div className='flex-1 overflow-hidden flex flex-col'>
				<div className='border-b border-neutral-200 px-5'>
					<div className='flex gap-1'>
						{[
							"overview",
							"resume",
							"screening",
							"technical",
							"offer",
							"activity",
						].map((tab) => (
							<button
								key={tab}
								onClick={() => setDetailTab(tab)}
								className={`px-4 py-2.5 text-[12px] font-medium border-b-2 transition-colors ${
									detailTab === tab
										? "border-neutral-900 text-neutral-900"
										: "border-transparent text-neutral-500 hover:text-neutral-700"
								}`}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</div>
				</div>

				<div className='flex-1 overflow-y-auto p-5'>
					{detailTab === "overview" && (
						<div className='space-y-4 max-w-2xl'>
							<div className='p-3 bg-blue-50 rounded border border-blue-200'>
								<p className='text-[11px] text-blue-900'>
									<strong>Tip:</strong> Click on any field to edit it inline.
									Changes are saved automatically.
								</p>
							</div>
							<div>
								<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
									Contact Information
								</h4>
								<div className='space-y-2 text-[12px]'>
									<div className='flex items-center gap-2'>
										<Mail className='w-3.5 h-3.5 text-neutral-400' />
										{editingField === "email" ? (
											<div className='flex items-center gap-1.5 flex-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("email");
														if (e.key === "Escape") cancelEditing();
													}}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={() => saveField("email")}
												>
													<Save className='w-3 h-3' />
												</Button>
												<Button
													variant='outline'
													size='sm'
													className='h-7 w-7 p-0'
													onClick={cancelEditing}
												>
													<X className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<span
												className='text-neutral-900 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded flex-1'
												onClick={() => startEditing("email", candidate.email)}
											>
												{candidate.email}
											</span>
										)}
									</div>
									<div className='flex items-center gap-2'>
										<Phone className='w-3.5 h-3.5 text-neutral-400' />
										{editingField === "phone" ? (
											<div className='flex items-center gap-1.5 flex-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("phone");
														if (e.key === "Escape") cancelEditing();
													}}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={() => saveField("phone")}
												>
													<Save className='w-3 h-3' />
												</Button>
												<Button
													variant='outline'
													size='sm'
													className='h-7 w-7 p-0'
													onClick={cancelEditing}
												>
													<X className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<span
												className='text-neutral-900 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded flex-1'
												onClick={() => startEditing("phone", candidate.phone)}
											>
												{candidate.phone}
											</span>
										)}
									</div>
									<div className='flex items-center gap-2'>
										<MapPin className='w-3.5 h-3.5 text-neutral-400' />
										{editingField === "location" ? (
											<div className='flex items-center gap-1.5 flex-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("location");
														if (e.key === "Escape") cancelEditing();
													}}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={() => saveField("location")}
												>
													<Save className='w-3 h-3' />
												</Button>
												<Button
													variant='outline'
													size='sm'
													className='h-7 w-7 p-0'
													onClick={cancelEditing}
												>
													<X className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<span
												className='text-neutral-900 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded flex-1'
												onClick={() =>
													startEditing("location", candidate.location)
												}
											>
												{candidate.location}
											</span>
										)}
									</div>
								</div>
							</div>

							<div>
								<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
									Experience
								</h4>
								<div className='grid grid-cols-2 gap-3 text-[12px]'>
									<div
										className='p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-100'
										onClick={() =>
											startEditing("totalExperience", candidate.totalExperience)
										}
									>
										<div className='text-neutral-500 mb-0.5'>
											Total Experience
										</div>
										{editingField === "totalExperience" ? (
											<div className='flex items-center gap-1.5 mt-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("totalExperience");
														if (e.key === "Escape") cancelEditing();
													}}
													onClick={(e) => e.stopPropagation()}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={(e) => {
														e.stopPropagation();
														saveField("totalExperience");
													}}
												>
													<Save className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<div className='text-neutral-900 font-medium'>
												{candidate.totalExperience}
											</div>
										)}
									</div>
									<div
										className='p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-100'
										onClick={() =>
											startEditing(
												"relevantExperience",
												candidate.relevantExperience,
											)
										}
									>
										<div className='text-neutral-500 mb-0.5'>
											Relevant Experience
										</div>
										{editingField === "relevantExperience" ? (
											<div className='flex items-center gap-1.5 mt-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter")
															saveField("relevantExperience");
														if (e.key === "Escape") cancelEditing();
													}}
													onClick={(e) => e.stopPropagation()}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={(e) => {
														e.stopPropagation();
														saveField("relevantExperience");
													}}
												>
													<Save className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<div className='text-neutral-900 font-medium'>
												{candidate.relevantExperience}
											</div>
										)}
									</div>
								</div>
							</div>

							<div>
								<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
									Notice Period
								</h4>
								<div className='grid grid-cols-2 gap-3 text-[12px]'>
									<div
										className='p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-100'
										onClick={() =>
											startEditing("noticePeriod", candidate.noticePeriod)
										}
									>
										<div className='text-neutral-500 mb-0.5'>Notice Period</div>
										{editingField === "noticePeriod" ? (
											<div className='flex items-center gap-1.5 mt-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("noticePeriod");
														if (e.key === "Escape") cancelEditing();
													}}
													onClick={(e) => e.stopPropagation()}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={(e) => {
														e.stopPropagation();
														saveField("noticePeriod");
													}}
												>
													<Save className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<div className='text-neutral-900 font-medium'>
												{candidate.noticePeriod}
											</div>
										)}
									</div>
								</div>
							</div>

							<div>
								<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
									Compensation
								</h4>
								<div className='grid grid-cols-2 gap-3 text-[12px]'>
									<div
										className='p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-100'
										onClick={() =>
											startEditing("currentCTC", candidate.currentCTC)
										}
									>
										<div className='text-neutral-500 mb-0.5'>Current CTC</div>
										{editingField === "currentCTC" ? (
											<div className='flex items-center gap-1.5 mt-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("currentCTC");
														if (e.key === "Escape") cancelEditing();
													}}
													onClick={(e) => e.stopPropagation()}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={(e) => {
														e.stopPropagation();
														saveField("currentCTC");
													}}
												>
													<Save className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<div className='text-neutral-900 font-medium'>
												{candidate.currentCTC}
											</div>
										)}
									</div>
									<div
										className='p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-100'
										onClick={() =>
											startEditing("expectedCTC", candidate.expectedCTC)
										}
									>
										<div className='text-neutral-500 mb-0.5'>Expected CTC</div>
										{editingField === "expectedCTC" ? (
											<div className='flex items-center gap-1.5 mt-1'>
												<Input
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='h-7 text-[12px]'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === "Enter") saveField("expectedCTC");
														if (e.key === "Escape") cancelEditing();
													}}
													onClick={(e) => e.stopPropagation()}
												/>
												<Button
													size='sm'
													className='h-7 w-7 p-0'
													onClick={(e) => {
														e.stopPropagation();
														saveField("expectedCTC");
													}}
												>
													<Save className='w-3 h-3' />
												</Button>
											</div>
										) : (
											<div className='text-neutral-900 font-medium'>
												{candidate.expectedCTC}
											</div>
										)}
									</div>
								</div>
							</div>

							{candidate.skills && candidate.skills.length > 0 && (
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
							)}

							{candidate.education && (
								<div>
									<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
										Education
									</h4>
									<div className='text-[12px] text-neutral-900'>
										{candidate.education}
									</div>
								</div>
							)}

							<div>
								<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
									Tags
								</h4>
								<div className='flex flex-wrap gap-1.5 items-center'>
									{(candidate.tags || []).map((tag) => (
										<span
											key={tag}
											className='px-2 py-1 bg-neutral-100 text-neutral-700 text-[11px] rounded border border-neutral-200 flex items-center gap-1.5 group'
										>
											{tag}
											<button
												onClick={() => removeTag(tag)}
												className='opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity'
											>
												<X className='w-3 h-3' />
											</button>
										</span>
									))}
									{showTagInput ? (
										<div className='flex items-center gap-1'>
											<Input
												value={newTagValue}
												onChange={(e) => setNewTagValue(e.target.value)}
												className='h-7 text-[11px] w-28'
												placeholder='Add tag'
												autoFocus
												onKeyDown={(e) => {
													if (e.key === "Enter") addTag();
													if (e.key === "Escape") {
														setShowTagInput(false);
														setNewTagValue("");
													}
												}}
											/>
											<Button
												size='sm'
												className='h-7 w-7 p-0'
												onClick={addTag}
											>
												<Plus className='w-3.5 h-3.5' />
											</Button>
										</div>
									) : (
										<button
											onClick={() => setShowTagInput(true)}
											className='px-2 py-1 text-[11px] text-neutral-500 hover:text-neutral-700 border border-dashed border-neutral-300 rounded hover:border-neutral-400 transition-colors'
										>
											+ Add Tag
										</button>
									)}
								</div>
							</div>
						</div>
					)}

					{detailTab === "resume" && (
						<div className='max-w-2xl'>
							<div className='p-6 bg-neutral-50 rounded border border-neutral-200 text-center'>
								{candidate.resumeFileName ? (
									<>
										<File className='w-16 h-16 text-blue-600 mx-auto mb-3' />
										<p className='text-[14px] text-neutral-900 font-medium mb-1'>
											{candidate.resumeFileName}
										</p>
										<p className='text-[12px] text-neutral-500 mb-4'>
											Resume uploaded
										</p>
										<div className='flex gap-2 justify-center'>
											<Button
												size='sm'
												className='h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
												onClick={() => {
													const url = `/resume-viewer?name=${encodeURIComponent(candidate.name)}&role=${encodeURIComponent(candidate.role)}`;
													window.open(url, "_blank");
												}}
											>
												<File className='w-3.5 h-3.5 mr-1.5' />
												View Full Resume
											</Button>
											<Button
												size='sm'
												variant='outline'
												className='h-9 text-[13px] border-neutral-300'
												onClick={() => resumeFileInputRef.current?.click()}
											>
												<Upload className='w-3.5 h-3.5 mr-1.5' />
												Replace Resume
											</Button>
										</div>
										<input
											ref={resumeFileInputRef}
											type='file'
											accept='.pdf'
											className='hidden'
											onChange={handleReplaceResume}
										/>
									</>
								) : (
									<>
										<File className='w-16 h-16 text-neutral-300 mx-auto mb-3' />
										<p className='text-[13px] text-neutral-500 mb-4'>
											No resume uploaded
										</p>
										<Button
											size='sm'
											className='h-9 text-[13px] bg-neutral-900 hover:bg-neutral-800'
											onClick={() => resumeFileInputRef.current?.click()}
										>
											<Upload className='w-3.5 h-3.5 mr-1.5' />
											Upload Resume
										</Button>
										<input
											ref={resumeFileInputRef}
											type='file'
											accept='.pdf'
											className='hidden'
											onChange={handleReplaceResume}
										/>
									</>
								)}
							</div>
						</div>
					)}

					{detailTab === "screening" && (
						<div className='max-w-3xl'>
							<ScreeningTab
								candidate={candidate}
								candidates={props.candidates}
								setCandidates={props.setCandidates}
							/>
						</div>
					)}

					{detailTab === "technical" && (
						<div className='max-w-3xl'>
							<TechnicalTab
								candidate={candidate}
								candidates={props.candidates}
								setCandidates={props.setCandidates}
							/>
						</div>
					)}

					{detailTab === "offer" && (
						<div className='max-w-3xl'>
							<OfferTab
								candidate={candidate}
								candidates={props.candidates}
								setCandidates={props.setCandidates}
							/>
						</div>
					)}

					{detailTab === "activity" && (
						<div className='max-w-2xl'>
							<h4 className='text-[11px] font-semibold text-neutral-600 mb-3'>
								Activity Timeline
							</h4>
							<div className='space-y-3'>
								{candidate.activityLog && candidate.activityLog.length > 0 ? (
									candidate.activityLog.map((log, index) => (
										<div
											key={index}
											className='flex gap-3 pb-3 border-b border-neutral-100 last:border-0'
										>
											<div className='w-20 shrink-0'>
												<div className='text-[10px] text-neutral-500'>
													{log.date}
												</div>
											</div>
											<div className='flex-1'>
												<div className='text-[12px] text-neutral-900'>
													{log.action}
												</div>
												<div className='text-[11px] text-neutral-500 mt-0.5'>
													by {log.by}
												</div>
											</div>
										</div>
									))
								) : (
									<div className='text-center py-8'>
										<Clock className='w-8 h-8 text-neutral-300 mx-auto mb-2' />
										<p className='text-[12px] text-neutral-500'>
											No activity recorded yet
										</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Move Stage Modal */}
			{showMoveStageModal && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-full max-w-md'>
						<h3 className='text-[15px] font-semibold text-neutral-900 mb-4'>
							Move to Stage
						</h3>
						<div className='space-y-3 mb-6'>
							<Label className='text-[12px] text-neutral-600'>
								Select Stage
							</Label>
							<Select value={newStage} onValueChange={setNewStage}>
								<SelectTrigger className='h-9 text-[12px]'>
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
						<div className='flex gap-2 justify-end'>
							<Button
								variant='outline'
								size='sm'
								className='h-9 text-[12px]'
								onClick={() => setShowMoveStageModal(false)}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='h-9 text-[12px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleMoveStage}
							>
								Move Stage
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Assign Interviewer Modal */}
			{showAssignModal && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-full max-w-md'>
						<h3 className='text-[15px] font-semibold text-neutral-900 mb-4'>
							Assign Interviewer
						</h3>
						<div className='space-y-3 mb-6'>
							<Label className='text-[12px] text-neutral-600'>
								Select Interviewer
							</Label>
							<Select value={newInterviewer} onValueChange={setNewInterviewer}>
								<SelectTrigger className='h-9 text-[12px]'>
									<SelectValue placeholder='Select interviewer' />
								</SelectTrigger>
								<SelectContent>
									{users
										.filter((u) => u.role !== "Recruiter")
										.map((user) => (
											<SelectItem key={user.id} value={user.name}>
												{user.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>
						<div className='flex gap-2 justify-end'>
							<Button
								variant='outline'
								size='sm'
								className='h-9 text-[12px]'
								onClick={() => setShowAssignModal(false)}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								className='h-9 text-[12px] bg-neutral-900 hover:bg-neutral-800'
								onClick={handleAssignInterviewer}
							>
								Assign
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

// Screening Tab Component
interface ScreeningTabProps {
	candidate: Candidate;
	candidates: Candidate[];
	setCandidates: (candidates: Candidate[]) => void;
}

function ScreeningTab({
	candidate,
	candidates,
	setCandidates,
}: ScreeningTabProps) {
	const [notes, setNotes] = useState("");
	const currentUser =
		typeof window !== "undefined"
			? sessionStorage.getItem("userName") || "Admin User"
			: "Admin User";

	const handleSaveNotes = () => {
		if (!notes.trim()) return;

		const newHistory = {
			date: new Date().toISOString().split("T")[0],
			notes: notes,
			by: currentUser,
		};

		setCandidates(
			candidates.map((c) => {
				if (c.id === candidate.id) {
					return {
						...c,
						screeningHistory: [...(c.screeningHistory || []), newHistory],
					};
				}
				return c;
			}),
		);

		setNotes("");
	};

	return (
		<div className='space-y-6'>
			<div>
				<h4 className='text-[12px] font-semibold text-neutral-900 mb-3'>
					Add Screening Notes
				</h4>
				<RichTextEditor
					value={notes}
					onChange={setNotes}
					placeholder='Enter screening evaluation notes...'
				/>
				<Button
					size='sm'
					className='mt-3 h-8 text-[12px] bg-neutral-900 hover:bg-neutral-800'
					onClick={handleSaveNotes}
					disabled={!notes.trim()}
				>
					<Save className='w-3.5 h-3.5 mr-1.5' />
					Save Notes
				</Button>
			</div>

			{candidate.screeningHistory && candidate.screeningHistory.length > 0 && (
				<div>
					<h4 className='text-[12px] font-semibold text-neutral-900 mb-3'>
						Notes History
					</h4>
					<div className='space-y-3'>
						{candidate.screeningHistory.map((entry, index) => (
							<div
								key={index}
								className='p-4 bg-neutral-50 rounded border border-neutral-200'
							>
								<div className='flex items-center justify-between mb-2'>
									<span className='text-[11px] text-neutral-500'>
										{entry.date}
									</span>
									<span className='text-[11px] text-neutral-600 font-medium'>
										by {entry.by}
									</span>
								</div>
								<div
									className='text-[12px] text-neutral-900 prose prose-sm max-w-none'
									dangerouslySetInnerHTML={{ __html: entry.notes }}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// Technical Tab Component
interface TechnicalTabProps {
	candidate: Candidate;
	candidates: Candidate[];
	setCandidates: (candidates: Candidate[]) => void;
}

function TechnicalTab({
	candidate,
	candidates,
	setCandidates,
}: TechnicalTabProps) {
	const [notes, setNotes] = useState("");
	const [rating, setRating] = useState<number>(0);
	const currentUser =
		typeof window !== "undefined"
			? sessionStorage.getItem("userName") || "Admin User"
			: "Admin User";

	const handleSaveNotes = () => {
		if (!notes.trim()) return;

		const newHistory = {
			date: new Date().toISOString().split("T")[0],
			notes: notes,
			by: currentUser,
			rating: rating,
		};

		setCandidates(
			candidates.map((c) => {
				if (c.id === candidate.id) {
					return {
						...c,
						technicalHistory: [...(c.technicalHistory || []), newHistory],
					};
				}
				return c;
			}),
		);

		setNotes("");
		setRating(0);
	};

	return (
		<div className='space-y-6'>
			<div>
				<h4 className='text-[12px] font-semibold text-neutral-900 mb-3'>
					Add Technical Feedback
				</h4>

				<div className='mb-4'>
					<Label className='text-[11px] text-neutral-600 mb-2 block'>
						Rating (Optional)
					</Label>
					<div className='flex gap-2'>
						{[1, 2, 3, 4, 5].map((r) => (
							<button
								key={r}
								onClick={() => setRating(r)}
								className={`w-10 h-10 rounded border text-[12px] font-medium transition-colors ${
									rating >= r
										? "bg-neutral-900 text-white border-neutral-900"
										: "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
								}`}
							>
								{r}
							</button>
						))}
					</div>
				</div>

				<RichTextEditor
					value={notes}
					onChange={setNotes}
					placeholder='Enter technical evaluation feedback...'
				/>
				<Button
					size='sm'
					className='mt-3 h-8 text-[12px] bg-neutral-900 hover:bg-neutral-800'
					onClick={handleSaveNotes}
					disabled={!notes.trim()}
				>
					<Save className='w-3.5 h-3.5 mr-1.5' />
					Save Feedback
				</Button>
			</div>

			{candidate.technicalHistory && candidate.technicalHistory.length > 0 && (
				<div>
					<h4 className='text-[12px] font-semibold text-neutral-900 mb-3'>
						Feedback History
					</h4>
					<div className='space-y-3'>
						{candidate.technicalHistory.map((entry, index) => (
							<div
								key={index}
								className='p-4 bg-neutral-50 rounded border border-neutral-200'
							>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center gap-3'>
										<span className='text-[11px] text-neutral-500'>
											{entry.date}
										</span>
										{entry.rating && (
											<span className='text-[11px] px-2 py-0.5 bg-neutral-900 text-white rounded'>
												Rating: {entry.rating}/5
											</span>
										)}
									</div>
									<span className='text-[11px] text-neutral-600 font-medium'>
										by {entry.by}
									</span>
								</div>
								<div
									className='text-[12px] text-neutral-900 prose prose-sm max-w-none'
									dangerouslySetInnerHTML={{ __html: entry.notes }}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// Offer Tab Component
interface OfferTabProps {
	candidate: Candidate;
	candidates: Candidate[];
	setCandidates: (candidates: Candidate[]) => void;
}

function OfferTab({ candidate, candidates, setCandidates }: OfferTabProps) {
	const [notes, setNotes] = useState("");
	const currentUser =
		typeof window !== "undefined"
			? sessionStorage.getItem("userName") || "Admin User"
			: "Admin User";

	const handleSaveNotes = () => {
		if (!notes.trim()) return;

		const newHistory = {
			date: new Date().toISOString().split("T")[0],
			notes: notes,
			by: currentUser,
		};

		setCandidates(
			candidates.map((c) => {
				if (c.id === candidate.id) {
					return {
						...c,
						offerHistory: [...(c.offerHistory || []), newHistory],
					};
				}
				return c;
			}),
		);

		setNotes("");
	};

	return (
		<div className='space-y-6'>
			<div>
				<h4 className='text-[12px] font-semibold text-neutral-900 mb-3'>
					Add Offer Notes
				</h4>
				<RichTextEditor
					value={notes}
					onChange={setNotes}
					placeholder='Enter offer details and joining information...'
				/>
				<Button
					size='sm'
					className='mt-3 h-8 text-[12px] bg-neutral-900 hover:bg-neutral-800'
					onClick={handleSaveNotes}
					disabled={!notes.trim()}
				>
					<Save className='w-3.5 h-3.5 mr-1.5' />
					Save Notes
				</Button>
			</div>

			{candidate.offerHistory && candidate.offerHistory.length > 0 && (
				<div>
					<h4 className='text-[12px] font-semibold text-neutral-900 mb-3'>
						Notes History
					</h4>
					<div className='space-y-3'>
						{candidate.offerHistory.map((entry, index) => (
							<div
								key={index}
								className='p-4 bg-neutral-50 rounded border border-neutral-200'
							>
								<div className='flex items-center justify-between mb-2'>
									<span className='text-[11px] text-neutral-500'>
										{entry.date}
									</span>
									<span className='text-[11px] text-neutral-600 font-medium'>
										by {entry.by}
									</span>
								</div>
								<div
									className='text-[12px] text-neutral-900 prose prose-sm max-w-none'
									dangerouslySetInnerHTML={{ __html: entry.notes }}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// Resume Viewer Screen Component
interface ResumeViewerScreenProps {
	candidate: Candidate;
	onBack: () => void;
}

function ResumeViewerScreen({ candidate, onBack }: ResumeViewerScreenProps) {
	return (
		<div className='h-full flex flex-col bg-neutral-100'>
			{/* Header */}
			<div className='bg-white border-b border-neutral-200 px-5 py-3 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<button
						onClick={onBack}
						className='w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50'
					>
						<ArrowLeft className='w-4 h-4' />
					</button>
					<div>
						<h3 className='text-[14px] font-semibold text-neutral-900'>
							Resume - {candidate.name}
						</h3>
						<p className='text-[11px] text-neutral-500'>
							{candidate.resumeFileName}
						</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					{candidate.resumeUrl && (
						<Button
							variant='outline'
							size='sm'
							className='h-8 text-[12px] gap-1.5 border-neutral-200'
							onClick={() => {
								const link = document.createElement("a");
								link.href = candidate.resumeUrl!;
								link.download = candidate.resumeFileName || "resume.pdf";
								link.click();
							}}
						>
							<Download className='w-3.5 h-3.5' />
							Download
						</Button>
					)}
				</div>
			</div>

			{/* Resume Content */}
			<div className='flex-1 overflow-auto p-5'>
				{candidate.resumeUrl ? (
					<div
						className='max-w-4xl mx-auto bg-white rounded border border-neutral-200 shadow-sm'
						style={{ height: "calc(100vh - 120px)" }}
					>
						<iframe
							src={candidate.resumeUrl}
							className='w-full h-full border-0 rounded'
							title='Resume Preview'
						/>
					</div>
				) : (
					<div className='flex items-center justify-center h-full'>
						<div className='text-center'>
							<File className='w-16 h-16 text-neutral-300 mx-auto mb-3' />
							<p className='text-[13px] text-neutral-600'>
								Resume preview not available
							</p>
							<p className='text-[11px] text-neutral-500 mt-1'>
								{candidate.resumeFileName || "NoFtag resume uploaded"}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
