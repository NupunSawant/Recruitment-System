# HRMS Recruitment Portal - Developer Guide

## Project Overview

Enterprise HRMS Recruitment Portal for Metaphi Innovations built with:
- **React 18.3** with TypeScript
- **MUI (Material-UI) 7.x** - Component library
- **Redux Toolkit** - State management
- **Formik + Yup** - Form handling & validation
- **React Router 7.x** - Routing (Data mode)

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (package manager)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```

## Architecture Principles

### 1. Feature-Based Structure
All features follow consistent organization across:
- `pages/` - Page components
- `components/` - Reusable components
- `slices/` - Redux state
- `Routes/` - Route definitions

### 2. Form Pattern (Formik + Yup)

**Every form must:**
1. Use Formik for form state
2. Define validation in `validationSchema.ts`
3. Follow MUI component patterns

Example:
```typescript
// validationSchema.ts
import * as Yup from 'yup';

export const myFormSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  name: Yup.string().min(2).required('Name is required'),
});

// MyForm.tsx
import { Formik, Form } from 'formik';
import { myFormSchema } from './validationSchema';

<Formik
  initialValues={{ email: '', name: '' }}
  validationSchema={myFormSchema}
  onSubmit={(values) => console.log(values)}
>
  {/* form fields */}
</Formik>
```

### 3. Redux State Management

**Pattern:**
```typescript
// 1. Define slice in /src/slices/Feature/featureSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const featureSlice = createSlice({
  name: 'feature',
  initialState: {},
  reducers: {
    // actions
  },
});

export const { actions } = featureSlice.actions;
export const featureReducer = featureSlice.reducer;

// 2. Register in /src/store.ts
import { featureReducer } from './slices/Feature/featureSlice';

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
});

// 3. Use in components
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';

const data = useAppSelector(state => state.feature.data);
const dispatch = useAppDispatch();
```

### 4. MUI Theming

Theme defined in `/src/theme/theme.ts` with:
- Calm enterprise color palette
- Inter font family
- Compact sizing for business tools
- Consistent spacing

**Usage:**
```typescript
import { Box, Typography, Button } from '@mui/material';

<Box sx={{ p: 2, bgcolor: 'background.default' }}>
  <Typography variant="h4">Title</Typography>
  <Button variant="contained" color="primary">Action</Button>
</Box>
```

## File Organization Rules

### DO:
✅ Create feature-based folders
✅ Keep pages clean (composition only)
✅ Extract business logic to hooks/helpers
✅ Use validationSchema.ts for all forms
✅ Create index.ts barrel exports
✅ Follow consistent naming conventions

### DON'T:
❌ Mix UI and business logic in pages
❌ Create files outside the structure
❌ Skip validation schemas
❌ Use inline styles (use sx prop or theme)
❌ Hardcode values (use Constants/)

## Adding a New Feature

### Step-by-step:

1. **Create page structure**
```
src/pages/MyFeature/
├── index.tsx
├── validationSchema.ts
└── types.ts
```

2. **Create Redux slice**
```
src/slices/MyFeature/
└── myFeatureSlice.ts
```

3. **Register reducer in store**
```typescript
// src/store.ts
import { myFeatureReducer } from './slices/MyFeature/myFeatureSlice';

reducer: {
  myFeature: myFeatureReducer,
}
```

4. **Add route**
```typescript
// src/Routes/router.tsx
import { MyFeature } from '../pages/MyFeature';

children: [
  { path: 'my-feature', element: <MyFeature /> }
]
```

5. **Add navigation link** (if needed)
```typescript
// src/layout/LayoutEnhanced.tsx
const navItems = [
  { path: '/my-feature', label: 'My Feature', icon: IconName },
];
```

## Component Patterns

### Page Component
```typescript
// src/pages/MyFeature/index.tsx
import { PageHeader } from '../../components/common';

export function MyFeature() {
  return (
    <Box sx={{ p: 3 }}>
      <PageHeader 
        title="My Feature"
        subtitle="Feature description"
      />
      {/* content */}
    </Box>
  );
}
```

### Form Component
```typescript
import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import { mySchema } from './validationSchema';

export function MyForm() {
  return (
    <Formik
      initialValues={{ field: '' }}
      validationSchema={mySchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <TextField
            name="field"
            value={values.field}
            onChange={handleChange}
            error={touched.field && !!errors.field}
            helperText={touched.field && errors.field}
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}
```

## API Integration

### Pattern:
```typescript
// 1. Define API functions in /src/api/myFeature.ts
import { apiClient } from './client';

export const myFeatureApi = {
  getAll: async () => apiClient.get('/my-feature'),
  create: async (data) => apiClient.post('/my-feature', data),
};

// 2. Use in components or Redux thunks
import { myFeatureApi } from '../../api/myFeature';

const data = await myFeatureApi.getAll();
```

## Constants & Types

### Constants
```typescript
// src/Constants/myFeature.ts
export const MY_FEATURE_TYPES = {
  TYPE_A: 'type_a',
  TYPE_B: 'type_b',
} as const;

export const MY_FEATURE_LABELS = {
  [MY_FEATURE_TYPES.TYPE_A]: 'Type A',
  [MY_FEATURE_TYPES.TYPE_B]: 'Type B',
};
```

### Types
```typescript
// src/common/types.ts or feature-specific types.ts
export interface MyEntity {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}
```

## Utilities & Helpers

### Utilities (Pure functions)
```typescript
// src/utils/myUtil.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
```

### Helpers (Business logic)
```typescript
// src/helpers/myHelper.ts
export const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

## Testing Guidelines

### Unit Tests
- Test utilities and helpers
- Test Redux reducers
- Test validation schemas

### Component Tests
- Test user interactions
- Test form submissions
- Test conditional rendering

## Code Style

### TypeScript
- Use interfaces for object types
- Use type for unions/primitives
- Avoid `any` - use `unknown` if needed
- Export types alongside implementations

### Imports
- Group imports: React → Libraries → Local
- Use barrel exports (index.ts)
- Prefer named exports over default

### Naming
- Components: PascalCase
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

## Performance Best Practices

1. **Memoization**
```typescript
import { useMemo, useCallback } from 'react';

const filtered = useMemo(() => 
  data.filter(item => item.active), 
  [data]
);

const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

2. **Lazy Loading**
```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

## Troubleshooting

### Redux DevTools
Install Redux DevTools extension for debugging state

### Common Issues

**Issue:** "Module not found"
- Check import paths are relative from current file
- Verify barrel exports exist

**Issue:** "Type errors"
- Ensure types are exported and imported
- Check RootState and AppDispatch usage

**Issue:** "Form not validating"
- Verify validationSchema is passed to Formik
- Check field names match schema

## Migration Status

Current state: **In Progress**

- ✅ Structure defined
- ✅ Core files created
- ✅ Redux configured
- ✅ MUI theme setup
- ⏳ Pages being migrated
- ⏳ Components being extracted

## Resources

- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Formik](https://formik.org/docs/overview)
- [Yup](https://github.com/jquense/yup)
- [React Router](https://reactrouter.com/)

## Getting Help

For questions or issues:
1. Check this guide
2. Review STRUCTURE.md
3. Check existing implementations
4. Ask the team
