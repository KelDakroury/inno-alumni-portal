/**
 * Generates a random resource identifier.
 * @returns {string} Random resource identifier.
 */
export const createResourceId = () => {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
};
