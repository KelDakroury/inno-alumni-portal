/**
 * Notifies the user and performs actions based on the notification message.
 * @param {object} obj - Notification object containing the message and action.
 */
export default function notify(obj) {
    if (obj.notificationMessage && obj.notificationMessage.action && obj.notificationMessage.action === "REDIRECT_TO_LOGIN") {
        redirect('/auth/login');
    }
    openSnackbarExported({
        notificationMessage: obj.notificationMessage || obj.message || obj.toString(),
    });
}
