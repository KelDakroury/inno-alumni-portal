import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';

/**
 * Component representing a single item in the side navigation bar.
 * @param {Object} props - Props for the SideNavItem component.
 * @param {boolean} props.active - Whether the item is currently active.
 * @param {boolean} props.disabled - Whether the item is disabled.
 * @param {boolean} props.external - Whether the item is an external link.
 * @param {node} props.icon - Icon component for the item.
 * @param {string} props.path - Path for the item's link.
 * @param {string} props.title - Title for the item.
 * @returns {JSX.Element} - The rendered side navigation item.
 */
export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  // Determine link properties based on whether the item is external or not
  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      {/* ButtonBase element for the side navigation item */}
      <ButtonBase
        // Styling for the side navigation item
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
        {...linkProps} // Spread link properties
      >
        {/* Icon for the side navigation item */}
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            {icon}
          </Box>
        )}
        {/* Title for the side navigation item */}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

// Prop types for the SideNavItem component
SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
