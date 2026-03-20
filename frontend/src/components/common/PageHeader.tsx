import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  breadcrumbs, 
  actions 
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs sx={{ mb: 1 }} separator="›">
          {breadcrumbs.map((item, index) => (
            item.href ? (
              <Link
                key={index}
                component={RouterLink}
                to={item.href}
                underline="hover"
                color="text.secondary"
                fontSize="13px"
              >
                {item.label}
              </Link>
            ) : (
              <Typography key={index} color="text.primary" fontSize="13px">
                {item.label}
              </Typography>
            )
          ))}
        </Breadcrumbs>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom={!!subtitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
    </Box>
  );
};
