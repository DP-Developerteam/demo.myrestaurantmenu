// Importing createSlice from Redux Toolkit to create a slice of the Redux store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import the signin function from the userService
import { signinUser, getUsers } from './userService';
// Imports Auth Bearing for Axios
import { setAuthToken } from '../api';

// THUNK - signinUser
export const signInThunk = createAsyncThunk(
    'user/signIn',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            // Make the API call
            const response = await signinUser(credentials);
            // Dispatch the setUser action after a successful response
            dispatch(setUser({
                userId: response._id,
                token: response.token,
                role: response.role,
                expiresIn: response.expiresIn
            }));
            // Return response for any additional processing in components
            return response;
        } catch (error) {
            // Handle errors and provide a readable message for the frontend
            return rejectWithValue(
                error.response?.data || { message: 'An unexpected error occurred.' }
            );
        }
    }
);
// THUNK - getUsers
export const getUsersThunk = createAsyncThunk(
    'user/getUsers',
    async (token, { rejectWithValue }) => {
        try {
            return await getUsers(token); // API call to fetch users
        } catch (error) {
            return rejectWithValue(
                error.response?.data.message || 'Failed to load users'
            );
        }
    }
);

// Creating a slice for user data management
const userSlice = createSlice({
    // Name of the slice, used for action types and state
    name: 'user',
    // Initial state for the user slice
    initialState: {
        userId: null,
        token: null,
        role: null,
        isLoggedIn: false,
        expiresIn: null,
        // users: []
    },
    // Reducers for managing user state
    reducers: {
        // Action to set the user data in the state
        setUser: (state, action) => {
            // Updating the state with user ID, token, and role from the action payload
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isLoggedIn = true;
            state.expiresIn = action.payload.expiresIn;
            // Set token in Axios using api.js
            setAuthToken(action.payload.token);
            // Set users list
            state.users = [action.payload];
        },
        // Action to clear user data from the state
        clearUser: (state) => {
            // Resetting the user state to initial values
            state.userId = null;
            state.token = null;
            state.role = null;
            state.isLoggedIn = false; // Setting the logged-in flag to false
            state.expiresIn = null; // Clear token expiration
            // Clear token in Axios using api.js
            setAuthToken(null);
            // Clear users list
            state.users = [];
        },
        // Action to add new user
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        // Action to update an user
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            // const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        // Action to delete an user
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload._id);
        },
    },
    // Handle async actions in extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(signInThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;

                const { _id, token, role, expiresIn } = action.payload;
                state.userId = _id;
                state.token = token;
                state.role = role;
                state.isLoggedIn = true;
                state.expiresIn = expiresIn;
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.map((user) => ({
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                }));
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
});

// Exporting the actions to be used in components
export const { setUser, clearUser, addUser, updateUser, deleteUser } = userSlice.actions;
// Exporting the reducer to be used in the store
export default userSlice.reducer;