import { useContext } from 'react'; // Importing useContext hook from React
import { AuthContext } from 'src/contexts/auth-context'; // Importing AuthContext from auth-context file

/**
 * Custom hook to access the authentication context.
 * @returns {Object} - The authentication context object.
 */
export const useAuth = () => useContext(AuthContext);
