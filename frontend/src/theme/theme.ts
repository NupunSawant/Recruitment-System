import { createTheme } from '@mui/material/styles';

// Enterprise HRMS theme with calm color palette
export const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90A4', // Muted teal/blue
      light: '#6BA7B8',
      dark: '#357388',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748B', // Slate gray
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10B981', // Soft green
      light: '#34D399',
      dark: '#059669',
    },
    error: {
      main: '#EF4444', // Soft red
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B', // Amber
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6', // Blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: '#F9FAFB', // Very light grey
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827', // Almost black
      secondary: '#6B7280', // Medium grey
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 13,
    h1: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '13px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '12px',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '13px',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          padding: '4px 10px',
          fontSize: '12px',
        },
        sizeMedium: {
          padding: '6px 16px',
          fontSize: '13px',
        },
        sizeLarge: {
          padding: '8px 22px',
          fontSize: '14px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            padding: '8px 16px',
            fontSize: '13px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          height: '24px',
        },
      },
    },
  },
});
