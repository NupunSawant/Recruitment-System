import { ArrowLeft, Download, File } from "lucide-react";
import { Candidate } from "../../../data/mockData";
import {Button} from "../../../components/ui/button"

interface ResumeViewerScreenProps {
	candidate: Candidate;
	onBack: () => void;
}

export function ResumeViewerScreen({
	candidate,
	onBack,
}: ResumeViewerScreenProps) {
	return (
		<div className='h-full flex flex-col bg-neutral-100'>
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
								{candidate.resumeFileName || "No resume uploaded"}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}