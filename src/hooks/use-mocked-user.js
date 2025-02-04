/**
 * Custom hook to provide a mocked user for testing purposes.
 * @returns {Object} - A mocked user object with id, avatar, name, and email.
 */
export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  return {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    name: 'Daniel Atonge',
    email: 'd.atonge@innopolis.university'
  };
};
