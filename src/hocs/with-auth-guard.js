import { AuthGuard } from 'src/guards/auth-guard'; // Importing AuthGuard component from auth-guard file

/**
 * HOC (Higher Order Component) to wrap a component with authentication guarding.
 * It ensures that the wrapped component is only rendered if the user is authenticated.
 * @param {React.ComponentType} Component - The component to be wrapped with authentication guarding.
 * @returns {React.ComponentType} - The wrapped component.
 */
export const withAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} /> {/* Rendering the wrapped component with its props */}
  </AuthGuard>
);
