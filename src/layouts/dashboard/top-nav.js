import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  // Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import Avatar from "boring-avatars";
import { useAuth } from 'src/hooks/use-auth';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

/**
 * TopNav component represents the top navigation bar of the application.
 * It includes elements such as the menu toggle button and user avatar.
 * 
 * @param {object} props - The properties of the TopNav component.
 * @param {function} props.onNavOpen - Function to handle the opening of the side navigation.
 * 
 * @returns {JSX.Element} - JSX element representing the TopNav component.
 */
export const TopNav = (props) => {
  // Destructure props
  const { onNavOpen } = props;

  // Check if screen size is large up
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // Get user information from authentication context
  const { user } = useAuth();

  // Initialize popover for account menu
  const accountPopover = usePopover();

  return (
    <>
      {/* Top navigation bar */}
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        {/* Stack for arranging elements */}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          {/* Stack for menu toggle button */}
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {/* Menu toggle button */}
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          {/* Stack for user avatar */}
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {/* User avatar */}
            <span onClick={accountPopover.handleOpen} style={{ cursor: 'pointer' }} ref={accountPopover.anchorRef} >
              <Avatar
                variant='beam'
                size={40}
                name={user.name}
              />
            </span>
          </Stack>
        </Stack>
      </Box>
      {/* Account popover menu */}
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

// Prop types for the TopNav component
TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
