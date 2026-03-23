import { useRef, useState } from "react";
import {
	Mail,
	Phone,
	MapPin,
	Save,
	File,
	Download,
	CheckCircle,
	ArrowLeft,
	ArrowRight,
	GitBranch,
	UserPlus,
	X,
	Plus,
	Upload,
	Clock,
} from "lucide-react";
import { Candidate, users } from "../../../data/mockData";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { RichTextEditor } from "../../../components/RichTextEditor";
import { useAppDispatch } from "../../../hooks/useRedux";
import { updateCandidateThunk } from "../../../slices/Recruitment/Candidates/candidatesThunks";
import { getCandidateById } from "../../../slices/Recruitment/Candidates/candidatesThunks";

interface CandidateDetailViewProps {
	candidate: Candidate;
	onBack: () => void;
	onViewResume: () => void;
	detailTab: string;
	setDetailTab: (tab: string) => void;
}

export function CandidateDetailView(props: CandidateDetailViewProps) {
	const { candidate, onBack, onViewResume, detailTab, setDetailTab } = props;
	const dispatch = useAppDispatch();

	const stages: Candidate["stage"][] = [
		"New",
		"Screening",
		"Technical",
		"Offer",
		"Joined",
	];
	const currentStageIndex = stages.indexOf(candidate.stage);

	const resumeFileInputRef = useRef<HTMLInputElement | null>(null);

	const [showTagInput, setShowTagInput] = useState(false);
	const [newTagValue, setNewTagValue] = useState("");

	const [editingField, setEditingField] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	const [showMoveStageModal, setShowMoveStageModal] = useState(false);
	const [showAssignModal, setShowAssignModal] = useState(false);
	const [newStage, setNewStage] = useState<Candidate["stage"]>(candidate.stage);
	const [newInterviewer, setNewInterviewer] = useState(
		candidate.interviewer || "",
	);

	const updateCandidate = async (data: Partial<Candidate>) => {
		await dispatch(
			updateCandidateThunk({
				id: candidate.id,
				data,
			}),
		).unwrap();
	};

	const appendActivityLog = async (action: string, by = "Admin") => {
		const currentLog = candidate.activityLog || [];
		const newLog = {
			date: new Date().toISOString().split("T")[0],
			action,
			by,
		};

		await updateCandidate({
			activityLog: [newLog, ...currentLog],
		});
	};

	const startEditing = (field: string, currentValue: string) => {
		setEditingField(field);
		setEditValue(currentValue || "");
	};

	const saveField = async (field: keyof Candidate) => {
		await updateCandidate({ [field]: editValue } as Partial<Candidate>);
		await appendActivityLog(`${field} updated to: ${editValue}`, "Admin");
		setEditingField(null);
		setEditValue("");
	};

	const cancelEditing = () => {
		setEditingField(null);
		setEditValue("");
	};

	const handleMoveStage = async () => {
		await updateCandidate({ stage: newStage });
		await appendActivityLog(`Stage changed to: ${newStage}`, "Admin");
		setShowMoveStageModal(false);
	};

	const handleAssignInterviewer = async () => {
		if (!newInterviewer) return;

		await updateCandidate({ interviewer: newInterviewer });
		await appendActivityLog(`Interviewer assigned: ${newInterviewer}`, "Admin");
		setShowAssignModal(false);
	};

	const addTag = async () => {
		if (!newTagValue.trim()) return;

		const currentTags = candidate.tags || [];
		if (currentTags.includes(newTagValue.trim())) return;

		await updateCandidate({
			tags: [...currentTags, newTagValue.trim()],
		});
		await appendActivityLog(`Tag added: ${newTagValue.trim()}`, "Admin");
		setNewTagValue("");
		setShowTagInput(false);
	};

	const removeTag = async (tagToRemove: string) => {
		await updateCandidate({
			tags: (candidate.tags || []).filter((tag) => tag !== tagToRemove),
		});
		await appendActivityLog(`Tag removed: ${tagToRemove}`, "Admin");
	};

	const handleReplaceResume = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (!file || file.type !== "application/pdf") return;

		await updateCandidate({
			resumeFileName: file.name,
			resumeUrl: URL.createObjectURL(file),
		});
		await appendActivityLog(`Resume replaced: ${file.name}`, "Admin");
	};

	const moveToNextStage = async () => {
		const currentIndex = stages.indexOf(candidate.stage);
		if (currentIndex < stages.length - 1) {
			const nextStage = stages[currentIndex + 1];
			await updateCandidate({ stage: nextStage });
			await appendActivityLog(`Moved to ${nextStage} stage`, "Admin");
		}
	};

	return (
		<div className='h-full flex flex-col bg-white'>
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
							onClick={async () => {
								await updateCandidate({ stage: "Rejected" });
								await appendActivityLog("Candidate rejected", "Admin");
							}}
						>
							<X className='w-3.5 h-3.5' />
							Reject
						</Button>
					)}
				</div>
			</div>

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
											<div className='text-neutral-900 font-medium '>
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

							<div>
								<h4 className='text-[11px] font-semibold text-neutral-600 mb-2'>
									Education
								</h4>

								<div
									className='p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-100'
									onClick={() =>
										startEditing("education", candidate.education || "")
									}
								>
									<div className='text-neutral-500 mb-0.5'>Education</div>
									{editingField === "education" ? (
										<div
											className='flex items-center gap-1.5'
											onClick={(e) => e.stopPropagation()}
										>
											<Input
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												className='h-7 text-[12px]'
												autoFocus
												onKeyDown={(e) => {
													if (e.key === "Enter") saveField("education");
													if (e.key === "Escape") cancelEditing();
												}}
											/>

											<Button
												size='sm'
												className='h-7 w-7 p-0'
												onClick={() => saveField("education")}
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
										<div className='text-neutral-900 font-medium'>
											{candidate.education || "Click to add education"}
										</div>
									)}
								</div>
							</div>

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
												onClick={onViewResume}
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
							<ScreeningTab candidate={candidate} />
						</div>
					)}

					{detailTab === "technical" && (
						<div className='max-w-3xl'>
							<TechnicalTab candidate={candidate} />
						</div>
					)}

					{detailTab === "offer" && (
						<div className='max-w-3xl'>
							<OfferTab candidate={candidate} />
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
							<Select
								value={newStage}
								onValueChange={(value) =>
									setNewStage(value as Candidate["stage"])
								}
							>
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

interface ScreeningTabProps {
	candidate: Candidate;
}

function ScreeningTab({ candidate }: ScreeningTabProps) {
	const dispatch = useAppDispatch();
	const [notes, setNotes] = useState("");
	const currentUser =
		typeof window !== "undefined"
			? sessionStorage.getItem("userName") || "Admin User"
			: "Admin User";

	const handleSaveNotes = async () => {
		if (!notes.trim()) return;

		const stripHtml = (html: string) => {
			if (typeof window === "undefined") return html;
			const div = document.createElement("div");
			div.innerHTML = html;
			return (div.textContent || div.innerText || "").trim();
		};

		const truncateText = (text: string, maxLength = 120) => {
			if (text.length <= maxLength) return text;
			return `${text.slice(0, maxLength)}...`;
		};

		const newHistory = {
			date: new Date().toISOString().split("T")[0],
			notes,
			by: currentUser,
		};

		const plainNotes = truncateText(stripHtml(notes));

		await dispatch(
			updateCandidateThunk({
				id: candidate.id,
				data: {
					screeningHistory: [...(candidate.screeningHistory || []), newHistory],
					activityLog: [
						{
							date: newHistory.date,
							action: `Screening note added: ${plainNotes}`,
							by: currentUser,
						},
						...(candidate.activityLog || []),
					],
				},
			}),
		).unwrap();

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

interface TechnicalTabProps {
	candidate: Candidate;
}

function TechnicalTab({ candidate }: TechnicalTabProps) {
	const dispatch = useAppDispatch();
	const [notes, setNotes] = useState("");
	const [rating, setRating] = useState<number>(0);
	const currentUser =
		typeof window !== "undefined"
			? sessionStorage.getItem("userName") || "Admin User"
			: "Admin User";

	const handleSaveNotes = async () => {
		if (!notes.trim()) return;

		const stripHtml = (html: string) => {
			if (typeof window === "undefined") return html;
			const div = document.createElement("div");
			div.innerHTML = html;
			return (div.textContent || div.innerText || "").trim();
		};

		const truncateText = (text: string, maxLength = 120) => {
			if (text.length <= maxLength) return text;
			return `${text.slice(0, maxLength)}...`;
		};

		const newHistory = {
			date: new Date().toISOString().split("T")[0],
			notes,
			by: currentUser,
			rating,
		};

		const plainNotes = truncateText(stripHtml(notes));

		await dispatch(
			updateCandidateThunk({
				id: candidate.id,
				data: {
					technicalHistory: [...(candidate.technicalHistory || []), newHistory],
					activityLog: [
						{
							date: newHistory.date,
							action: `Technical evaluation added${rating ? ` (${rating}/5)` : ""}: ${plainNotes}`,
							by: currentUser,
						},
						...(candidate.activityLog || []),
					],
				},
			}),
		).unwrap();

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

interface OfferTabProps {
	candidate: Candidate;
}

function OfferTab({ candidate }: OfferTabProps) {
	const dispatch = useAppDispatch();
	const [notes, setNotes] = useState("");
	const currentUser =
		typeof window !== "undefined"
			? sessionStorage.getItem("userName") || "Admin User"
			: "Admin User";

	const handleSaveNotes = async () => {
		if (!notes.trim()) return;

		const stripHtml = (html: string) => {
			if (typeof window === "undefined") return html;
			const div = document.createElement("div");
			div.innerHTML = html;
			return (div.textContent || div.innerText || "").trim();
		};

		const truncateText = (text: string, maxLength = 120) => {
			if (text.length <= maxLength) return text;
			return `${text.slice(0, maxLength)}...`;
		};

		const newHistory = {
			date: new Date().toISOString().split("T")[0],
			notes,
			by: currentUser,
		};

		const plainNotes = truncateText(stripHtml(notes));

		await dispatch(
			updateCandidateThunk({
				id: candidate.id,
				data: {
					offerHistory: [...(candidate.offerHistory || []), newHistory],
					activityLog: [
						{
							date: newHistory.date,
							action: `Offer note added: ${plainNotes}`,
							by: currentUser,
						},
						...(candidate.activityLog || []),
					],
				},
			}),
		).unwrap();

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
