// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import functions
import { deleteProduct } from '../productService';
// Access product token from Redux
import { useSelector } from 'react-redux';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const DeleteProductForm = ({ product, onCloseModals, onSave }) => {
    // const for translations
    const { t, i18n } = useTranslation();
    // get language code
    const lang = i18n.language.split('-')[0];

    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useSelector((state) => state.user);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            // Directly calling deleteProduct
            const response = await deleteProduct(product._id, token);
            // Check response
            if (response && response.message) {
                const deletedProduct = response.result;
                setSuccessMessage(response.message);
                onSave(deletedProduct);
            }
            // TODO: I don't know why, but this refresh the productsList
            if (response) {
                onSave(product._id);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred during sign up.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="form-container">
                <header className="form-header">
                    <h2>{t('crud.form.product.title.delete')}</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px' />
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <p>{t('crud.form.product.question.delete')}</p>
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.product.label.id')}</label>
                            <input type="text" value={product._id} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>{t(`crud.form.product.label.name.${lang}`)}</label>
                            <input
                                type="text"
                                value={typeof product.name === 'string' ? product.name : product.name[lang] || product.name.en}
                                readOnly={true}
                            />
                        </div>
                        <div className='form-field'>
                            <label>{t(`crud.form.product.label.description.${lang}`)}</label>
                            <input
                                type="text"
                                value={typeof product.description === 'string' ? product.description : product.description[lang] || product.description.en}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {successMessage && <p className="error-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="button" onClick={handleSubmit}>{t('crud.form.button.delete')}</button>
                    <button className="button" onClick={onCloseModals}>{t('crud.form.button.cancel')}</button>
                </footer>
            </div>
        </div>
    );
};

export default DeleteProductForm;