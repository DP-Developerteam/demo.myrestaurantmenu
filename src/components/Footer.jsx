//Import styles and libraries
import '../App.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className='footer column-start'>
            <div className='row-start'>
                <NavLink to='/'>{t('footer.legal')}</NavLink>
                <NavLink to='/'>{t('footer.privacy')}</NavLink>
                {/* <NavLink to='/'>{t('footer.cookies')}</NavLink> */}
            </div>
            <p>{t('footer.copyright')}</p>
        </div>
    )
}

export default Footer