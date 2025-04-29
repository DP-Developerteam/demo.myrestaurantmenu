// Import Redux Toolkit to create a slice of the Redux store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import services
import { getProducts } from './productService';
// Import Auth Bearing for Axios
import { setAuthToken } from '../api';

// THUNK - getProducts
export const getProductsThunk = createAsyncThunk(
    'product/getProducts',
    async (_, { getState, rejectWithValue }) => {
        try {

            // Set sessionStorage to manage data in persist:root
            sessionStorage.setItem('isTabActive', 'true');

            // Retrieve the lastUpdated timestamp from the Redux state
            const { lastUpdated } = getState().product;

            // API call - Send lastUpdated as a query parameter in case it exists
            const response = await getProducts(lastUpdated ? { lastUpdated } : {});

            return response; // Return the response from the API
        } catch (error) {
            return rejectWithValue(
            error.response?.data.message || 'Failed to load products'
            );
        }
    }
);

// Creating a slice for product data management
const productSlice = createSlice({
    // Name of the slice, used for action types and state
    name: 'product',
    // Initial state for the product slice
    initialState: {
        products: [],
        isLoading: false,
        error: null,
        lastUpdated: null,
    },
    // Reducers for managing product state
    reducers: {
        // Action to set the product data in the state
        setProduct: (state, action) => {
            // Updating the state with productId from the action payload
            state.productId = action.payload.productId;
            // Set token in Axios using api.js
            state.setAuthToken(action.payload.token);
        },
        // Action to clear product data from the state
        clearProduct: (state) => {
            // Resetting the product state to initial values
            state.productId = null;
            // Clear token in Axios using api.js
            setAuthToken(null);
        },
        // Action to update product in State
        updateProductInState: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex((product) => product._id === updatedProduct._id);
            if (index >= 0) {
                // Replace with updated product
                state.products[index] = updatedProduct;
            }
        },
    },
    // Handle async actions in extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(getProductsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lastUpdated = action.payload.lastUpdated;
                // Conditional to update products state in case the payload is not empty/null
                if (action.payload.products) {
                    state.products = action.payload.products.map((product) => ({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        ingredients: product.ingredients,
                        image: product.image,
                        video: product.video,
                        vegetarian: product.vegetarian,
                        lastUpdated: product.lastUpdated,
                    }));
                }
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

// Exporting the actions to be used in components
export const { setProduct, clearProduct, updateProductInState } = productSlice.actions;
// Exporting the reducer to be used in the store
export default productSlice.reducer;