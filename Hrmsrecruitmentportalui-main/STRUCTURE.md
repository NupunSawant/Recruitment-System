# HRMS Recruitment Portal - Project Structure

## Overview
This document outlines the complete folder structure for the Metaphi Innovations HRMS Recruitment Portal, following feature-based architecture with React + TypeScript + MUI.

## Root Structure

```
src/
├── App.tsx                          # Main App component with Redux & MUI providers
├── store.ts                         # Redux store configuration
├── theme/                           # MUI theme configuration
│   └── theme.ts                     # Enterprise theme with calm color palette
├── Routes/                          # Application routing
│   └── router.tsx                   # React Router configuration
├── pages/                           # Page components (feature-based)
│   ├── Authentication/
│   ├── Dashboard/
│   └── Recruitment/
├── components/                      # Reusable components
│   └── ui/                          # UI component library (shadcn-based)
├── layout/                          # Layout components
│   └── LayoutEnhanced.tsx          # Main application layout with sidebar
├── slices/                          # Redux slices (feature-based)
│   ├── Authentication/
│   ├── Dashboard/
│   └── Recruitment/
├── api/                             # API client & services
│   ├── client.ts
│   ├── auth.ts
│   └── candidates.ts
├── hooks/                           # Custom React hooks
│   ├── useRedux.ts
│   └── useAuth.ts
├── context/                         # React Context providers
│   └── AuthContext.tsx
├── helpers/                         # Helper functions
│   ├── permissions.ts
│   └── validators.ts
├── utils/                           # Utility functions
│   ├── dateUtils.ts
│   └── stringUtils.ts
├── Constants/                       # Application constants
│   ├── candidateStages.ts
│   └── roles.ts
├── config/                          # Configuration files
│   └── api.ts
├── common/                          # Common types & interfaces
│   └── types.ts
└── app/                            # Legacy folder (to be migrated)
```

## Detailed Feature Structure

### Authentication Module
```
src/pages/Authentication/
├── Login/
│   ├── index.tsx                   # Login page component
│   └── validationSchema.ts         # Yup validation for login form
└── ForgotPassword.tsx              # Password reset page
```

### Dashboard Module
```
src/pages/Dashboard/
└── index.tsx                       # Dashboard page with stats & charts
```

### Recruitment Module (Feature-Based)

#### Candidates
```
src/pages/Recruitment/Candidates/
├── CandidatesComplete.tsx          # Main candidates list page
├── CandidatesWorkflowDemo.tsx      # Candidate workflow demo
└── validationSchema.ts             # Candidate form validations

src/slices/Recruitment/Candidates/
└── candidatesSlice.ts              # Redux state management

src/components/Recruitment/Candidates/
├── CandidateTable/                 # Table component
├── CandidateFilters/               # Filter component
├── BulkActions/                    # Bulk action component
└── CandidateDetailModal/           # Detail view modal
```

#### Pipeline
```
src/pages/Recruitment/Pipeline/
└── PipelineComplete.tsx            # Kanban-style pipeline view

src/slices/Recruitment/Pipeline/
└── pipelineSlice.ts                # Pipeline state management
```

#### Job Openings
```
src/pages/Recruitment/JobOpenings/
├── index.tsx                       # Job openings list
└── validationSchema.ts             # Job form validations

src/slices/Recruitment/JobOpenings/
└── jobOpeningsSlice.ts             # Job openings state
```

#### Users & Permissions
```
src/pages/Recruitment/UsersPermissions/
├── UsersEnhanced.tsx               # Users management page
└── validationSchema.ts             # User form validations

src/slices/Recruitment/UsersPermissions/
└── usersPermissionsSlice.ts        # Users state management
```

#### Email Templates
```
src/pages/Recruitment/EmailTemplates/
├── index.tsx                       # Email templates page
└── validationSchema.ts             # Template validations

src/slices/Recruitment/EmailTemplates/
└── emailTemplatesSlice.ts          # Email templates state
```

#### Settings
```
src/pages/Recruitment/Settings/
├── index.tsx                       # Settings page
└── validationSchema.ts             # Settings validations

src/slices/Recruitment/Settings/
└── settingsSlice.ts                # Settings state
```

## Redux Store Structure

```typescript
store = {
  auth: AuthState,
  dashboard: DashboardState,
  candidates: CandidatesState,
  jobOpenings: JobOpeningsState,
  pipeline: PipelineState,
  usersPermissions: UsersPermissionsState,
  emailTemplates: EmailTemplatesState,
  settings: SettingsState,
}
```

## API Structure

```
src/api/
├── client.ts                       # Base API client
├── auth.ts                         # Authentication API
├── candidates.ts                   # Candidates API
├── jobs.ts                         # Job openings API (to be created)
├── users.ts                        # Users API (to be created)
└── index.ts                        # Barrel export
```

## Constants

```
src/Constants/
├── candidateStages.ts              # Candidate stage definitions
├── roles.ts                        # User roles & permissions
└── index.ts                        # Barrel export
```

## Form Validation Pattern

All forms use **Formik** for form management and **Yup** for validation.

Example structure:
```typescript
// validationSchema.ts
export const entityValidationSchema = Yup.object().shape({
  field: Yup.string().required('Error message'),
});

// Component usage
import { Formik } from 'formik';
import { entityValidationSchema } from './validationSchema';
```

## Naming Conventions

- **Pages**: PascalCase (e.g., `CandidatesComplete.tsx`)
- **Components**: PascalCase (e.g., `CandidateTable.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utils**: camelCase (e.g., `dateUtils.ts`)
- **Constants**: UPPER_SNAKE_CASE for values, camelCase for files
- **Redux Slices**: camelCase with `Slice` suffix (e.g., `candidatesSlice.ts`)
- **Types**: PascalCase interfaces (e.g., `Candidate`)

## Import Path Rules

1. **Absolute imports from `src`**: Use relative paths
2. **Components**: Import from closest common ancestor
3. **UI Library**: `from '../../components/ui/button'`
4. **Utils/Helpers**: `from '../../utils'` or `from '../../helpers'`
5. **Constants**: `from '../../Constants'`
6. **Types**: `from '../../common/types'`

## Key Features by Module

### Candidates Module
- Multi-select with bulk actions
- Stage-based filtering
- Candidate detail view with tabs
- Resume viewer
- Technical feedback form
- Email integration

### Pipeline Module
- Kanban board view
- Drag & drop functionality
- Stage-based workflow
- Status updates

### Job Openings Module
- Job posting management
- Application tracking
- Status management

### Users & Permissions Module
- User management
- Role assignment
- Permission control

### Email Templates Module
- Template management
- Variable support
- Preview functionality

### Settings Module
- Company settings
- System preferences
- Notification settings

## Migration Status

- ✅ Core structure created
- ✅ Redux store configured
- ✅ MUI theme setup
- ✅ Routes configured
- ✅ Authentication pages migrated
- ⏳ Other pages using temporary re-exports
- ⏳ Component library to be organized
- ⏳ API integration to be completed

## Next Steps

1. Migrate remaining pages from `/src/app/pages` to feature-based structure
2. Extract reusable components into `/src/components`
3. Implement full API integration
4. Add comprehensive type definitions
5. Create unit tests for utilities and helpers
6. Remove legacy `/src/app` folder after migration
