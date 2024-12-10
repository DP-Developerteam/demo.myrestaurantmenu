// Importing the createStore function from Redux to create a Redux store
import { configureStore } from '@reduxjs/toolkit';
// Importing persistStore and persistReducer from redux-persist for state persistence across sessions
import { persistStore, persistReducer } from 'redux-persist';
// Importing the default storage engine from redux-persist, which uses localStorage for web applications
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// Importing createFilter to filter persisted data
import { createFilter } from 'redux-persist-transform-filter';
// Importing the rootReducer which combines all the individual reducers for the Redux store
import rootReducer from './reducers';
// Importing thunk
import { thunk } from 'redux-thunk';

// Create a filter to exclude the 'users' field from persistence in the user reducer
const userFilter = createFilter('user', ['token', 'userId', 'role', 'isLoggedIn', 'expiresIn']);

// Configuration object for redux-persist
const persistConfig = {
    // The key for the storage, used to identify the persisted data
    key: 'root',
    // Specifying the storage engine to use for persistence
    storage,
    // Add info from user reducer except users
    transforms: [userFilter],
};

// Creating a persisted reducer using the rootReducer and the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store using Redux Toolkit
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(thunk) // Add thunk middleware
});

// Creating the persistor, which will manage the persistence of the Redux store
export const persistor = persistStore(store);
