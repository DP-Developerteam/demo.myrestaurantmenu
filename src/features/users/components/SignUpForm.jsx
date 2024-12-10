// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
//Import functions
import { signupUser } from '../userService';
// Access user token from Redux
import { useSelector } from 'react-redux';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';


const SignUpForm = ({onCloseModals, onSave}) => {
    // State for loading and error handling
    const { token, errorMessage } = useSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    // State formData
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: 'client'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrorMessage('');
        try {
            // Directly calling signupUser
            const response = await signupUser(formData, token);
            // Check response
            if (response && response.message) {
                const createdUser = response.result;
                setSuccessMessage(response.message);
                onSave(createdUser);
            }
        } catch (error) {
            console.error('Signup error:', error); // Log the full error for debugging
        }
    };


    return (
        <div className='modal-overlay'>
            <form className='form-container' onSubmit={handleSubmit}>
                <header className='form-header'>
                    <h2>Register user</h2>
                    <button className='button' type='button' onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <label>Name:</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>User name:</label>
                            <input
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Password:</label>
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Role:</label>
                            <select
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value='client'>Client</option>
                                <option value='employee'>Employee</option>
                            </select>
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {successMessage && <p className='error-message'>{successMessage}</p>}
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <button className='button' type='submit'>Sign Up</button>
                </footer>
            </form>
        </div>
    );
};

export default SignUpForm;
