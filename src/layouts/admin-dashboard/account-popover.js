import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

/**
 * Component for rendering account popover.
 * @param {object} props - Component props.
 * @param {any} props.anchorEl - The anchor element for the popover.
 * @param {function} props.onClose - Function to handle popover close event.
 * @param {boolean} props.open - Boolean indicating whether the popover is open.
 * @returns {JSX.Element} Account popover component.
 */
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  // Callback function to handle sign out
  const handleSignOut = useCallback(
    () => {
      onClose?.(); // Call onClose function if provided
      auth.signOut(); // Call signOut function from auth context
      router.push('/auth/login'); // Redirect to login page
    },
    [onClose, auth, router]
  );

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
        {/* Display account information */}
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Daniel Atonge {/* Replace with actual user name */}
        </Typography>
      </Box>
      <Divider />
      {/* Menu list for account actions */}
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
        {/* MenuItem for sign out */}
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

// PropTypes for AccountPopover component
AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
