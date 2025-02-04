import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';

/**
 * Layout component for the application.
 * @param {Object} props - Props for the Layout component.
 * @param {React.ReactNode} props.children - The children components to be rendered inside the layout.
 * @returns {JSX.Element} - The rendered layout component.
 */
export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        {/* Left side */}
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Header */}
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            {/* Logo */}
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <Logo />
              <img
                alt=""
                src="/assets/logos/innopolis-favicon.png"
              />
            </Box>
          </Box>
          {/* Content */}
          {children}
        </Grid>
        {/* Right side */}
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          {/* Right side content */}
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Welcome to{' '}
              {/* Link */}
              <Box
                component="a"
                sx={{ color: '#41BA21' }}
                target="_blank"
              >
                IU Alumni Portal
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              The stay in touch with university related activities.
            </Typography>
            {/* Image */}
            <img
              style={{ height: 300, justifyItems: 'center', marginTop: 40, borderRadius: 15 }}
              alt=""
              src="/assets/innopolis-alumni-photo.jpeg"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Prop types for the Layout component
Layout.prototypes = {
  children: PropTypes.node
};
