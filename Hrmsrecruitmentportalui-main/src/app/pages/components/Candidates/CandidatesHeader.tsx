import { Search, Filter, Upload, Plus } from "lucide-react";
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

type RoleTab = "All" | "MERN" | "QA" | "Flutter" | "UI/UX";
type QuickFilter =
	| "Intern"
	| "Fresher"
	| "Experienced"
	| "Immediate Joiner"
	| "Backup";

interface CandidatesHeaderProps {
	filteredCount: number;
	selectedCount: number;
	roleTab: RoleTab;
	setRoleTab: (tab: RoleTab) => void;
	quickFilters: Set<QuickFilter>;
	toggleQuickFilter: (filter: QuickFilter) => void;
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	showAdvancedFilters: boolean;
	setShowAdvancedFilters: (value: boolean) => void;
	stageFilter: string;
	setStageFilter: (value: string) => void;
	noticePeriodFilter: string;
	setNoticePeriodFilter: (value: string) => void;
	onOpenAddCandidate: () => void;
}

export function CandidatesHeader({
	filteredCount,
	selectedCount,
	roleTab,
	setRoleTab,
	quickFilters,
	toggleQuickFilter,
	searchQuery,
	setSearchQuery,
	showAdvancedFilters,
	setShowAdvancedFilters,
	stageFilter,
	setStageFilter,
	noticePeriodFilter,
	setNoticePeriodFilter,
	onOpenAddCandidate,
}: CandidatesHeaderProps) {
	return (
		<div className='border-b border-neutral-200 px-5 py-3'>
			<div className='flex items-center justify-between mb-3'>
				<div>
					<h1 className='text-[15px] font-semibold text-neutral-900'>
						Candidates
					</h1>
					<p className='text-[11px] text-neutral-500 mt-0.5'>
						{filteredCount} candidate{filteredCount !== 1 ? "s" : ""}
						{selectedCount > 0 && ` • ${selectedCount} selected`}
						<span className='ml-2 text-neutral-400'>
							• Click any field to edit inline
						</span>
					</p>
				</div>
			</div>

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
					onClick={onOpenAddCandidate}
				>
					<Plus className='w-3.5 h-3.5' />
					Add Candidate
				</Button>
			</div>

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
	);
}