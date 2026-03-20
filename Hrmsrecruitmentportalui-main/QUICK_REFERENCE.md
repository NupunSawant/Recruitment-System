# Quick Reference Guide

## File Locations Cheat Sheet

### 📁 Where do I put...?

| What | Where | Example |
|------|-------|---------|
| A new page | `/src/pages/[Feature]/` | `/src/pages/Recruitment/Candidates/` |
| A reusable component | `/src/components/[Feature]/` | `/src/components/Recruitment/Candidates/CandidateTable.tsx` |
| A common UI component | `/src/components/common/` | `/src/components/common/LoadingSpinner.tsx` |
| Redux state | `/src/slices/[Feature]/` | `/src/slices/Recruitment/Candidates/candidatesSlice.ts` |
| API calls | `/src/api/` | `/src/api/candidates.ts` |
| Form validation | Same folder as form + `validationSchema.ts` | `/src/pages/Recruitment/Candidates/validationSchema.ts` |
| Constants | `/src/Constants/` | `/src/Constants/candidateStages.ts` |
| Utilities (pure functions) | `/src/utils/` | `/src/utils/dateUtils.ts` |
| Helpers (business logic) | `/src/helpers/` | `/src/helpers/permissions.ts` |
| Types (common) | `/src/common/types.ts` | `export interface User {...}` |
| Types (feature-specific) | Same folder as feature | `/src/pages/Recruitment/Candidates/types.ts` |
| Custom hooks | `/src/hooks/` | `/src/hooks/useAuth.ts` |
| Context providers | `/src/context/` | `/src/context/AuthContext.tsx` |
| Routes | `/src/Routes/router.tsx` | Add route configuration |
| Layout components | `/src/layout/` | `/src/layout/LayoutEnhanced.tsx` |
| Theme/styles | `/src/theme/` | `/src/theme/theme.ts` |
| Config | `/src/config/` | `/src/config/api.ts` |

## 🔧 Common Code Patterns

### Creating a New Page

```typescript
// /src/pages/MyFeature/index.tsx
import { Box } from '@mui/material';
import { PageHeader } from '../../components/common';

export function MyFeature() {
  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="My Feature" />
      {/* Your content */}
    </Box>
  );
}

// /src/pages/MyFeature.tsx (re-export)
export { MyFeature } from './index';
```

### Creating a Form with Validation

```typescript
// validationSchema.ts
import * as Yup from 'yup';

export const myFormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
});

// MyForm.tsx
import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import { myFormSchema } from './validationSchema';

export function MyForm() {
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={myFormSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
```

### Redux Slice

```typescript
// /src/slices/MyFeature/myFeatureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyFeatureState {
  items: any[];
  loading: boolean;
}

const initialState: MyFeatureState = {
  items: [],
  loading: false,
};

const myFeatureSlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setItems, setLoading } = myFeatureSlice.actions;
export const myFeatureReducer = myFeatureSlice.reducer;
```

### Using Redux in Component

```typescript
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { setItems } from '../../slices/MyFeature/myFeatureSlice';

export function MyComponent() {
  const items = useAppSelector(state => state.myFeature.items);
  const loading = useAppSelector(state => state.myFeature.loading);
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(setItems(newItems));
  };

  return <div>{/* UI */}</div>;
}
```

### API Functions

```typescript
// /src/api/myFeature.ts
import { apiClient } from './client';
import { API_ENDPOINTS } from '../config/api';

export const myFeatureApi = {
  getAll: async () => {
    return apiClient.get('/my-feature');
  },
  
  getById: async (id: string) => {
    return apiClient.get(`/my-feature/${id}`);
  },
  
  create: async (data: any) => {
    return apiClient.post('/my-feature', data);
  },
  
  update: async (id: string, data: any) => {
    return apiClient.put(`/my-feature/${id}`, data);
  },
  
  delete: async (id: string) => {
    return apiClient.delete(`/my-feature/${id}`);
  },
};
```

### Adding a Route

```typescript
// /src/Routes/router.tsx
import { MyFeature } from '../pages/MyFeature';

// In children array:
{ path: 'my-feature', element: <MyFeature /> }
```

### Adding Navigation Link

```typescript
// /src/layout/LayoutEnhanced.tsx
import { MyIcon } from 'lucide-react';

const navItems = [
  // ... existing items
  { path: '/my-feature', label: 'My Feature', icon: MyIcon },
];
```

## 📦 Import Patterns

```typescript
// MUI Components
import { Box, Typography, Button, TextField } from '@mui/material';

// MUI Icons
import { AddCircle, Edit, Delete } from '@mui/icons-material';

// Lucide Icons  
import { User, Settings, LogOut } from 'lucide-react';

// Formik
import { Formik, Form, Field } from 'formik';

// Yup
import * as Yup from 'yup';

// Redux
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';

// React Router
import { useNavigate, useParams, Link } from 'react-router';

// Common components
import { PageHeader, LoadingSpinner, EmptyState } from '../../components/common';

// Constants
import { CANDIDATE_STAGES, USER_ROLES } from '../../Constants';

// Utils
import { formatDate, formatPhoneNumber } from '../../utils';

// Helpers
import { hasPermission } from '../../helpers';

// API
import { candidatesApi } from '../../api';
```

## 🎨 MUI Common Patterns

### Layout Box
```typescript
<Box sx={{ p: 3, bgcolor: 'background.default' }}>
  {/* content */}
</Box>
```

### Flex Container
```typescript
<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  {/* items */}
</Box>
```

### Grid Layout
```typescript
<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
  {/* items */}
</Box>
```

### Card
```typescript
<Box sx={{ 
  p: 2, 
  bgcolor: 'background.paper', 
  borderRadius: 1,
  boxShadow: 1 
}}>
  {/* content */}
</Box>
```

### Responsive Padding
```typescript
<Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
  {/* content */}
</Box>
```

## 🔑 Constants Reference

### Candidate Stages
```typescript
import { CANDIDATE_STAGES, CANDIDATE_STAGE_LABELS, CANDIDATE_STAGE_COLORS } from '../../Constants';

CANDIDATE_STAGES.SCREENING // 'screening'
CANDIDATE_STAGE_LABELS[CANDIDATE_STAGES.SCREENING] // 'Screening'
CANDIDATE_STAGE_COLORS[CANDIDATE_STAGES.SCREENING] // '#3B82F6'
```

### User Roles
```typescript
import { USER_ROLES, USER_ROLE_LABELS, PERMISSIONS } from '../../Constants';

USER_ROLES.ADMIN // 'admin'
USER_ROLE_LABELS[USER_ROLES.ADMIN] // 'Admin'
PERMISSIONS.VIEW_CANDIDATES // 'view_candidates'
```

## 🛠️ Common Utility Functions

```typescript
// Date formatting
import { formatDate, formatDateTime, getRelativeTime } from '../../utils';
formatDate('2026-03-18') // 'Mar 18, 2026'
getRelativeTime('2026-03-17') // '1 day ago'

// String utilities
import { formatPhoneNumber, getInitials, truncateText } from '../../utils';
formatPhoneNumber('1234567890') // '(123) 456-7890'
getInitials('John Doe') // 'JD'

// Validation
import { isEmailValid, isPhoneValid } from '../../helpers/validators';
isEmailValid('test@example.com') // true

// Permissions
import { hasPermission } from '../../helpers/permissions';
hasPermission('admin', 'view_candidates') // true
```

## 📋 Validation Schema Examples

```typescript
import * as Yup from 'yup';

// String
field: Yup.string()
  .min(2, 'Too short')
  .max(50, 'Too long')
  .required('Required'),

// Email
email: Yup.string()
  .email('Invalid email')
  .required('Required'),

// Number
age: Yup.number()
  .min(18, 'Must be 18+')
  .max(100, 'Invalid age')
  .required('Required'),

// Phone
phone: Yup.string()
  .matches(/^[0-9]{10}$/, 'Must be 10 digits')
  .required('Required'),

// URL
website: Yup.string()
  .url('Invalid URL')
  .nullable(),

// Select/Enum
role: Yup.string()
  .oneOf(['admin', 'user'], 'Invalid role')
  .required('Required'),

// Array
tags: Yup.array()
  .of(Yup.string())
  .min(1, 'At least one tag')
  .required('Required'),

// Conditional
field: Yup.string()
  .when('otherField', {
    is: 'value',
    then: (schema) => schema.required('Required when other is value'),
  }),
```

## 🚀 Quick Commands

```bash
# Install package
pnpm add package-name

# Install dev package
pnpm add -D package-name

# Run dev server
pnpm run dev

# Build for production
pnpm run build
```

## 📞 Need Help?

1. Check `/STRUCTURE.md` for architecture
2. Check `/DEVELOPER_GUIDE.md` for detailed patterns
3. Check `/MIGRATION_CHECKLIST.md` for migration status
4. Look at existing implementations
5. Ask the team
