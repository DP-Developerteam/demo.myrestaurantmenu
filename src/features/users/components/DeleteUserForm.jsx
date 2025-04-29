// Import styles and libs
// import '../../../App.scss';
import '../users.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import REDUX
import { useSelector } from 'react-redux';
//Import services
import { deleteUser } from '../userService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';


function DeleteUserForm({ user, onCloseModals, onSave }) {
    // Declare t for translations
    const { t } = useTranslation();

    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // REDUX States
    const { token } = useSelector((state) => state.user);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Service call
            const response = await deleteUser(user._id, token);
            // Check response
            if (response && response.message) {
                const deletedUser = response.result;
                setSuccessMessage(response.message);
                onSave(deletedUser);
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
        <div className="modal-overlay">
            <div className="form-container">
                <header className="form-header">
                    <h2>{t('crud.form.user.title.delete')}</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <p>{t('crud.form.user.question.delete')}</p>
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.id')}</label>
                            <input type="text" value={user._id} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.name')}</label>
                            <input type="text" value={user.name} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.role')}</label>
                            {user.role === 'employee' ? <input type="text" value={t('crud.filter.role.employee')} readOnly={true} /> : <input type="text" value={t('crud.filter.role.client')} readOnly={true} />}
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
                    <button className="button" onClick={handleSubmit}>{t('crud.form.button.delete')}</button>
                    <button className="button" onClick={onCloseModals}>{t('crud.form.button.cancel')}</button>
                </footer>
            </div>
        </div>
    );
}

export default DeleteUserForm;
