import { createContext, useContext, useEffect, useReducer, useRef } from 'react'; // Importing necessary hooks from React
import PropTypes from 'prop-types'; // Importing PropTypes for defining prop types
import { getCurrentUser, loginRegularUser, registerRegularUser } from 'src/api'; // Importing API functions for user authentication

// Enum for action types used in the reducer
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

// Initial state for authentication context
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

// Reducer function to handle authentication state transitions
const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// Handlers for different action types in the reducer
const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user ? ({
        isAuthenticated: true,
        isLoading: false,
        user
      }) : ({
        isLoading: false,
        isAuthenticated: false
      }))
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: {}
    };
  }
};

// Context for managing authentication state
export const AuthContext = createContext({ undefined });

/**
 * AuthProvider component to manage authentication state and provide authentication-related functions.
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The child components wrapped by the AuthProvider.
 * @returns {JSX.Element} JSX element representing the AuthProvider.
 */
export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  // Function to initialize authentication state
  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let accessToken;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      accessToken = window.sessionStorage.getItem('alumniToken') || ''
    } catch (err) {
      console.error(err);
    }

    try {
      if (isAuthenticated && accessToken) {
        const userInfo = await getCurrentUser({ accessToken });
        const user = {
          id: '5e86809283e28b96d2d38537',
          ...userInfo,
        };

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    []
  );

  // Function to simulate authentication without signing in
  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      name: 'Daniel Atonge',
      email: 'd.atonge@innopolis.university'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  // Function to sign in a user
  const signIn = async (email, password) => {
    const { access_token: accessToken } = await loginRegularUser({ email, password });
    const userInfo = await getCurrentUser({ accessToken });

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('alumniToken', accessToken);
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      name: 'Daniel Atonge',
      email: 'd.atonge@innopolis.university',
      ...userInfo,
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  // Function to sign up a new user
  const signUp = async (email, name, password, confirmPassword) => {
    const registeredUser = await registerRegularUser({ name, email, password, confirmPassword });
    // Handle registration response
  };

  // Function to sign out the current user
  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node
};

// Consumer for AuthContext
export const AuthConsumer = AuthContext.Consumer;

/**
 * Custom hook to access the authentication context and its state and functions.
 * @returns {Object} An object containing authentication state and functions.
 */
export const useAuthContext = () => useContext(AuthContext);
