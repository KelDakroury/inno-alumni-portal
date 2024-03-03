import { Slide, Snackbar } from '@mui/material'; // Importing components from Material-UI
import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import { redirect } from 'next/navigation'; // Importing the redirect function from next/navigation

let openSnackbarFn; // Variable to store the function for opening the snackbar

/**
 * Functional component for displaying notifications as snackbars.
 * @returns {JSX.Element} JSX element representing the Notifier component.
 */
const Notifier = () => {
    // State variables for managing snackbar visibility and message
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState('');

    // Function to handle closing the snackbar
    const handleSnackbarClose = () => {
        setOpen(false);
        setMessage('');
    };

    /**
     * Function to open the snackbar with a given message.
     * @param {Object} param0 - Object containing the notification message.
     * @param {string} param0.notificationMessage - The message to be displayed in the snackbar.
     */
    const openSnackbar = ({ notificationMessage }) => {
        setOpen(true);
        setMessage(notificationMessage);
    };

    // Effect hook to assign the openSnackbar function to the openSnackbarFn variable
    useEffect(() => {
        openSnackbarFn = openSnackbar;
    }, []);

    // Template for the snackbar message, allowing HTML content
    const messageTemplate = (
        <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: message }} />
    );

    // Rendering the snackbar component
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position of the snackbar
                open={open} // Whether the snackbar is open
                autoHideDuration={5000} // Duration before the snackbar automatically hides
                onClose={handleSnackbarClose} // Function to handle closing the snackbar
                message={messageTemplate} // Message content of the snackbar
                ContentProps={{ 'aria-describedby': 'snackbar-message-id' }} // Additional props for the snackbar content
                TransitionComponent={TransitionLeft} // Transition component for the snackbar animation
            />
        </div>
    );
};

/**
 * Function component for defining the transition animation for the snackbar.
 * @param {Object} props - Props passed to the TransitionLeft component.
 * @returns {JSX.Element} JSX element representing the transition animation.
 */
function TransitionLeft(props) {
    return <Slide {...props} direction="up" />;
}

/**
 * Function for opening the snackbar from outside the component.
 * @param {Object} param0 - Object containing the notification message.
 * @param {string} param0.notificationMessage - The message to be displayed in the snackbar.
 */
export function openSnackbarExported({ notificationMessage }) {
    openSnackbarFn({ notificationMessage });
}

export default Notifier; // Default export for the Notifier component
