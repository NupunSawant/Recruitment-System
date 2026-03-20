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

interface CandidateModalsProps {
	showMoveStageModal: boolean;
	setShowMoveStageModal: (value: boolean) => void;
	showAssignModal: boolean;
	setShowAssignModal: (value: boolean) => void;
	showScheduleModal: boolean;
	setShowScheduleModal: (value: boolean) => void;
	showRejectModal: boolean;
	setShowRejectModal: (value: boolean) => void;

	modalCandidate: Candidate | null;
	setModalCandidate: (candidate: Candidate | null) => void;

	newStage: Candidate["stage"];
	setNewStage: (value: Candidate["stage"]) => void;

	selectedInterviewer: string;
	setSelectedInterviewer: (value: string) => void;

	interviewRound: string;
	setInterviewRound: (value: string) => void;

	interviewNotes: string;
	setInterviewNotes: (value: string) => void;

	interviewType: string;
	setInterviewType: (value: string) => void;

	interviewDate: string;
	setInterviewDate: (value: string) => void;

	interviewTime: string;
	setInterviewTime: (value: string) => void;

	meetingLink: string;
	setMeetingLink: (value: string) => void;

	rejectionReason: string;
	setRejectionReason: (value: string) => void;

	getStageColor: (stage: string) => string;

	handleMoveStage: () => void;
	handleAssignInterviewer: () => void;
	handleScheduleInterview: () => void;
	handleRejectCandidate: () => void;

	showBulkMoveStageModal: boolean;
	setShowBulkMoveStageModal: (value: boolean) => void;
	showBulkAssignModal: boolean;
	setShowBulkAssignModal: (value: boolean) => void;
	showBulkScheduleModal: boolean;
	setShowBulkScheduleModal: (value: boolean) => void;
	showBulkTagModal: boolean;
	setShowBulkTagModal: (value: boolean) => void;

	selectedIds: Set<string>;

	bulkStage: Candidate["stage"];
	setBulkStage: (value: Candidate["stage"]) => void;

	bulkInterviewer: string;
	setBulkInterviewer: (value: string) => void;

	bulkTag: string;
	setBulkTag: (value: string) => void;

	bulkInterviewDate: string;
	setBulkInterviewDate: (value: string) => void;

	bulkInterviewTime: string;
	setBulkInterviewTime: (value: string) => void;

	bulkInterviewType: string;
	setBulkInterviewType: (value: string) => void;

	handleBulkMoveStage: () => void;
	handleBulkAssignInterviewer: () => void;
	handleBulkAddTag: () => void;
	handleBulkScheduleInterview: () => void;
}

export function CandidateModals({
	showMoveStageModal,
	setShowMoveStageModal,
	showAssignModal,
	setShowAssignModal,
	showScheduleModal,
	setShowScheduleModal,
	showRejectModal,
	setShowRejectModal,
	modalCandidate,
	setModalCandidate,
	newStage,
	setNewStage,
	selectedInterviewer,
	setSelectedInterviewer,
	interviewRound,
	setInterviewRound,
	interviewNotes,
	setInterviewNotes,
	interviewType,
	setInterviewType,
	interviewDate,
	setInterviewDate,
	interviewTime,
	setInterviewTime,
	meetingLink,
	setMeetingLink,
	rejectionReason,
	setRejectionReason,
	getStageColor,
	handleMoveStage,
	handleAssignInterviewer,
	handleScheduleInterview,
	handleRejectCandidate,
	showBulkMoveStageModal,
	setShowBulkMoveStageModal,
	showBulkAssignModal,
	setShowBulkAssignModal,
	showBulkScheduleModal,
	setShowBulkScheduleModal,
	showBulkTagModal,
	setShowBulkTagModal,
	selectedIds,
	bulkStage,
	setBulkStage,
	bulkInterviewer,
	setBulkInterviewer,
	bulkTag,
	setBulkTag,
	bulkInterviewDate,
	setBulkInterviewDate,
	bulkInterviewTime,
	setBulkInterviewTime,
	bulkInterviewType,
	setBulkInterviewType,
	handleBulkMoveStage,
	handleBulkAssignInterviewer,
	handleBulkAddTag,
	handleBulkScheduleInterview,
}: CandidateModalsProps) {
	return (
		<>
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
										<SelectItem value='none'>None</SelectItem>
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
									Interview Round
								</Label>
								<Select value={interviewRound} onValueChange={setInterviewRound}>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Screening'>Screening</SelectItem>
										<SelectItem value='Technical'>Technical</SelectItem>
										<SelectItem value='Final'>Final</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Notes
								</Label>
								<Textarea
									value={interviewNotes}
									onChange={(e) => setInterviewNotes(e.target.value)}
									rows={4}
									className='text-[13px] border-neutral-200'
									placeholder='Optional notes'
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

			{showScheduleModal && modalCandidate && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[520px] border border-neutral-200 shadow-xl'>
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
									Interview Type
								</Label>
								<Select value={interviewType} onValueChange={setInterviewType}>
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
									Interviewer
								</Label>
								<Select
									value={selectedInterviewer}
									onValueChange={setSelectedInterviewer}
								>
									<SelectTrigger className='h-9 text-[13px] border-neutral-200'>
										<SelectValue placeholder='Optional interviewer' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='none'>None</SelectItem>
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

							<div className='grid grid-cols-2 gap-3'>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-2 block'>
										Date
									</Label>
									<Input
										type='date'
										value={interviewDate}
										onChange={(e) => setInterviewDate(e.target.value)}
										className='h-9 text-[13px] border-neutral-200'
									/>
								</div>
								<div>
									<Label className='text-[11px] text-neutral-600 mb-2 block'>
										Time
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
									Meeting Link
								</Label>
								<Input
									value={meetingLink}
									onChange={(e) => setMeetingLink(e.target.value)}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='Google Meet / Zoom link'
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

			{showRejectModal && modalCandidate && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[460px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Reject Candidate
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
									Reason
								</Label>
								<Textarea
									value={rejectionReason}
									onChange={(e) => setRejectionReason(e.target.value)}
									rows={4}
									className='text-[13px] border-neutral-200'
									placeholder='Optional rejection reason'
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
								className='flex-1 h-9 text-[13px] bg-red-600 hover:bg-red-700'
								onClick={handleRejectCandidate}
							>
								Reject
							</Button>
						</div>
					</div>
				</div>
			)}

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

			{showBulkTagModal && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[400px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Bulk Add Tag
						</h3>
						<div className='space-y-3 mb-5'>
							<p className='text-[12px] text-neutral-600'>
								Add a tag to <strong>{selectedIds.size} candidate(s)</strong>
							</p>
							<div>
								<Label className='text-[11px] text-neutral-600 mb-2 block'>
									Tag
								</Label>
								<Input
									value={bulkTag}
									onChange={(e) => setBulkTag(e.target.value)}
									className='h-9 text-[13px] border-neutral-200'
									placeholder='Enter tag'
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

			{showBulkScheduleModal && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-5 w-[440px] border border-neutral-200 shadow-xl'>
						<h3 className='text-[14px] font-semibold text-neutral-900 mb-4'>
							Bulk Schedule Interview
						</h3>

						<div className='space-y-3 mb-5'>
							<p className='text-[12px] text-neutral-600'>
								Schedule interview for{" "}
								<strong>{selectedIds.size} candidate(s)</strong>
							</p>

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
		</>
	);
}