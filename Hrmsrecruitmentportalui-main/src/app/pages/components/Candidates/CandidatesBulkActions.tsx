import { Button } from "../../../components/ui/button";

interface CandidatesBulkActionsProps {
	selectedCount: number;
	onMoveStage: () => void;
	onAssignInterviewer: () => void;
	onScheduleInterview: () => void;
	onAddTag: () => void;
	onReject: () => void;
	onClear: () => void;
}

export function CandidatesBulkActions({
	selectedCount,
	onMoveStage,
	onAssignInterviewer,
	onScheduleInterview,
	onAddTag,
	onReject,
	onClear,
}: CandidatesBulkActionsProps) {
	if (selectedCount === 0) return null;

	return (
		<div className='bg-blue-50 border-b border-blue-200 px-5 py-2 flex items-center gap-3'>
			<span className='text-[12px] text-blue-900 font-medium'>
				{selectedCount} selected
			</span>

			<div className='flex gap-1.5 ml-auto'>
				<Button
					variant='outline'
					size='sm'
					className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
					onClick={onMoveStage}
				>
					Move Stage
				</Button>

				<Button
					variant='outline'
					size='sm'
					className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
					onClick={onAssignInterviewer}
				>
					Assign Interviewer
				</Button>

				<Button
					variant='outline'
					size='sm'
					className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
					onClick={onScheduleInterview}
				>
					Schedule Interview
				</Button>

				<Button
					variant='outline'
					size='sm'
					className='h-7 text-[11px] gap-1 border-blue-200 bg-white'
					onClick={onAddTag}
				>
					Add Tag
				</Button>

				<Button
					variant='outline'
					size='sm'
					className='h-7 text-[11px] gap-1 text-red-700 border-red-200 bg-white hover:bg-red-50'
					onClick={onReject}
				>
					Reject
				</Button>

				<Button
					variant='ghost'
					size='sm'
					className='h-7 text-[11px]'
					onClick={onClear}
				>
					Clear Selection
				</Button>
			</div>
		</div>
	);
}