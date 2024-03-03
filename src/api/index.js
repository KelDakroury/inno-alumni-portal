// Importing notify function from the utils/notify module
import notify from "../utils/notify";

// Importing sendRequest function from the current directory's sendRequest module
import sendRequest from "./sendRequest";

// Base path for user-related API endpoints
const BASE_USER_PATH = "/api/v1/user";

/**
 * Function to login a regular user.
 * @param {Object} param0 - An object containing email and password.
 * @param {string} param0.email - Email of the user.
 * @param {string} param0.password - Password of the user.
 * @returns {Promise<string>} - A promise resolving to the user token or rejecting with an error.
 */
export const loginRegularUser = async ({ email, password }) => {
  // Creating form data with email and password
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  // Options for the request
  const options = {
    headers: {
      accept: "application/json",
      "Remove-Content-Type": true
    },
    body: formData
  };

  try {
    // Sending login request
    const userToken = await sendRequest(`${BASE_USER_PATH}/login`, options);
    // Notifying user of successful login
    notify({ notificationMessage: "Login Successful" });
    return userToken;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to register a regular user.
 * @param {Object} param0 - An object containing name, email, password, and confirmPassword.
 * @param {string} param0.name - Name of the user.
 * @param {string} param0.email - Email of the user.
 * @param {string} param0.password - Password of the user.
 * @param {string} param0.confirmPassword - Confirmation of the password.
 * @param {Object} [options={}] - Additional options for the request.
 * @returns {Promise<string>} - A promise resolving to the user token or rejecting with an error.
 */
export const registerRegularUser = async (
  { name, email, password, confirmPassword },
  options = {}
) => {
  try {
    // Sending registration request
    const registrationFeedback = await sendRequest(
      `${BASE_USER_PATH}/register`,
      {
        ...options,
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password: confirmPassword
        })
      }
    );
    // Notifying user of successful registration
    notify({ notificationMessage: "Registration Successful" });
    return registrationFeedback;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to register an admin user.
 * @param {Object} param0 - An object containing name, email, and password.
 * @param {string} param0.name - Name of the admin.
 * @param {string} param0.email - Email of the admin.
 * @param {string} param0.password - Password of the admin.
 * @returns {Promise<string>} - A promise resolving to the user token or rejecting with an error.
 */
export const registerAdminUser = async ({ name, email, password }) => {
  try {
    // Sending admin registration request
    const registrationFeedback = await sendRequest(
      `${BASE_USER_PATH}/register-admin`,
      {
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );
    // Notifying user of successful admin registration
    notify({ notificationMessage: "Admin User Registration Successful" });
    return registrationFeedback;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to update user information.
 * @param {Object} updateInformation - Information to be updated.
 * @returns {Promise<any>} - A promise resolving to the update feedback or rejecting with an error.
 */
export const updateUserInformation = async (updateInformation) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to update user information
    const updateFeedback = await sendRequest(`${BASE_USER_PATH}/update`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(updateInformation)
    });
    // Notifying user of successful update
    notify({
      notificationMessage: "User profile information updated Successfully"
    });
    return updateFeedback;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to update user password.
 * @param {Object} passwordInformation - Information containing the new password.
 * @returns {Promise<any>} - A promise resolving to the update feedback or rejecting with an error.
 */
export const updatePasswordInformation = async (passwordInformation) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to update user password
    const updateFeedback = await sendRequest(
      `${BASE_USER_PATH}/update-password`,
      {
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(passwordInformation)
      }
    );
    // Notifying user of successful password update
    notify({ notificationMessage: "User password updated Successfully" });
    return updateFeedback;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to login using InnoSSO.
 * @param {Object} [options={}] - Additional options for the request.
 * @returns {Promise<string>} - A promise resolving to the redirect URL or rejecting with an error.
 */
export const loginWithInnoSSO = async (options = {}) => {
  try {
    // Sending request to login with InnoSSO
    const redirectURL = await sendRequest(`${BASE_USER_PATH}/login_sso`, {
      method: "GET",
      ...options
    });
    // Notifying user of successful login with InnoSSO
    notify({ notificationMessage: "Login with sso Successful" });
    return redirectURL;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get current user information.
 * @param {Object} param0 - An object containing the access token.
 * @param {string} param0.accessToken - User's access token.
 * @returns {Promise<any>} - A promise resolving to the user information or rejecting with an error.
 */
export const getCurrentUser = async ({ accessToken }) => {
  try {
    // Sending request to get current user information
    const userInfo = await sendRequest(`${BASE_USER_PATH}/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return userInfo;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get information of all registered users.
 * @returns {Promise<any>} - A promise resolving to the information of all registered users or rejecting with an error.
 */
export const getAllRegisteredUsers = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get information of all registered users
    const usersInfo = await sendRequest(`${BASE_USER_PATH}/all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return usersInfo;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/*
{
  "requested_date": "2023-07-14",
  "guests": [
    "string"
  ],
  "description": "string"
}
*/

/**************************************************************************************/
/****************                START PASS REQUEST               *********************/
/**************************************************************************************/

// Base path for pass request-related API endpoints
const BASE_PASS_PATH = "/api/v1/request_pass";

/**
 * Function to create a pass request.
 * @param {Object} param0 - An object containing the pass request.
 * @param {Object} param0.request - The pass request details.
 * @param {Object} [options={}] - Additional options for the request.
 * @returns {Promise<any>} - A promise resolving to the response or rejecting with an error.
 */
export const createPassRequest = async ({ request }, options = {}) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to create a pass request
    const response = await sendRequest(`${BASE_PASS_PATH}/`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(request)
    });
    // Notifying user of successful pass request creation
    notify({ notificationMessage: "Pass Request Creation Successful" });
    return response;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get pass request history.
 * @returns {Promise<any>} - A promise resolving to the pass request history or rejecting with an error.
 */
export const getPassRequestHistory = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get pass request history
    const passRequests = await sendRequest(`${BASE_PASS_PATH}/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return passRequests;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to delete a pass request.
 * @param {Object} param0 - An object containing the pass request ID.
 * @param {string} param0.passRequestId - The ID of the pass request to be deleted.
 * @returns {Promise<any>} - A promise resolving to the response or rejecting with an error.
 */
export const deletePassRequest = async ({ passRequestId }) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to delete a pass request
    const response = await sendRequest(
      `${BASE_PASS_PATH}/?pass_request_id=${passRequestId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
    // Notifying user of successful pass request deletion
    notify({
      notificationMessage: "Request for pass was Successfully deleted"
    });
    return response;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get all pass requests for admin.
 * @returns {Promise<any>} - A promise resolving to the pass requests or rejecting with an error.
 */
export const getAllPassRequestAdmin = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get all pass requests for admin
    const passes = await sendRequest(`${BASE_PASS_PATH}/admin`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return passes;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to update a pass request.
 * @param {Object} param0 - An object containing the request ID and data to be updated.
 * @param {string} param0.requestId - The ID of the pass request to be updated.
 * @param {Object} param0.data - The data to be updated.
 * @returns {Promise<any>} - A promise resolving to the updated request or rejecting with an error.
 */
export const updatePassRequest = async ({ requestId, data }) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to update a pass request
    const request = await sendRequest(
      `${BASE_PASS_PATH}/?request_id=${requestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(data)
      }
    );
    // Notifying user of successful update
    notify({ notificationMessage: "Request status updated Successfully" });
    return request;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**************************************************************************************/
/****************            START ELECTIVE REQUEST               *********************/
/**************************************************************************************/
// Base path for elective course-related API endpoints
const BASE_ELECTIVE_PATH = "/api/v1/elective_course";

/**
 * Function to get all elective courses.
 * @returns {Promise<any>} - A promise resolving to the elective courses or rejecting with an error.
 */
export const getAllElectiveCourses = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get all elective courses
    const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return electives;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get all elective courses for admin.
 * @returns {Promise<any>} - A promise resolving to the elective courses or rejecting with an error.
 */
export const getAllElectiveCoursesAdmin = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get all elective courses for admin
    const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/admin`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return electives;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get booked elective courses.
 * @returns {Promise<any>} - A promise resolving to the booked elective courses or rejecting with an error.
 */
export const getBookedElectiveCourses = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get booked elective courses
    const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/booked`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return electives;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get all elective requests.
 * @returns {Promise<any>} - A promise resolving to the elective requests or rejecting with an error.
 */
export const getAllElectiveRequests = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get all elective requests
    const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/request`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return electives;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to update an elective course.
 * @param {Object} param0 - An object containing the course ID and data to be updated.
 * @param {string} param0.courseId - The ID of the elective course to be updated.
 * @param {Object} param0.data - The data to be updated.
 * @returns {Promise<any>} - A promise resolving to the updated course or rejecting with an error.
 */
export const updateElectiveCourse = async ({ courseId, data }) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to update an elective course
    const elective = await sendRequest(
      `${BASE_ELECTIVE_PATH}/?course_id=${courseId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(data)
      }
    );
    // Notifying user of successful update
    notify({ notificationMessage: "Course updated Successfully" });
    return elective;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to update an elective course request.
 * @param {Object} param0 - An object containing the request ID and data to be updated.
 * @param {string} param0.requestId - The ID of the elective course request to be updated.
 * @param {Object} param0.data - The data to be updated.
 * @returns {Promise<any>} - A promise resolving to the updated request or rejecting with an error.
 */
export const updateElectiveCourseRequest = async ({ requestId, data }) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to update an elective course request
    const elective = await sendRequest(
      `${BASE_ELECTIVE_PATH}/?request_id=${requestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(data)
      }
    );
    // Notifying user of successful update
    notify({ notificationMessage: "Request status updated Successfully" });
    return elective;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**************************************************************************************/
/****************              END ELECTIVE REQUEST               *********************/
/**************************************************************************************/

// Base path for donation-related API endpoints
const BASE_DONATION_PATH = "/api/v1/donation";

/**
 * Function to get the admin donation text.
 * @returns {Promise<any>} - A promise resolving to the admin donation text or rejecting with an error.
 */
export const getAdminDonationText = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get the admin donation text
    const message = await sendRequest(`${BASE_DONATION_PATH}/admin`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return message;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to get all alumni donations.
 * @returns {Promise<any>} - A promise resolving to the alumni donations or rejecting with an error.
 */
export const getAllAlumniDonations = async () => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to get all alumni donations
    const message = await sendRequest(`${BASE_DONATION_PATH}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return message;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to upsert admin donation text.
 * @param {Object} param0 - An object containing the donation text to be updated.
 * @param {Object} param0.donation - The donation text to be updated.
 * @returns {Promise<any>} - A promise resolving to the response or rejecting with an error.
 */
export const upsertAdminDonationText = async ({ donation }) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to upsert admin donation text
    const response = await sendRequest(`${BASE_DONATION_PATH}/admin`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(donation)
    });
    // Notifying user of successful update
    notify({ notificationMessage: "Donation Request Updated Successful" });
    return response;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};

/**
 * Function to make a donation text.
 * @param {Object} param0 - An object containing the donation text.
 * @param {Object} param0.donation - The donation text.
 * @returns {Promise<any>} - A promise resolving to the response or rejecting with an error.
 */
export const makeDonationText = async ({ donation }) => {
  // Retrieving access token from session storage
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    // Sending request to make a donation text
    const response = await sendRequest(`${BASE_DONATION_PATH}/`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(donation)
    });
    // Notifying user of successful donation interest
    notify({ notificationMessage: "Donation Interest Sent Successful" });
    return response;
  } catch (err) {
    // Notifying user of error
    notify(err);
  }
};
