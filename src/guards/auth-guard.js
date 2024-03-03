import { useEffect, useRef, useState } from 'react'; // Importing necessary hooks from React
import { useRouter } from 'next/router'; // Importing useRouter hook from Next.js router
import PropTypes from 'prop-types'; // Importing PropTypes for type validation
import { useAuthContext } from 'src/contexts/auth-context'; // Importing useAuthContext hook from auth context

/**
 * Component to guard routes based on authentication status.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated, it allows rendering its children.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render if authenticated.
 */
export const AuthGuard = (props) => {
  const { children } = props; // Destructuring props
  const router = useRouter(); // Initializing Next.js router
  const { isAuthenticated } = useAuthContext(); // Getting authentication status from auth context
  const ignore = useRef(false); // Ref to track if component is mounted
  const [checked, setChecked] = useState(false); // State to track if authentication check is done

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;

      if (!isAuthenticated) {
        // Redirecting to login page if not authenticated
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
        setChecked(true); // Setting checked state to true if authenticated
      }
    },
    [router.isReady]
  );

  // Rendering null until authentication check is done
  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.
  return children; // Rendering children components
};

// Prop types validation for AuthGuard component
AuthGuard.propTypes = {
  children: PropTypes.node // Children prop should be a React node
};
