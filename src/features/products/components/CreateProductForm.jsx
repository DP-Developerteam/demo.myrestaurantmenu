// Import styles and libs
import '../../../App.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import redux
import { useSelector } from 'react-redux';
// Import services
import { createProduct } from '../productService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const CreateProductForm = ({ onCloseModals, onSave }) => {
    // Declare t for translations
    const { t } = useTranslation();

    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // REDUX States
    const { token } = useSelector((state) => state.user);

    // State formData
    const [formData, setFormData] = useState({
        name: { en: '', es: '', de: '' },
        price: '',
        description: { en: '', es: '', de: '' },
        category: '',
        ingredients: '',
        image: '',
        video: '',
        vegetarian: false,
    });

    // Handle change
    const handleChange = (e) => {
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
            // Handle validation errors array
            if (error.response?.status === 422 && Array.isArray(error.response?.data)) {
                // Extract messages as an array
                const message = error.response.data.map(err => err.msg);
                setErrorMessage(message);
            } else {
                // Handle non-array errors
                const message = error.response?.data?.message || error.message || 'An error occurred during sign up.';
                setErrorMessage([message]);
            }
        }
    };

    return (
        <div className='modal-overlay'>
            <form className='form-container' onSubmit={handleSubmit}>
                <header className='form-header'>
                    <h2>{t('crud.form.product.title.create')}</h2>
                    <button className='button' type='button' onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px' />
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        {/* Field Name in english */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.name.en')}</label>
                            <input
                                type='text'
                                name='name'
                                placeholder={t('crud.form.product.placeholder.name.en')}
                                value={formData.name.en || ''}
                                onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'en' } })}
                                required
                            />
                        </div>
                        {/* Field Name in spanish */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.name.es')}</label>
                            <input
                                type='text'
                                name='name'
                                placeholder={t('crud.form.product.placeholder.name.es')}
                                value={formData.name.es || ''}
                                onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'es' } })}
                                required
                            />
                        </div>
                        {/* Field Name in german */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.name.de')}</label>
                            <input
                                type='text'
                                name='name'
                                placeholder={t('crud.form.product.placeholder.name.de')}
                                value={formData.name.de || ''}
                                onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'de' } })}
                                required
                            />
                        </div>
                        {/* Field Description in english */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.description.en')}</label>
                            <input
                                type='text'
                                name='description'
                                placeholder={t('crud.form.product.placeholder.description.en')}
                                value={formData.description.en || ''}
                                onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'en' } })}
                                required
                            />
                        </div>
                        {/* Field Description in spanish */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.description.es')}</label>
                            <input
                                type='text'
                                name='description'
                                placeholder={t('crud.form.product.placeholder.description.es')}
                                value={formData.description.es || ''}
                                onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'es' } })}
                                required
                            />
                        </div>
                        {/* Field Description in german */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.description.de')}</label>
                            <input
                                type='text'
                                name='description'
                                placeholder={t('crud.form.product.placeholder.description.de')}
                                value={formData.description.de || ''}
                                onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'de' } })}
                                required
                            />
                        </div>
                        {/* Rest of the fields */}
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.category')}</label>
                            <input
                                type='text'
                                name='category'
                                placeholder={t('crud.form.product.placeholder.category')}
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.price')}</label>
                            <input
                                type='text'
                                name='price'
                                placeholder={t('crud.form.product.placeholder.price')}
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.ingredients')}</label>
                            <input
                                type='text'
                                name='ingredients'
                                placeholder={t('crud.form.product.placeholder.ingredients')}
                                value={formData.ingredients}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.vegetarian')}</label>
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
                            <label className='font-small'>{t('crud.form.product.label.image')}</label>
                            <input
                                type='text'
                                name='image'
                                placeholder={t('crud.form.product.placeholder.image')}
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.product.label.video')}</label>
                            <input
                                type='text'
                                name='video'
                                placeholder={t('crud.form.product.placeholder.video')}
                                value={formData.video}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {successMessage && <p className="error-message">{successMessage}</p>}
                    {errorMessage.length > 0 && (
                        <div className="error-messages">
                            {errorMessage.map((message, index) => (
                                <p key={index} className="font-smaller">
                                    <img className='icon' src={iconClose} alt='delete icon' width='10px' height='10px'/> {message}
                                </p>
                            ))}
                        </div>
                    )}
                    <button className="button" type="submit">{t('crud.form.button.create')}</button>
                </footer>
            </form>
        </div>
    );
};

export default CreateProductForm;