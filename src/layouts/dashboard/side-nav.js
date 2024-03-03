import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
import { useCallback } from 'react';

/**
 * SideNav component displays a navigation sidebar with links to different sections of the application.
 * It also includes a "Sign Out" button and bug reporting information.
 * 
 * @param {object} props - The properties of the SideNav component.
 * @param {boolean} props.open - Boolean indicating whether the sidebar is open.
 * @param {function} props.onClose - Function to handle the closing of the sidebar.
 * 
 * @returns {JSX.Element} - JSX element representing the SideNav component.
 */
export const SideNav = (props) => {
  // Destructure props
  const { open, onClose } = props;

  // Get the current pathname
  const pathname = usePathname();

  // Check if screen size is large up
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // Get router and authentication context
  const router = useRouter();
  const auth = useAuth();

  /**
   * Function to handle user sign out.
   */
  const handleSignOut = useCallback(() => {
    onClose?.(); // Close the sidebar
    auth.signOut(); // Sign out the user
    router.push('/auth/login'); // Redirect to login page
  }, [onClose, auth, router]);

  // JSX content for the sidebar
  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      {/* Sidebar content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <img
              alt=""
              src="/assets/logos/innopolis-logo.png"
            />
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        {/* Navigation links */}
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between"
          }}
        >
          <Stack
            component="ul"
            spacing={2}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {/* Mapping through navigation items */}
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
          {/* Sign Out button */}
          <Stack sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'neutral.500'
          }}
            onClick={handleSignOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28, marginBottom: 6, fontWeight: 600 }} className="w-6 h-6">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            <Typography sx={{
              fontSize: 14,
              fontWeight: 600,
            }}>
              Sign Out
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        {/* Bug reporting information */}
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Want to report a bug to the Alumni Developer Team
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Use this  <a href="https://t.me/+54TTT9VXGZMyMGIy"
              target="_blank"
              style={{ color: '#40BA21' }}
              rel="noreferrer"> Telegram group chat</a>
          </Typography>
        </Box>
      </Box>
    </Scrollbar>
  );

  // Render sidebar based on screen size
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  } else {
    return (
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="temporary"
      >
        {content}
      </Drawer>
    );
  }
};

// Prop types for the SideNav component
SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
