// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
// Import redux and slices
import { useSelector } from 'react-redux';
// Import service
import { editProduct } from '../productService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditProductForm = ({product, onCloseModals, onSave}) => {
    // Get token to authorize update
    const { token } = useSelector((state) => state.user);
    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Set formData when product is updated
    const [formData, setFormData] = useState({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        ingredients: product.ingredients || '',
        image: product.image || '',
        video: product.video || '',
        vegetarian: product.vegetarian || false,
        _id: product._id,
    });
    // Sync formData with product data
    useEffect(() => {
        setFormData({
            name: product.name || '',
            price: product.price || '',
            description: product.description || '',
            category: product.category || '',
            ingredients: product.ingredients || '',
            image: product.image || '',
            video: product.video || '',
            vegetarian: product.vegetarian || false,
            _id: product._id,
        });
    }, [product]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Include the user ID
        const filteredFormData = {
            _id: product._id,
            ...product,
        };

        // Iteramos sobre los campos del formulario y solo agregamos los que no están vacíos
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            // Verificamos que el valor sea una cadena antes de usar trim()
            if (typeof value === 'string' && value.trim() !== '') {
                // If value is type string and it is not empty, then we add it to filteredFormData
                filteredFormData[key] = value.trim();
            } else if (Array.isArray(value) && value.length > 0) {
                // If it is an array and it is not empty, then we add it to filteredFormData
                filteredFormData[key] = value;
            } else if (value !== undefined && value !== null) {
                // If valueis not undefined o null, then we add it to filteredFormData
                filteredFormData[key] = value;
            }
        });

        if (JSON.stringify(filteredFormData) === JSON.stringify(product)) {
            // If there are no modifications at all, then we avoid API call
            return;
        }

        try {
            // Directly calling editProduct
            const response = await editProduct(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedProduct = response.result;
                setSuccessMessage(response.message);
                onSave(editedProduct);
            }
            // onSave(filteredFormData);
        } catch (error) {
            console.error('Error updating user:', error);
            const message = error.response?.data?.message || 'An error occurred while updating the user.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
                <form className="form-container" onSubmit={handleSubmit}>
                    <header className="form-header">
                        <h2>Edit Product</h2>
                        <button className="button" type="button" onClick={onCloseModals}>
                            <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                        </button>
                    </header>
                    <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <label>Name:</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label>Description:</label>
                                <input
                                    type='text'
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label>Category:</label>
                                <input
                                    type='text'
                                    name='category'
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label>Price:</label>
                                <input
                                    type='text'
                                    name='price'
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label>Ingredients:</label>
                                <input
                                    type='text'
                                    name='ingredients'
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label>Vegetarian:</label>
                                <select
                                    name='vegetarian'
                                    value={formData.vegetarian}
                                    onChange={handleChange}
                                >
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className='form-field'>
                                <label>Image:</label>
                                <input
                                    type='text'
                                    name='image'
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>Video:</label>
                                <input
                                    type='text'
                                    name='video'
                                    value={formData.video}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <footer className='form-footer'>
                        {successMessage && <p className="error-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button className="button" type="submit">Update Product</button>
                    </footer>
                </form>
        </div>
    );
};

export default EditProductForm