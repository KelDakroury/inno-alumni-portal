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
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';

/**
 * Component representing the side navigation bar.
 * @param {Object} props - Props for the SideNav component.
 * @param {Function} props.onClose - Function to handle closing the side navigation.
 * @param {boolean} props.open - Whether the side navigation is open.
 * @returns {JSX.Element} - The rendered side navigation.
 */
export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // Content for the side navigation
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Logo */}
          <Box
            component={NextLink}
            href="/admin"
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
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
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
            {/* Render side navigation items */}
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
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          {/* Report bug section */}
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Want to report a bug to the Alumni Developers
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            {/* Telegram group link */}
            Use this <a href="https://t.me/+54TTT9VXGZMyMGIy"
              target="_blank"
              style={{ color: '#40BA21' }}
              rel="noreferrer"> Telegram group chat</a>
          </Typography>
        </Box>
      </Box>
    </Scrollbar>
  );

  // Render different drawer based on screen size
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
  }

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
};

// Prop types for the SideNav component
SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
