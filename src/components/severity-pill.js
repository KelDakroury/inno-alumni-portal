import PropTypes from 'prop-types'; // Importing PropTypes for defining prop types
import { styled } from '@mui/material/styles'; // Importing styled from '@mui/material/styles' for styling components

/**
 * Styled component for rendering severity pills.
 * This component renders a colored pill with text content to represent different severity levels.
 * @param {Object} props - Component props
 * @param {string} [props.color='primary'] - The color of the severity pill. One of 'primary', 'secondary', 'error', 'info', 'warning', or 'success'.
 * @param {ReactNode} props.children - The content of the severity pill.
 * @returns {JSX.Element} JSX element representing the severity pill.
 */
const SeverityPillRoot = styled('span')(({ theme, ownerState }) => {
  // Extracting color and background color based on the provided theme and owner state
  const backgroundColor = theme.palette[ownerState.color].alpha12;
  const color = theme.palette.mode === 'dark'
    ? theme.palette[ownerState.color].main
    : theme.palette[ownerState.color].dark;

  // Returning styles for the severity pill
  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: 12,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };
});

/**
 * SeverityPill component for rendering severity pills.
 * @param {Object} props - Component props
 * @param {string} [props.color='primary'] - The color of the severity pill. One of 'primary', 'secondary', 'error', 'info', 'warning', or 'success'.
 * @param {ReactNode} props.children - The content of the severity pill.
 * @returns {JSX.Element} JSX element representing the severity pill.
 */
export const SeverityPill = (props) => {
  const { color = 'primary', children, ...other } = props;

  // Constructing the ownerState object for styling
  const ownerState = { color };

  // Rendering the SeverityPillRoot styled component
  return (
    <SeverityPillRoot
      ownerState={ownerState}
      {...other}
    >
      {children}
    </SeverityPillRoot>
  );
};

// PropTypes for the SeverityPill component
SeverityPill.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'warning',
    'success'
  ])
};
