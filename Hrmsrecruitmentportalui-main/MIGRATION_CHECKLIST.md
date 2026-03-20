# Migration Checklist

## Overview
This checklist tracks the migration from the legacy `/src/app` structure to the new feature-based architecture.

## Phase 1: Core Setup ✅

- [x] Install required packages (formik, yup, @reduxjs/toolkit, react-redux)
- [x] Create `/src/App.tsx` with Redux & MUI providers
- [x] Create `/src/store.ts` with all reducers
- [x] Create `/src/theme/theme.ts` with MUI theme
- [x] Create `/src/Routes/router.tsx`
- [x] Create all Redux slices structure
- [x] Create core utilities and helpers
- [x] Create common components (LoadingSpinner, EmptyState, PageHeader)
- [x] Create Constants (candidateStages, roles)
- [x] Create API client structure
- [x] Create context providers (AuthContext)
- [x] Create custom hooks (useRedux, useAuth)

## Phase 2: Layout ✅

- [x] Migrate `/src/layout/LayoutEnhanced.tsx`
- [x] Verify navigation structure
- [x] Verify route protection

## Phase 3: Authentication Pages ✅

- [x] Migrate Login page to `/src/pages/Authentication/Login/`
- [x] Create Login validationSchema.ts
- [x] Migrate ForgotPassword page
- [x] Update imports in router

## Phase 4: Dashboard ⏳

- [ ] Migrate Dashboard page to `/src/pages/Dashboard/`
- [ ] Extract dashboard components
- [ ] Create dashboard validations (if needed)
- [ ] Test dashboard functionality

## Phase 5: Candidates Module ⏳

### Pages
- [ ] Migrate CandidatesComplete to `/src/pages/Recruitment/Candidates/`
- [ ] Migrate CandidatesWorkflowDemo
- [x] Create validationSchema.ts

### Components
- [ ] Extract CandidateTable component
- [ ] Extract CandidateFilters component
- [ ] Extract BulkActionsToolbar component
- [ ] Extract CandidateDetailModal component
- [ ] Extract CandidateForm component
- [ ] Extract TechnicalFeedbackForm component

### State & API
- [x] Create candidatesSlice.ts
- [x] Create candidates API functions
- [ ] Integrate API with components
- [ ] Test state management

## Phase 6: Pipeline Module ⏳

### Pages
- [ ] Migrate PipelineComplete to `/src/pages/Recruitment/Pipeline/`

### Components
- [ ] Extract PipelineBoard component
- [ ] Extract PipelineColumn component
- [ ] Extract CandidateCard component
- [ ] Extract StageHeader component

### State
- [x] Create pipelineSlice.ts
- [ ] Integrate drag-and-drop functionality
- [ ] Test pipeline workflow

## Phase 7: Job Openings ⏳

### Pages
- [ ] Migrate JobOpenings to `/src/pages/Recruitment/JobOpenings/`
- [x] Create validationSchema.ts

### Components
- [ ] Extract JobTable component
- [ ] Extract JobForm component
- [ ] Extract JobDetailView component

### State & API
- [x] Create jobOpeningsSlice.ts
- [ ] Create jobs API functions
- [ ] Integrate API with components

## Phase 8: Users & Permissions ⏳

### Pages
- [ ] Migrate UsersEnhanced to `/src/pages/Recruitment/UsersPermissions/`
- [x] Create validationSchema.ts

### Components
- [ ] Extract UserTable component
- [ ] Extract UserForm component
- [ ] Extract PermissionsMatrix component
- [ ] Extract RoleSelector component

### State & API
- [x] Create usersPermissionsSlice.ts
- [ ] Create users API functions
- [ ] Implement permission checking

## Phase 9: Email Templates ⏳

### Pages
- [ ] Migrate EmailTemplates to `/src/pages/Recruitment/EmailTemplates/`
- [x] Create validationSchema.ts

### Components
- [ ] Extract TemplateList component
- [ ] Extract TemplateEditor component (with RichTextEditor)
- [ ] Extract TemplatePreview component
- [ ] Extract SendEmailModal component

### State & API
- [x] Create emailTemplatesSlice.ts
- [ ] Create email templates API functions

## Phase 10: Settings ⏳

### Pages
- [ ] Migrate Settings to `/src/pages/Recruitment/Settings/`
- [x] Create validationSchema.ts

### Components
- [ ] Extract CompanySettings component
- [ ] Extract SystemSettings component
- [ ] Extract NotificationSettings component

### State & API
- [x] Create settingsSlice.ts
- [ ] Create settings API functions

## Phase 11: Additional Pages ⏳

### Interviewer Portal
- [ ] Migrate InterviewerPortal to `/src/pages/Recruitment/Interviewer/`
- [ ] Create interviewer-specific components
- [ ] Test role-based access

### Resume Viewer
- [ ] Migrate ResumeViewer to `/src/pages/Recruitment/Resume/`
- [ ] Test resume display functionality

## Phase 12: UI Components Migration ⏳

### From /src/app/components/ui
- [ ] Audit which components are actually used
- [ ] Copy used components to `/src/components/ui/`
- [ ] Update import paths
- [ ] Remove unused components

### Special Components
- [ ] Migrate RichTextEditor to `/src/components/common/`
- [ ] Verify all Lucide icons imports

## Phase 13: Data & Mock Data ⏳

- [ ] Review `/src/app/data/` folder
- [ ] Move mock data to appropriate feature folders or `/src/common/mockData/`
- [ ] Update imports

## Phase 14: Type Definitions ⏳

- [ ] Create comprehensive types in `/src/common/types.ts`
- [ ] Create feature-specific types in respective folders
- [ ] Export all types properly
- [ ] Remove duplicate type definitions

## Phase 15: Testing & Cleanup ⏳

### Testing
- [ ] Test all routes work correctly
- [ ] Test authentication flow
- [ ] Test candidate workflow end-to-end
- [ ] Test pipeline drag-and-drop
- [ ] Test form validations
- [ ] Test bulk actions
- [ ] Test email sending
- [ ] Test user permissions
- [ ] Test mobile responsiveness

### Cleanup
- [ ] Remove all temporary re-export files
- [ ] Delete `/src/app/` folder
- [ ] Remove unused dependencies
- [ ] Clean up console warnings
- [ ] Verify no broken imports

## Phase 16: Documentation ⏳

- [x] Create STRUCTURE.md
- [x] Create DEVELOPER_GUIDE.md
- [x] Create MIGRATION_CHECKLIST.md
- [ ] Add inline code comments
- [ ] Document complex business logic
- [ ] Create API documentation
- [ ] Update README.md (if exists)

## Phase 17: Optimization ⏳

- [ ] Implement code splitting for large pages
- [ ] Add lazy loading for heavy components
- [ ] Optimize Redux selectors with memoization
- [ ] Review and optimize re-renders
- [ ] Add performance monitoring

## Phase 18: Final Review ✅

- [ ] Code review
- [ ] QA testing
- [ ] Performance testing
- [ ] Security review
- [ ] Accessibility check
- [ ] Browser compatibility testing

---

## Notes

### Current Status: **Phase 1-3 Complete**

**Completed:**
- Core infrastructure setup
- Redux store with all slices
- MUI theme configuration
- Authentication pages migrated
- Validation schemas for all features
- API client structure
- Utilities and helpers
- Common components

**Next Priority:**
1. Dashboard migration
2. Candidates module migration
3. UI component extraction

### Blockers
- None currently

### Dependencies
- All packages installed ✅
- Theme configured ✅
- Store configured ✅

### Testing Strategy
- Manual testing during migration
- Automated tests to be added after migration complete

---

**Last Updated:** March 18, 2026
