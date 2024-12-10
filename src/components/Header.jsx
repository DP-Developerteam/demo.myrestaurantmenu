// Import styles and libraries
import './__components.scss';
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import Redux hooks
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/users/userSlice';
//Import images/icons
import Isologotipo from '../assets/img/ISOLOGOTIPO-DP-rest-menu.svg';
import MenuIcon from '../assets/img/menu-icon.svg';
import MenuOpenIcon from '../assets/img/menu-open-icon.svg';
import FlagUk from '../assets/img/flag-uk.svg';
import FlagSpain from '../assets/img/flag-spain.svg';
import FlagGermany from '../assets/img/flag-germany.svg';

function Header() {
    //Translations variables and hooks
    const { t, i18n } = useTranslation();
    const languages = [
        { code: "en", name: "United Kingdom", flag: FlagUk },
        { code: "es", name: "Spanish", flag: FlagSpain },
        { code: "de", name: "German", flag: FlagGermany },
    ];

    //Menu variables and functions
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    //Users related variables, hooks and function
    //Hook for navigation and location (URL)
    const navigate = useNavigate();
    const location = useLocation();
    // REDUX Initialize dispatch to update info of userSlice
    const dispatch = useDispatch();

    // Function to SignOut
    const signOut = () => {
        // Clear user information from Redux
        dispatch(clearUser());
        // Close Menu
        closeMenu();
        // Redirect to SignIn
        navigate('/signin');
    };
    // REDUX Variable to know if user is logged in or not. Used to render of the buttons.
    const { isLoggedIn } = useSelector((state) => state.user);

    // Variables to know if page is SignIn or SignUp
    const isOnSignInPage = location.pathname === '/signin';
    const isOnSignUpPage = location.pathname === '/signup';




    return (
        <header className='header'>
            <NavLink className='tab' onClick={closeMenu} to='/'>
                <img className='logo' src={Isologotipo} alt='isologotipo' />
            </NavLink>
            <button className='buttonMenu' onClick={toggleMenu}>
                <img className='icon' src={isMenuOpen ? MenuOpenIcon : MenuIcon} alt='menu icon' />
            </button>
            <nav className={`navContainer ${isMenuOpen ? 'open' : 'closed'}`}>
                <NavLink className='tab' onClick={closeMenu} to='/'>{t('nav.home')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='/menu'>{t('nav.menu')}</NavLink>

                {!isLoggedIn && !isOnSignInPage && (
                    <NavLink className='tab' onClick={closeMenu} to='/signin'>{t('nav.signIn')}</NavLink>
                )}
                {!isLoggedIn && !isOnSignUpPage && (
                    <NavLink className='tab' onClick={closeMenu} to='/signup'>{t('nav.signUp')}</NavLink>
                )}
                {isLoggedIn && (
                    <p className='tab' onClick={signOut}>{t('nav.signOut')}</p>
                )}

                <div className='languagesBox'>
                    {languages.map(language => (
                        <button className='language' onClick={() => {i18n.changeLanguage(language.code);}} key={language.code}>
                            <img className='flag' src={language.flag} alt={`${language.name} flag`} />
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Header;

