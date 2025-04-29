// Import styles and libs
// import '../../../App.scss';
import '../users.scss';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import REDUX
import { useSelector } from 'react-redux';
//Import services
import { editUser } from '../userService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditUserForm = ({ user, onCloseModals, onSave }) => {
    // Declare t for translations
    const { t } = useTranslation();

    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // REDUX States
    const { token } = useSelector((state) => state.user);

    // Set formData when user is updated
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
    });
    // Sync formData with product data
    useEffect(() => {
        setFormData({
            name: user.name || '',
            email: user.email || '',
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
            // Service call
            const response = await editUser(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedUser = response.result;
                setSuccessMessage(response.message);
                onSave(editedUser);
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
                                <label className='font-small'>{t('crud.form.user.label.name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label className='font-small'>{t('crud.form.user.label.email')}</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label className='font-small'>{t('crud.form.user.label.password')}</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={t('crud.form.user.placeholder.password')}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label className='font-small'>{t('crud.form.user.label.role')}</label>
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
                        {errorMessage.length > 0 && (
                            <div className="error-messages">
                                {errorMessage.map((message, index) => (
                                    <p key={index} className="font-smaller">
                                        <img className='icon' src={iconClose} alt='delete icon' width='10px' height='10px'/> {message}
                                    </p>
                                ))}
                            </div>
                        )}
                        <button className="button" type="submit">{t('crud.form.button.update')}</button>
                    </footer>
                </form>
        </div>
    );
};

export default EditUserForm;
