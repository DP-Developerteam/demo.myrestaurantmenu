//Import api.js
import api from '../api';
// Add products path for the API
const API_URL = '/products';

// GET all products
export const getProducts = async (lastUpdated) => {
    // console.log("PRODUCT SERVICE: call getProducts")
    try {
        // Build the query parameter string if lastUpdated is provided
        const queryParams = lastUpdated ? `?lastUpdated=${lastUpdated.lastUpdated}` : '';

        // Make an API call to fetch all products
        const response = await api.get(`${API_URL}${queryParams}`);
        // Return the data received from the API
        return response.data;
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// CREATE product
export const createProduct = async (productData, userToken) => {
    // console.log("PRODUCT SERVICE: call createProduct")
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make a POST request to create a new product
            const response = await api.post(`${API_URL}/create`, productData, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make a POST request to create a new product
            const response = await api.post(`${API_URL}/create`, productData);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error creating product:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// UPDATE product
export const editProduct = async (productData, userToken) => {
    // console.log("PRODUCT SERVICE: call editProduct")
    // Extract productId from the productData object
    const productId = productData._id;
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make a PUT request to update product details
            const response = await api.put(`${API_URL}/edit/${productId}`, productData, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            }, productData);
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make a PUT request to update product details
            const response = await api.put(`${API_URL}/edit/${productId}`, productData);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error editing product:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// DELETE product
export const deleteProduct = async (productId, userToken) => {
    // console.log("PRODUCT SERVICE: call deleteProduct")
    try {
        if (userToken && userToken !== "null" && userToken !== "undefined") {
            // Only add header if userToken is truthy and not "null"/"undefined"
            // Make a DELETE request to remove the product by ID
            const response = await api.delete(`${API_URL}/delete/${productId}`, {
                headers: {
                    // Include the token in the header
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Return the data received from the API
            return response.data;
        } else {
            // No token provided - rely on session-based auth
            // Make a DELETE request to remove the product by ID
            const response = await api.delete(`${API_URL}/delete/${productId}`);
            // Return the data received from the API
            return response.data;
        }
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error deleting product:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};