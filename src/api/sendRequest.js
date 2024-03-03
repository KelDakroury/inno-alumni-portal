import "isomorphic-unfetch"; // Importing isomorphic-unfetch for cross-environment HTTP requests
import notify from "../utils/notify"; // Importing the notify utility for displaying notifications

// Retrieving environment variables or setting default values for PORT and ROOT_URL
let { PORT, ROOT_URL } = process.env || {};
PORT = PORT || 9001; // Defaulting to port 9001 if not provided
ROOT_URL = ROOT_URL || `http://127.0.0.1:${PORT}`; // Defaulting to localhost if not provided

/**
 * Asynchronous function to send HTTP requests.
 * @param {string} path - The endpoint path for the request.
 * @param {Object} options - Additional options for the request (e.g., method, headers, body).
 * @returns {Promise<any>} - A promise resolving to the JSON response data or rejecting with an error.
 */
const sendRequest = async (path, options = {}) => {
    // Checking if "Remove-Content-Type" header is present to decide whether to include "Content-Type" header
    const removeContentType =
        options.headers && options.headers["Remove-Content-Type"];
    let headers;
    if (removeContentType) {
        headers = { ...(options.headers || {}) };
        delete options.headers["Remove-Content-Type"]; // Removing "Remove-Content-Type" header from options
    } else {
        headers = {
            "Content-Type": "application/json; charset=UTF-8",
            ...(options.headers || {})
        }; // Defaulting to JSON content type if not specified
    }

    // Sending fetch request to the specified path with configured options
    const response = await fetch(`${ROOT_URL}${path}`, {
        method: "POST", // Defaulting to POST method
        credentials: "include", // Including credentials in request
        ...options,
        headers
    });

    // Handling non-ok responses by displaying a notification and throwing an error
    if (!response.ok) {
        const failedInformation = await response.json(); // Parsing JSON error message from response
        notify({ notificationMessage: failedInformation.detail }); // Displaying notification with error message
        throw new Error(failedInformation.detail); // Throwing an error with the error message
    }

    // Parsing JSON response data and returning it
    const jsonData = await response.json();
    return jsonData;
};

export default sendRequest; // Exporting the sendRequest function as default
