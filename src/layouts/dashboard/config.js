import { ChartBarIcon, CreditCardIcon, RectangleStackIcon, CommandLineIcon, UserIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import { SvgIcon } from '@mui/material';

/**
 * Array of navigation items with icons.
 */
export const items = [
  {
    title: 'Overview', // Title of the navigation item
    path: '/', // Path associated with the navigation item
    icon: ( // Icon component associated with the navigation item
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Request Pass',
    path: '/manage_pass',
    icon: (
      <SvgIcon fontSize="small">
        <CreditCardIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Request Elective',
    path: '/manage_electives',
    icon: (
      <SvgIcon fontSize="small">
        <RectangleStackIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Make Donations',
    path: '/make_donations',
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/manage_account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  }
];
