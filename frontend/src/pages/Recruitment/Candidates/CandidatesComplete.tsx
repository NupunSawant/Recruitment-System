import { useState, useMemo, useRef, useEffect } from "react";
import {
	candidates as initialCandidates,
	Candidate,
	jobOpenings,
} from "../../../data/mockData";
import { CandidatesHeader } from "../../components/Candidates/CandidatesHeader";
import { CandidatesBulkActions } from "../../components/Candidates/CandidatesBulkActions";
import { CandidatesTable } from "../../components/Candidates/CandidatesTable";
import { AddCandidateDrawer } from "../../components/Candidates/AddCandidateDrawer";
import { ResumeViewerScreen } from "../../components/Candidates/ResumeViewerScreen";
import { CandidateDetailView } from "../../components/Candidates/CandidateDetailView";
import { CandidateModals } from "../../components/Candidates/CandidateModals";

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

	const [editingCell, setEditingCell] = useState<{
		id: string;
		field: string;
	} | null>(null);
	const [editValue, setEditValue] = useState<string>("");

	const [showAddCandidateDrawer, setShowAddCandidateDrawer] = useState(false);
	const [showMoveStageModal, setShowMoveStageModal] = useState(false);
	const [showAssignModal, setShowAssignModal] = useState(false);
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [modalCandidate, setModalCandidate] = useState<Candidate | null>(null);

	const [stageFilter, setStageFilter] = useState<string>("all");
	const [noticePeriodFilter, setNoticePeriodFilter] = useState("all");

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

	const [detailTab, setDetailTab] = useState("overview");

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

	const toggleQuickFilter = (filter: QuickFilter) => {
		const newFilters = new Set(quickFilters);
		if (newFilters.has(filter)) {
			newFilters.delete(filter);
		} else {
			newFilters.add(filter);
		}
		setQuickFilters(newFilters);
	};

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

	useEffect(() => {
		if (showScheduleModal && modalCandidate) {
			const matchingJob = jobOpenings.find(
				(job) =>
					modalCandidate.role.toLowerCase().includes(job.role.toLowerCase()) ||
					job.role.toLowerCase().includes(modalCandidate.role.toLowerCase()),
			);

			if (matchingJob && matchingJob.googleMeetLink) {
				setMeetingLink(matchingJob.googleMeetLink);
			} else {
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

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			setUploadedFile(file);
		} else {
			alert("Please upload a PDF file");
		}
	};

	const handleAddCandidate = () => {
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
			sourceDetails = { type: newCandidate.sourceType as SourceType };

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
			sourceDetails,
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

	const handleMoveStage = () => {
		if (!modalCandidate) return;

		setCandidates((prev) =>
			prev.map((candidate) =>
				candidate.id === modalCandidate.id
					? { ...candidate, stage: newStage }
					: candidate,
			),
		);

		addActivityLog(modalCandidate.id, `Stage changed to ${newStage}`);
		setShowMoveStageModal(false);
		setModalCandidate(null);

		if (selectedCandidate?.id === modalCandidate.id) {
			setSelectedCandidate((prev) =>
				prev ? { ...prev, stage: newStage } : prev,
			);
		}
	};

	const handleAssignInterviewer = () => {
		if (!modalCandidate || selectedInterviewer === "none") return;

		setCandidates((prev) =>
			prev.map((candidate) =>
				candidate.id === modalCandidate.id
					? {
							...candidate,
							interviewer: selectedInterviewer,
						}
					: candidate,
			),
		);

		addActivityLog(
			modalCandidate.id,
			`Interviewer assigned: ${selectedInterviewer}${interviewRound ? ` (${interviewRound})` : ""}${interviewNotes ? ` - ${interviewNotes}` : ""}`,
		);

		setShowAssignModal(false);
		setModalCandidate(null);
		setSelectedInterviewer("none");
		setInterviewRound("Screening");
		setInterviewNotes("");

		if (selectedCandidate?.id === modalCandidate.id) {
			setSelectedCandidate((prev) =>
				prev
					? {
							...prev,
							interviewer: selectedInterviewer,
						}
					: prev,
			);
		}
	};

	const handleScheduleInterview = () => {
		if (!modalCandidate || !interviewDate || !interviewTime) return;

		const interviewText = `Interview scheduled: ${interviewType} on ${interviewDate} at ${interviewTime}${selectedInterviewer && selectedInterviewer !== "none" ? ` with ${selectedInterviewer}` : ""}${meetingLink ? ` (${meetingLink})` : ""}`;

		addActivityLog(modalCandidate.id, interviewText);

		setShowScheduleModal(false);
		setModalCandidate(null);
		setInterviewType("Screening");
		setInterviewDate("");
		setInterviewTime("");
		setMeetingLink("");
		setSelectedInterviewer("none");
	};

	const handleRejectCandidate = () => {
		if (!modalCandidate) return;

		setCandidates((prev) =>
			prev.map((candidate) =>
				candidate.id === modalCandidate.id
					? { ...candidate, stage: "Rejected" }
					: candidate,
			),
		);

		addActivityLog(
			modalCandidate.id,
			rejectionReason
				? `Candidate rejected: ${rejectionReason}`
				: "Candidate rejected",
		);

		setShowRejectModal(false);
		setModalCandidate(null);
		setRejectionReason("");

		if (selectedCandidate?.id === modalCandidate.id) {
			setSelectedCandidate((prev) =>
				prev ? { ...prev, stage: "Rejected" } : prev,
			);
		}
	};

	const handleBulkMoveStage = () => {
		setCandidates((prev) =>
			prev.map((candidate) =>
				selectedIds.has(candidate.id)
					? { ...candidate, stage: bulkStage }
					: candidate,
			),
		);

		selectedIds.forEach((id) => {
			addActivityLog(id, `Bulk stage changed to ${bulkStage}`);
		});

		setShowBulkMoveStageModal(false);
		setSelectedIds(new Set());
	};

	const handleBulkAssignInterviewer = () => {
		if (!bulkInterviewer) return;

		setCandidates((prev) =>
			prev.map((candidate) =>
				selectedIds.has(candidate.id)
					? { ...candidate, interviewer: bulkInterviewer }
					: candidate,
			),
		);

		selectedIds.forEach((id) => {
			addActivityLog(id, `Bulk interviewer assigned: ${bulkInterviewer}`);
		});

		setShowBulkAssignModal(false);
		setBulkInterviewer("");
		setSelectedIds(new Set());
	};

	const handleBulkAddTag = () => {
		const trimmedTag = bulkTag.trim();
		if (!trimmedTag) return;

		setCandidates((prev) =>
			prev.map((candidate) => {
				if (!selectedIds.has(candidate.id)) return candidate;

				const currentTags = candidate.tags || [];
				if (currentTags.includes(trimmedTag)) return candidate;

				return {
					...candidate,
					tags: [...currentTags, trimmedTag],
				};
			}),
		);

		selectedIds.forEach((id) => {
			addActivityLog(id, `Bulk tag added: ${trimmedTag}`);
		});

		setShowBulkTagModal(false);
		setBulkTag("");
		setSelectedIds(new Set());
	};

	const handleBulkScheduleInterview = () => {
		if (!bulkInterviewDate || !bulkInterviewTime) return;

		selectedIds.forEach((id) => {
			addActivityLog(
				id,
				`Bulk interview scheduled: ${bulkInterviewType} on ${bulkInterviewDate} at ${bulkInterviewTime}`,
			);
		});

		setShowBulkScheduleModal(false);
		setBulkInterviewDate("");
		setBulkInterviewTime("");
		setBulkInterviewType("Screening");
		setSelectedIds(new Set());
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

	const allSelected =
		filteredCandidates.length > 0 &&
		selectedIds.size === filteredCandidates.length;

	useEffect(() => {
		if (!selectedCandidate) return;

		const latestSelectedCandidate = candidates.find(
			(candidate) => candidate.id === selectedCandidate.id,
		);

		if (latestSelectedCandidate) {
			setSelectedCandidate(latestSelectedCandidate);
		}
	}, [candidates, selectedCandidate?.id]);

	if (viewState === "resume-viewer" && selectedCandidate) {
		return (
			<ResumeViewerScreen
				candidate={selectedCandidate}
				onBack={() => setViewState("detail")}
			/>
		);
	}

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

	return (
		<div className='h-full flex flex-col bg-white'>
			<CandidatesHeader
				filteredCount={filteredCandidates.length}
				selectedCount={selectedIds.size}
				roleTab={roleTab}
				setRoleTab={setRoleTab}
				quickFilters={quickFilters}
				toggleQuickFilter={toggleQuickFilter}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				showAdvancedFilters={showAdvancedFilters}
				setShowAdvancedFilters={setShowAdvancedFilters}
				stageFilter={stageFilter}
				setStageFilter={setStageFilter}
				noticePeriodFilter={noticePeriodFilter}
				setNoticePeriodFilter={setNoticePeriodFilter}
				onOpenAddCandidate={() => setShowAddCandidateDrawer(true)}
			/>

			<CandidatesBulkActions
				selectedCount={selectedIds.size}
				onMoveStage={() => setShowBulkMoveStageModal(true)}
				onAssignInterviewer={() => setShowBulkAssignModal(true)}
				onScheduleInterview={() => setShowBulkScheduleModal(true)}
				onAddTag={() => setShowBulkTagModal(true)}
				onReject={handleBulkReject}
				onClear={() => setSelectedIds(new Set())}
			/>

			<CandidatesTable
				filteredCandidates={filteredCandidates}
				selectedIds={selectedIds}
				allSelected={allSelected}
				handleSelectAll={handleSelectAll}
				handleSelectOne={handleSelectOne}
				setSelectedCandidate={setSelectedCandidate}
				setViewState={setViewState}
				setDetailTab={setDetailTab}
				updateCandidateField={updateCandidateField}
				editingCell={editingCell}
				editValue={editValue}
				setEditValue={setEditValue}
				startEditing={startEditing}
				saveEdit={saveEdit}
				cancelEdit={cancelEdit}
				getStageColor={getStageColor}
				activeDropdownRow={activeDropdownRow}
				setActiveDropdownRow={setActiveDropdownRow}
				setModalCandidate={setModalCandidate}
				setNewStage={setNewStage}
				setShowMoveStageModal={setShowMoveStageModal}
				setShowAssignModal={setShowAssignModal}
				setShowScheduleModal={setShowScheduleModal}
				setShowRejectModal={setShowRejectModal}
			/>

			<AddCandidateDrawer
				open={showAddCandidateDrawer}
				onOpenChange={setShowAddCandidateDrawer}
				fileInputRef={fileInputRef}
				uploadedFile={uploadedFile}
				setUploadedFile={setUploadedFile}
				newCandidate={newCandidate}
				setNewCandidate={setNewCandidate}
				handleFileUpload={handleFileUpload}
				handleAddCandidate={handleAddCandidate}
			/>

			<CandidateModals
				showMoveStageModal={showMoveStageModal}
				setShowMoveStageModal={setShowMoveStageModal}
				showAssignModal={showAssignModal}
				setShowAssignModal={setShowAssignModal}
				showScheduleModal={showScheduleModal}
				setShowScheduleModal={setShowScheduleModal}
				showRejectModal={showRejectModal}
				setShowRejectModal={setShowRejectModal}
				modalCandidate={modalCandidate}
				setModalCandidate={setModalCandidate}
				newStage={newStage}
				setNewStage={setNewStage}
				selectedInterviewer={selectedInterviewer}
				setSelectedInterviewer={setSelectedInterviewer}
				interviewRound={interviewRound}
				setInterviewRound={setInterviewRound}
				interviewNotes={interviewNotes}
				setInterviewNotes={setInterviewNotes}
				interviewType={interviewType}
				setInterviewType={setInterviewType}
				interviewDate={interviewDate}
				setInterviewDate={setInterviewDate}
				interviewTime={interviewTime}
				setInterviewTime={setInterviewTime}
				meetingLink={meetingLink}
				setMeetingLink={setMeetingLink}
				rejectionReason={rejectionReason}
				setRejectionReason={setRejectionReason}
				getStageColor={getStageColor}
				handleMoveStage={handleMoveStage}
				handleAssignInterviewer={handleAssignInterviewer}
				handleScheduleInterview={handleScheduleInterview}
				handleRejectCandidate={handleRejectCandidate}
				showBulkMoveStageModal={showBulkMoveStageModal}
				setShowBulkMoveStageModal={setShowBulkMoveStageModal}
				showBulkAssignModal={showBulkAssignModal}
				setShowBulkAssignModal={setShowBulkAssignModal}
				showBulkScheduleModal={showBulkScheduleModal}
				setShowBulkScheduleModal={setShowBulkScheduleModal}
				showBulkTagModal={showBulkTagModal}
				setShowBulkTagModal={setShowBulkTagModal}
				selectedIds={selectedIds}
				bulkStage={bulkStage}
				setBulkStage={setBulkStage}
				bulkInterviewer={bulkInterviewer}
				setBulkInterviewer={setBulkInterviewer}
				bulkTag={bulkTag}
				setBulkTag={setBulkTag}
				bulkInterviewDate={bulkInterviewDate}
				setBulkInterviewDate={setBulkInterviewDate}
				bulkInterviewTime={bulkInterviewTime}
				setBulkInterviewTime={setBulkInterviewTime}
				bulkInterviewType={bulkInterviewType}
				setBulkInterviewType={setBulkInterviewType}
				handleBulkMoveStage={handleBulkMoveStage}
				handleBulkAssignInterviewer={handleBulkAssignInterviewer}
				handleBulkAddTag={handleBulkAddTag}
				handleBulkScheduleInterview={handleBulkScheduleInterview}
			/>
		</div>
	);
}
