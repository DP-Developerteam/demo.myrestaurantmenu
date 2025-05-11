//Import styles and libraries
import '../App.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    // Declare t for translations
    const { t } = useTranslation();

    return (
        <div className='footer'>
            <div className='links'>
                <NavLink className='font-small' to='/'>{t('footer.legal')}</NavLink>
                <NavLink className='font-small' to='/'>{t('footer.privacy')}</NavLink>
                <NavLink className='font-small' to='/'>{t('footer.cookies')}</NavLink>
            </div>
            <p className='font-small font-bold'>{t('footer.copyright')}</p>
        </div>
    )
}

export default Footer