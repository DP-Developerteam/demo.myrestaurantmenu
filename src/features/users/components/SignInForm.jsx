// Import styles and libraries
// import '../../../App.scss';
import '../users.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importt REDUX
import { useDispatch } from 'react-redux';
import { clearUser, signInThunk } from '../userSlice';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';



const SignInForm = ({ onSignInSuccess }) => {
    // COMMENT TODO
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    // COMMENT TODO
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // State for loading and error handling
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Dispatch the loginUser thunk action
            const action = await dispatch(signInThunk(formData)).unwrap();

            // Variables to manage the SignIn
            const userToken = action.token;
            const userRole = action.role;
            const expiresIn = action.expiresIn;

            if (userToken) {
                // Show success SignIn notification
                onSignInSuccess();

                //Conditional to redirect based on role after login
                navigate(userRole === 'employee' ? '/cms' : '/');

                setTimeout(() => {
                    // Clear user when token expires
                    dispatch(clearUser());
                    // Redirect to homepage
                    navigate('/');
                }, expiresIn); // Call this after the expiration time

            }

        } catch (error) {
            setErrorMessage(error?.message || 'An error occurred during sign in.');
        }
    };

    return (
        <div className='modal-overlay'>
            <form onSubmit={handleSubmit} className='form-container'>
                <header className='form-header'>
                    <h2>Signin</h2>
                    <Link className='button' to='/'>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </Link>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <label>User name:</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="User name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className='button' type="submit">Login</button>
                </footer>
            </form>
        </div>
    );
};

export default SignInForm;
