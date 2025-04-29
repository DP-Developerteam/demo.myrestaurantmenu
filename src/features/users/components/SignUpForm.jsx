// Import styles and libs
// import '../../../App.scss';
import '../users.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
// Import REDUX
import { useSelector } from 'react-redux';
//Import services
import { signupUser } from '../userService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';


const SignUpForm = ({onCloseModals, onSave}) => {
    // Declare t for translations
    const { t } = useTranslation();
    // Declare navigate for useNavigate hook
    const navigate = useNavigate();

    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);

    // REDUX States
    const { isAuthenticated } = useSelector((state) => state.user);

    // State formData
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client'
    });

    // Handle changes in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submit for authorized users
    const handleSubmitEditors = async (e) => {
        e.preventDefault();
        setErrorMessage([]);
        try {
            // Service call
            const response = await signupUser(formData);
            // Check response
            if (response && response.message) {
                const createdUser = response.result;
                setSuccessMessage(response.message);
                onSave(createdUser);
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

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage([]);
        try {
            // Service call
            const response = await signupUser(formData);
            // Check response
            if (response && response.message) {
                setSuccessMessage(response.message);
                navigate('/cms', { replace: true });
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

    // If user is not logged in, show sign-in modal
    if (!isAuthenticated) {
        return (
            <div className='modal-overlay'>
                <form className='form-container' onSubmit={handleSubmit}>
                    <header className='form-header'>
                        <h2>{t('crud.form.user.title.create')}</h2>
                        <Link to="/cms">
                            <button className='button' type='button'>
                                <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                            </button>
                        </Link>
                    </header>
                    <div className='form-body'>
                        <div className='form-group'>
                            <div className='form-field'>
                                <label className='font-small'>{t('crud.form.user.label.name')}</label>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder={t('crud.form.user.placeholder.name')}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label className='font-small'>{t('crud.form.user.label.email')}</label>
                                <input
                                    type='text'
                                    name='email'
                                    placeholder={t('crud.form.user.placeholder.email')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label className='font-small'>{t('crud.form.user.label.password')}</label>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder={t('crud.form.user.placeholder.signinPassword')}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <footer className='form-footer'>
                        {successMessage && <p className='error-message'>{successMessage}</p>}
                        {errorMessage.length > 0 && (
                            <div className="error-messages">
                                {errorMessage.map((message, index) => (
                                    <p key={index} className="font-smaller">
                                        <img className='icon' src={iconClose} alt='delete icon' width='10px' height='10px'/> {message}
                                    </p>
                                ))}
                            </div>
                        )}
                        <button className="button" type="submit">{t('crud.form.button.send')}</button>
                    </footer>
                </form>
            </div>
        );
    }

    return (
        <div className='modal-overlay'>
            <form className='form-container' onSubmit={handleSubmitEditors}>
                <header className='form-header'>
                    <h2>{t('crud.form.user.title.create')}</h2>
                    <button className='button' type='button' onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.name')}</label>
                            <input
                                type='text'
                                name='name'
                                placeholder={t('crud.form.user.placeholder.name')}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.email')}</label>
                            <input
                                type='text'
                                name='email'
                                placeholder={t('crud.form.user.placeholder.email')}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.password')}</label>
                            <input
                                type='password'
                                name='password'
                                placeholder={t('crud.form.user.placeholder.signinPassword')}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.role')}</label>
                            <select
                                name='role'
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
                    {successMessage && <p className='error-message'>{successMessage}</p>}
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

export default SignUpForm;
