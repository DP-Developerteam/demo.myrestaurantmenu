// Import Redux Toolkit to create a slice of the Redux store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import services
import { signinToken, getUsers, sessionSignIn, sessionSignOut } from './userService';
// Import Auth Bearing for Axios
import { setAuthToken } from '../api';

// THUNK - Sign in with token
export const tokenSignInThunk = createAsyncThunk(
    'user/signIn',
    async (credentials, { dispatch, rejectWithValue }) => {
// console.log("userSlice: tokenSignInThunk() start");
        try {
            // Make the API call
            const response = await signinToken(credentials);
            // Dispatch the setUser action after a successful response
            dispatch(signInJwt({
                userId: response._id,
                token: response.token,
                role: response.role,
                expiresIn: response.expiresIn
            }));
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
// console.log("userSlice: getUsersThunk() start");
        try {
            return await getUsers(token);
        } catch (error) {
            return rejectWithValue(
                error.response?.data.message || 'Failed to load users'
            );
        }
    }
);
// THUNK - Sign in with session
export const sessionSignInThunk = createAsyncThunk(
    'user/sessionSignIn',
    async (_, { dispatch, rejectWithValue, getState }) => {
// console.log("userSlice: sessionSignInThunk() start");
        // Check authentication method from state
        const { authMethod } = getState().user;
// console.log("userSlice: sessionSignInThunk() authentication method: ", authMethod);
        if (authMethod === 'jwt') {
            return rejectWithValue('Not a session-based authentication');
        }
        try {
            // Make the API call
            const response = await sessionSignIn();
            // Validate session freshness
            if (response.sessionRestored) {
                dispatch(sessionSignOutThunk());
                return rejectWithValue('Session expired');
            }
            dispatch(signInSession({
                userId: response._id,
                token: null,
                role: response.role,
                csrfToken: response.csrfToken
            }));
            return response;
        } catch (error) {
            // Auto-clear invalid sessions
            if (error.response?.status === 401) {
                dispatch(clearUser());
            }
            return rejectWithValue(error.message);
        }
    }
);
// THUNK - Sign out with session
export const sessionSignOutThunk = createAsyncThunk(
    'user/logout',
    async (csrfToken, { dispatch, rejectWithValue }) => {
// console.log("userSlice: sessionSignOutThunk() start")
        try {
            await sessionSignOut(csrfToken);
            dispatch(clearUser());
        } catch (error) {
            return rejectWithValue(error.message);
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
        expiresIn: null,
        user: null,
        isAuthenticated: false,
        authMethod: null,
        csrfToken: null,
        isLoading: false,
        error: null,
        users: [],
    },
    // Reducers for managing user state
    reducers: {
        signInJwt: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.expiresIn = action.payload.expiresIn;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.authMethod = 'jwt';
            // Set token in Axios using api.js
            setAuthToken(action.payload.token);
            // Set users list
            state.users = [action.payload];
        },
        signInSession: (state, action) => {
            state.userId = action.payload.userId;
            state.token = null;
            state.role = action.payload.role;
            state.expiresIn = action.payload.expiresIn;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.authMethod = 'session';
            state.csrfToken = action.payload.csrfToken;
            // Set token in Axios using api.js
            setAuthToken(null);
            // Set users list
            state.users = [action.payload];
        },
        clearUser: (state) => {
            state.userId = null;
            state.token = null;
            state.role = null;
            state.expiresIn = null;
            state.user = null;
            state.isAuthenticated = false;
            state.authMethod = null;
            state.csrfToken = null;
            state.isLoading = null;
            state.error = null;
            state.users = [];
            setAuthToken(null);
        },
        // Action to add new user
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        // Action to update an user
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
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
        // builder tokenSignInThunk
        builder
            .addCase(tokenSignInThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(tokenSignInThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(tokenSignInThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        // builder getUsersThunk
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        // builder sessionSignInThunk
        builder
            .addCase(sessionSignInThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sessionSignInThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sessionSignInThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        // builder sessionSignOutThunk
        builder
            .addCase(sessionSignOutThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sessionSignOutThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sessionSignOutThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
});

// Exporting the actions to be used in components
export const {
    signInJwt,
    signInSession,
    clearUser,
    addUser,
    updateUser,
    deleteUser
} = userSlice.actions;
// Exporting the reducer to be used in the store
export default userSlice.reducer;