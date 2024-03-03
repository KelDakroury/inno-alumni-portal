import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import Link from 'next/link';

/**
 * Component for displaying the account popover menu.
 * @param {Object} props - Props for the AccountPopover component.
 * @param {Element} props.anchorEl - The anchor element for the popover.
 * @param {Function} props.onClose - Callback function to handle popover close.
 * @param {boolean} props.open - Boolean indicating whether the popover is open.
 * @returns {JSX.Element} - The rendered account popover component.
 */
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  /**
   * Handles the sign out action.
   */
  const handleSignOut = useCallback(() => {
    onClose?.(); // Close the popover
    auth.signOut(); // Sign out the user
    router.push('/auth/login'); // Redirect to the login page
  }, [onClose, auth, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        {/* Display user account name with a link to manage account */}
        <Typography variant="overline">
          Account
        </Typography>
        <Typography color="text.secondary" variant="body2">
          <Link href="/manage_account" style={{ textDecoration: "none", color: "grey" }}>
            {auth.user.name}
          </Link>
        </Typography>
      </Box>
      <Divider />
      {/* Menu items for sign out */}
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

// Prop types for the AccountPopover component
AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
