//Import api.js
import api from '../api';
// Add users path for the API
const API_URL = '/users';

// SIGNOUT logic is managed with Redux.
// /src/features/users/userSlice.js -> function clearUser()

// SIGNUP - Function to sign up a new user
export const signupUser = async (userData) => {
    try {
        // Send a POST request to the '/signup' endpoint with user data to create a new user
        const response = await api.post(`${API_URL}/signup`, userData);

        // Return the response data (likely the newly created user or a success message)
        return response.data;
    } catch (error) {
        // Log an error to the console if the signup process fails
        console.error('Error signing up:', error);

        // Re-throw the error so it can be handled by the caller (e.g., in the UI)
        throw error;
    }
};

// SIGNIN - Function to sign in a user
export const signinUser = async (credentials) => {
    try {
        // Send a POST request to the sign-in endpoint with user credentials
        const response = await api.post(`${API_URL}/signin`, credentials);
        // return response.data;
        return {
            token: response.data.token,
            _id: response.data._id,
            role: response.data.role,
            expiresIn: response.data.expiresIn
        };
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

// ALL USERS - Function to get all users
export const getUsers = async (userToken) => {
    try {
        // Make an API call to fetch all users
        const response = await api.get(`${API_URL}/`, {
            headers: {
                // Include the token in the header
                Authorization: `Bearer ${userToken}`
            }
        });
        // Return the data received from the API
        return response.data;
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// USER by ID - Function to get user details by ID
export const getUserById = async (userId, userToken) => {
    try {
        // Make a GET request to the API to fetch user details by ID
        const response = await api.get(`${API_URL}/user/${userId}`, {
            // Include the token in the header for authorization
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        // Return the data received from the API
        return response.data;
    } catch (error) {
        // Log the error in case of failure and throw it to be handled later
        console.error('Error fetching user:', error);
        throw error;
    }
};

// EDIT USER - Function to edit user by ID
export const editUser = async (userData, userToken) => {
    // Extract userId from the userData object
    const userId = userData._id;
    try {
        // Make a PUT request to update user details
        const response = await api.put(`${API_URL}/edit/${userId}`, userData, {
            // Include the token in the header for authorization
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }, userData);
        // Return data from the edited user
        return response.data;
    } catch (error) {
        // Log the error in case of failure and throw it to be handled later
        console.error('Error editing user:', error);
        throw error;
    }
};

// DELETE USER - Function to delete user by ID
export const deleteUser = async (userId, userToken) => {
    try {
        // Make a DELETE request to remove the user by ID
        const response = await api.delete(`${API_URL}/delete/${userId}`, {
            // Include the token in the header for authorization
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        });
        // Return data from the deleted user
        return response.data;
    } catch (error) {
        // Log the error in case of failure and throw it to be handled later
        console.error('Error deleting user:', error);
        throw error;
    }
};