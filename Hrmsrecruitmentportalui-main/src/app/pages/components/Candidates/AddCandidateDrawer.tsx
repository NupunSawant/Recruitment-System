import { Upload, File, Save } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../../../components/ui/sheet";

type SourceType = "Direct" | "Referral" | "Job Portal" | "Recruitment Agency";

interface AddCandidateDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	uploadedFile: File | null;
	setUploadedFile: (file: File | null) => void;
	newCandidate: {
		fullName: string;
		email: string;
		phone: string;
		role: string;
		candidateType: "Intern" | "Fresher" | "Experienced";
		totalExperience: string;
		relevantExperience: string;
		noticePeriod: string;
		currentCTC: string;
		expectedCTC: string;
		location: string;
		education: string;
		sourceType: SourceType | "";
		recruitmentCompanyName: string;
		contactPersonName: string;
		contactNumber: string;
		referrerName: string;
		referrerContact: string;
		portalName: string;
	};
	setNewCandidate: (value: any) => void;
	handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddCandidate: () => void;
}

export function AddCandidateDrawer({
	open,
	onOpenChange,
	fileInputRef,
	uploadedFile,
	setUploadedFile,
	newCandidate,
	setNewCandidate,
	handleFileUpload,
	handleAddCandidate,
}: AddCandidateDrawerProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
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
								onValueChange={(value: "Intern" | "Fresher" | "Experienced") =>
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
								setNewCandidate({ ...newCandidate, education: e.target.value })
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
								onOpenChange(false);
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
	);
}
