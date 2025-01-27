// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector } from 'react-redux';
// Import service
import { editProduct } from '../productService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditProductForm = ({ product, onCloseModals, onSave }) => {
    // Obtener el idioma actual
    const { t, i18n } = useTranslation();
    // get language code
    const lang = i18n.language.split('-')[0]; //not used in edit

    // Get token to authorize update
    const { token } = useSelector((state) => state.user);
    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Set formData when product is updated
    const [formData, setFormData] = useState({
        name: product.name[lang] || '',
        // name: typeof product.name === 'string' ? { en: product.name, es: '', de: '' } : product.name || '',
        price: product.price || '',
        description: product.description[lang] || '',
        // description: typeof product.description === 'string' ? { en: product.description, es: '', de: '' } : product.description || '',
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
            name: typeof product.name === 'string' ? { en: product.name, es: '', de: '' } : product.name || '',
            price: product.price || '',
            description: typeof product.description === 'string' ? { en: product.description, es: '', de: '' } : product.description || '',
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
        // get properties
        const { name, value, lang } = e.target;

        if (name === 'name' || name === 'description') {
            // If the field is name or description, we update the corresponding translation.
            setFormData((prevData) => ({
                ...prevData,
                [name]: {
                    ...prevData[name],
                    [lang]: value,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Include the product ID
        const filteredFormData = {
            _id: product._id,
            ...formData,
        };

        // Iterate over the form fields and only add those that are not empty
        Object.keys(formData).forEach((key) => {
            const value = formData[key];

            if (key === 'name' || key === 'description') {
                // If the field is name or description, check if all translations are empty
                const translations = Object.values(value); // Get the values of the translations
                const hasNonEmptyTranslation = translations.some((translation) => translation.trim() !== '');

                if (hasNonEmptyTranslation) {
                    // If there is at least one non-empty translation, add the field
                    filteredFormData[key] = value;
                }
            } else if (typeof value === 'string' && value.trim() !== '') {
                // If the value is a string and not empty, add it
                filteredFormData[key] = value.trim();
            } else if (Array.isArray(value) && value.length > 0) {
                // If it is an array and not empty, add it
                filteredFormData[key] = value;
            } else if (value !== undefined && value !== null) {
                // If the value is not undefined or null, add it
                filteredFormData[key] = value;
            }
        });

        try {
            // Directly calling editProduct
            const response = await editProduct(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedProduct = response.result;
                setSuccessMessage(response.message);
                onSave(editedProduct);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            const message = error.response?.data?.message || 'An error occurred while updating the product.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
            <form className="form-container" onSubmit={handleSubmit}>
                <header className="form-header">
                    <h2>{t('crud.form.product.title.update')}</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px' />
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                    <div className='form-field'>
                        <label>{t('crud.form.product.label.name.en')}</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name.en || ''}
                            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'en' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>{t('crud.form.product.label.name.es')}</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name.es || ''}
                            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'es' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>{t('crud.form.product.label.name.de')}</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name.de || ''}
                            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'de' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>{t('crud.form.product.label.description.en')}</label>
                        <input
                            type='text'
                            name='description'
                            value={formData.description.en || ''}
                            onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'en' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>{t('crud.form.product.label.description.es')}</label>
                        <input
                            type='text'
                            name='description'
                            value={formData.description.es || ''}
                            onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'es' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>{t('crud.form.product.label.description.de')}</label>
                        <input
                            type='text'
                            name='description'
                            value={formData.description.de || ''}
                            onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'de' } })}
                            required
                        />
                    </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.category')}</label>
                            <input
                                type='text'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.price')}</label>
                            <input
                                type='text'
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.ingredients')}</label>
                            <input
                                type='text'
                                name='ingredients'
                                value={formData.ingredients}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.vegetarian')}</label>
                            <select
                                name='vegetarian'
                                value={formData.vegetarian}
                                onChange={handleChange}
                            >
                                <option value={true}>{t('crud.form.product.label.yes')}</option>
                                <option value={false}>{t('crud.form.product.label.no')}</option>
                            </select>
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.image')}</label>
                            <input
                                type='text'
                                name='image'
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.video')}</label>
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
                    <button className="button" type="submit">{t('crud.form.button.update')}</button>
                </footer>
            </form>
        </div>
    );
};

export default EditProductForm;