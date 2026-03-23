import {
	ChevronDown,
	File,
	FileText,
	Calendar,
	GitBranch,
	UserPlus,
	XCircle,
	Save,
} from "lucide-react";
import { Candidate } from "../../../data/mockData";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Input } from "../../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface CandidatesTableProps {
	filteredCandidates: Candidate[];
	selectedIds: Set<string>;
	allSelected: boolean;
	handleSelectAll: (checked: boolean) => void;
	handleSelectOne: (id: string, checked: boolean) => void;
	setSelectedCandidate: (candidate: Candidate) => void;
	setViewState: (value: "list" | "detail" | "resume-viewer") => void;
	setDetailTab: (value: string) => void;
	updateCandidateField: (
		candidateId: string,
		field: string,
		value: any,
	) => Promise<void> | void;
	editingCell: { id: string; field: string } | null;
	editValue: string;
	setEditValue: (value: string) => void;
	startEditing: (
		candidateId: string,
		field: string,
		currentValue: string,
	) => void;
	saveEdit: (candidateId: string, field: string) => Promise<void> | void;
	cancelEdit: () => void;
	getStageColor: (stage: string) => string;
	activeDropdownRow: string | null;
	setActiveDropdownRow: (value: string | null) => void;
	setModalCandidate: (candidate: Candidate | null) => void;
	setNewStage: (value: Candidate["stage"]) => void;
	setShowMoveStageModal: (value: boolean) => void;
	setShowAssignModal: (value: boolean) => void;
	setShowScheduleModal: (value: boolean) => void;
	setShowRejectModal: (value: boolean) => void;
}

export function CandidatesTable({
	filteredCandidates,
	selectedIds,
	allSelected,
	handleSelectAll,
	handleSelectOne,
	setSelectedCandidate,
	setViewState,
	setDetailTab,
	updateCandidateField,
	editingCell,
	editValue,
	setEditValue,
	startEditing,
	saveEdit,
	cancelEdit,
	getStageColor,
	activeDropdownRow,
	setActiveDropdownRow,
	setModalCandidate,
	setNewStage,
	setShowMoveStageModal,
	setShowAssignModal,
	setShowScheduleModal,
	setShowRejectModal,
}: CandidatesTableProps) {
	return (
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
	);
}
