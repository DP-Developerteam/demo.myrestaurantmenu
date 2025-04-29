//Import api.js
import api from '../api';
// Add users path for the API
const API_URL = '/users';

// SIGN OUT logic for JWT is managed with Redux.
// /src/features/users/userSlice.js -> function clearUser()

// SIGN UP - Function to sign up a new user
export const signupUser = async (userData) => {
// console.log("userRoute: signupUser() start");
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

// SIGN IN with token - Function to sign in a user
export const signinToken = async (credentials) => {
// console.log("userRoute: signinToken() start");
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
// console.log("userRoute: getUsers() start");
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make an API call to fetch all users
            const response = await api.get(`${API_URL}/`, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make an API call to fetch all users
            const response = await api.get(`${API_URL}/`);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// USER by ID - Function to get user details by ID
export const getUserById = async (userId, userToken) => {
// console.log("userRoute: getUserById() start");
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make an API call to fetch all users
            const response = await api.get(`${API_URL}/user/${userId}`, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make an API call to fetch all users
            const response = await api.get(`${API_URL}/`);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// EDIT USER - Function to edit user by ID
export const editUser = async (userData, userToken) => {
// console.log("userRoute: editUser() start");
    // Extract userId from the userData object
    const userId = userData._id;
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make an API call to fetch all users
            const response = await api.put(`${API_URL}/edit/${userId}`, userData, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            }, userData);
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make an API call to fetch all users
            const response = await api.put(`${API_URL}/edit/${userId}`, userData);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// DELETE USER - Function to delete user by ID
export const deleteUser = async (userId, userToken) => {
// console.log("userRoute: deleteUser() start");
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make an API call to fetch all users
            const response = await api.delete(`${API_URL}/delete/${userId}`, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make an API call to fetch all users
            const response = await api.delete(`${API_URL}/delete/${userId}`);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// SIGN IN with session - Function to sign in a user
export const sessionSignIn = async () => {
// console.log("userRoute: sessionSignIn() start");
    try {
        const response = await api.get('/auth/user', {
            withCredentials: true
        });
        return response.data.user;
    } catch (error) {
        console.error('Auth check failed:', error);
        throw error;
    }
};

// SIGN OUT with session - Function to sign out a user
export const sessionSignOut = async (csrfToken) => {
// console.log("userRoute: sessionSignOut() start");
    try {
        await api.post('/auth/logout', {
            headers: {
                'X-CSRF-Token': csrfToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};