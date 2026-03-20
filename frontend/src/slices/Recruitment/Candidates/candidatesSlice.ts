import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  stage: 'screening' | 'interview' | 'technical' | 'offer' | 'rejected' | 'joined';
  status: string;
  appliedDate: string;
  resumeUrl?: string;
  experience: string;
  location: string;
}

interface CandidatesState {
  candidates: Candidate[];
  selectedCandidates: string[];
  loading: boolean;
  filters: {
    stage: string;
    position: string;
    search: string;
  };
}

const initialState: CandidatesState = {
  candidates: [],
  selectedCandidates: [],
  loading: false,
  filters: {
    stage: '',
    position: '',
    search: '',
  },
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<Candidate[]>) => {
      state.candidates = action.payload;
    },
    selectCandidate: (state, action: PayloadAction<string>) => {
      state.selectedCandidates.push(action.payload);
    },
    deselectCandidate: (state, action: PayloadAction<string>) => {
      state.selectedCandidates = state.selectedCandidates.filter(id => id !== action.payload);
    },
    updateCandidateStage: (state, action: PayloadAction<{ id: string; stage: string }>) => {
      const candidate = state.candidates.find(c => c.id === action.payload.id);
      if (candidate) {
        candidate.stage = action.payload.stage as any;
      }
    },
  },
});

export const { setCandidates, selectCandidate, deselectCandidate, updateCandidateStage } = candidatesSlice.actions;
export const candidatesReducer = candidatesSlice.reducer;
