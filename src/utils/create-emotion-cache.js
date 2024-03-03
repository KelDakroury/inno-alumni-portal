import createCache from '@emotion/cache';

/**
 * Creates an Emotion cache instance.
 * @returns {Object} Emotion cache instance.
 */
export const createEmotionCache = () => {
  return createCache({ key: 'css' });
};
