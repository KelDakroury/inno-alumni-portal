import { useCallback, useRef, useState } from 'react';

/**
 * Custom hook to manage popover state and actions.
 * @returns {object} An object containing anchorRef, handleClose, handleOpen, handleToggle, and open state.
 */
export function usePopover() {
  // Reference to the anchor element
  const anchorRef = useRef(null);
  // State to manage the open/close state of the popover
  const [open, setOpen] = useState(false);

  // Callback to open the popover
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // Callback to close the popover
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Callback to toggle the popover open/close state
  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // Returning anchorRef, handleClose, handleOpen, handleToggle, and open state
  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    open
  };
}
