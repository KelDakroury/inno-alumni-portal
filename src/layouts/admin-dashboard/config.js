import { ChartBarIcon, CreditCardIcon, RectangleStackIcon, CommandLineIcon, UserIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import { SvgIcon } from '@mui/material';

/**
 * Array of objects representing items for an admin dashboard navigation menu.
 * Each item contains a title, a path, and an icon.
 * @type {Array<object>}
 */
export const items = [
  {
    title: 'Overview',
    path: '/admin',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Pass Requests',
    path: '/admin/pass_requests',
    icon: (
      <SvgIcon fontSize="small">
        <CreditCardIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Elective Requests',
    path: '/admin/elective_requests',
    icon: (
      <SvgIcon fontSize="small">
        <RectangleStackIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Manage Elective Courses',
    path: '/admin/electives',
    icon: (
      <SvgIcon fontSize="small">
        <CommandLineIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Manage Donation',
    path: '/admin/donations',
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/admin/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  }
];
