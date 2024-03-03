import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook to manage selection of items.
 * @param {Array} items - Array of items to be selected from.
 * @returns {object} An object containing functions to handle selection and the currently selected items.
 */
export const useSelection = (items = []) => {
  // State to store the selected items
  const [selected, setSelected] = useState([]);

  // Reset selected items when items array changes
  useEffect(() => {
    setSelected([]);
  }, [items]);

  // Callback to select all items
  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  // Callback to select one item
  const handleSelectOne = useCallback((item) => {
    setSelected((prevState) => [...prevState, item]);
  }, []);

  // Callback to deselect all items
  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  // Callback to deselect one item
  const handleDeselectOne = useCallback((item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, []);

  // Returning functions to handle selection and the currently selected items
  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected
  };
};
