// Import styles and libs
// import '../../../App.scss';
import '../users.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useDispatch, useSelector } from 'react-redux';
import { tokenSignInThunk } from '../userSlice';

// Import assets
import iconClose from '../../../assets/img/icon-close.svg';
import iconGoogle from '../../../assets/img/icon-google.svg';



const SignInForm = () => {
    // Declare t for translations
    const { t } = useTranslation();

    // State for loading and error handling
    // const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);

    // REDUX States
    const { isLoading } = useSelector(state => state.user);
    // const { isAuthenticated, authMethod, isLoading, user } = useSelector(state => state.user);

    // REDUX declarations
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // State formData
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Set session sign in URL
    const googleAuthUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/google?redirect_uri=${
        encodeURIComponent(`${process.env.REACT_APP_FRONT_BASE_URL}/login?google_redirect=true`)
    }`;

    // Handle changes in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submit with token
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            // Service call
            await dispatch(tokenSignInThunk(formData)).unwrap();
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
            <form onSubmit={handleSubmit} className='form-container'>
                <header className='form-header'>
                    <h2>{t('crud.form.user.title.signin')}</h2>
                    <Link className='button' to='/'>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </Link>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.email')}</label>
                            <input
                                type="text"
                                name="email"
                                placeholder={t('crud.form.user.placeholder.email')}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label className='font-small'>{t('crud.form.user.label.password')}</label>
                            <input
                                type="password"
                                name="password"
                                placeholder={t('crud.form.user.placeholder.signinPassword')}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {errorMessage.length > 0 && (
                        <div className="error-messages ">
                            {errorMessage.map((message, index) => (
                                <p key={index} className="font-smaller">
                                    <img className='icon' src={iconClose} alt='delete icon' width='10px' height='10px'/> {message}
                                </p>
                            ))}
                        </div>
                    )}
                    <button className="button" type="submit" disabled={isLoading}>
                        {isLoading ? t('auth.loading') : t('crud.form.button.send')}
                    </button>
                    <div className='extra-button column-center'>
                        <p>{t('crud.form.or')}</p>
                        <a href={googleAuthUrl} className="text-link button-google row-center" disabled={isLoading}>
                            <img className='icon' src={iconGoogle} alt='delete icon' width='30px' height='30px'/>
                            <p>{t('crud.form.button.signinGoogle')}</p>
                        </a>
                    </div>
                    <div className='extra-button row-center'>
                        <p>{t('crud.form.user.question.signup')}</p>
                        <Link to="/signup" replace className="text-link" disabled={isLoading}>{t('crud.form.user.title.create')}</Link>
                        {/* <a href={googleAuthUrl} className="text-link row-center" disabled={isLoading}>
                            <p>{t('crud.form.user.question.signup')}</p>
                            <a href={googleAuthUrl} className="text-link" disabled={isLoading}>{t('crud.form.user.title.create')}</a>
                        </a> */}
                    </div>
                </footer>
            </form>
        </div>
    );
};

export default SignInForm;
