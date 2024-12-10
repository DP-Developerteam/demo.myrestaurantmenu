// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
// Import redux and slices
import { useSelector } from 'react-redux';
//Import functions
import { createProduct } from '../productService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const CreateProductForm = ({onCloseModals, onSave}) => {
    // State for loading and error handling
    const { token, errorMessage } = useSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');

    // State formData
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        ingredients: '',
        image: '',
        video: '',
        vegetarian: false
    });

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Directly calling createProduct
            const response = await createProduct(formData, token);
            // Check response
            if (response && response.message) {
                const createdProduct = response.result;
                setSuccessMessage(response.message);
                onSave(createdProduct);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className='modal-overlay'>
            <form className='form-container' onSubmit={handleSubmit}>
                <header className='form-header'>
                    <h2>Create product</h2>
                    <button className='button' type='button' onClick={onCloseModals}>
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
                    <button className="button" type="submit">Create product</button>
                </footer>
            </form>
        </div>
    )
}

export default CreateProductForm