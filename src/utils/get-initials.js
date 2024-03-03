/**
 * Get the initials from a name.
 * @param {string} [name=''] - The name from which to extract initials.
 * @returns {string} Initials extracted from the name.
 */
export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');
