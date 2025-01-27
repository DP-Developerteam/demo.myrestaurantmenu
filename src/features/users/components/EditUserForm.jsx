// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// Import service
import { editUser } from '../userService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditUserForm = ({ user, onCloseModals, onSave }) => {
    // Obtener el idioma actual
    const { t } = useTranslation();

    // Get token to authorize update
    const { token } = useSelector((state) => state.user);
    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Set formData when user is updated
    const [formData, setFormData] = useState({
        name: user.name || '',
        username: user.username || '',
        password: '',
        role: user.role || '',
    });
    // Sync formData with product data
    useEffect(() => {
        setFormData({
            name: user.name || '',
            username: user.username || '',
            password: '',
            role: user.role || '',
        });
    }, [user]);

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
            _id: user._id,
            ...user,
        };

        // Iteramos sobre los campos del formulario y solo agregamos los que no están vacíos
        Object.keys(formData).forEach((key) => {
            const value = formData[key];

            // Verificamos que el valor sea una cadena antes de usar trim()
            if (typeof value === 'string' && value.trim() !== '') {
                // If value is type string and it is not empty, then we add it to filteredFormData
                if (key === 'password' && value.trim() === '') {
                    return;  // No incluir la contraseña si está vacía
                }
                filteredFormData[key] = value.trim();
            } else if (Array.isArray(value) && value.length > 0) {
                // If it is an array and it is not empty, then we add it to filteredFormData
                filteredFormData[key] = value;
            } else if (value !== undefined && value !== null) {
                // If valueis not undefined o null, then we add it to filteredFormData
                filteredFormData[key] = value;
            }
        });

        // Si no hay cambios en los datos, no enviamos la solicitud
        if (JSON.stringify(filteredFormData) === JSON.stringify(user)) {
            return;  // No hacemos la solicitud si no hay cambios
        }

        try {
            // Directly calling editUser
            const response = await editUser(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedUser = response.result;
                setSuccessMessage(response.message);
                onSave(editedUser);
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
                        <h2>{t('crud.form.user.title.update')}</h2>
                        <button className="button" type="button" onClick={onCloseModals}>
                            <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                        </button>
                    </header>
                    <div className='form-body'>
                        <div className='form-group'>
                            <div className='form-field'>
                                <label>{t('crud.form.user.label.name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>{t('crud.form.user.label.username')}</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>{t('crud.form.user.label.password')}</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={t('crud.form.user.placeholder.password')}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>{t('crud.form.user.label.role')}</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="employee">{t('crud.filter.role.employee')}</option>
                                    <option value="client">{t('crud.filter.role.client')}</option>
                                </select>
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

export default EditUserForm;
