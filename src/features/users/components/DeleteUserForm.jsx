import '../../../App.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
//Import functions
import { deleteUser } from '../userService';
// Access user token from Redux
import { useSelector } from 'react-redux';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';


function DeleteUserForm({ user, onCloseModals, onSave }) {
    // Obtener el idioma actual
    const { t } = useTranslation();

    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useSelector((state) => state.user);;

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Directly calling deleteUser
            const response = await deleteUser(user._id, token);
            // Check response
            if (response && response.message) {
                const deletedUser = response.result;
                setSuccessMessage(response.message);
                onSave(deletedUser);
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
                            <label>{t('crud.form.user.label.id')}</label>
                            <input type="text" value={user._id} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.user.label.name')}</label>
                            <input type="text" value={user.name} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>{t('crud.form.user.label.role')}</label>
                            {user.role === 'employee' ? <input type="text" value={t('crud.filter.role.employee')} readOnly={true} /> : <input type="text" value={t('crud.filter.role.client')} readOnly={true} />}
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
}

export default DeleteUserForm;
