// Import styles and libraries
import './__components.scss';
import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
//Import images
import ArrowLeft from '../assets/img/arrow-left.svg';
import ArrowRight from '../assets/img/arrow-right.svg';
import IconNavHome from '../assets/img/icon-nav-home.svg';
import IconNavFood from '../assets/img/icon-nav-food.svg';
import IconNavDrink from '../assets/img/icon-nav-drink.svg';
import IconNavOrder from '../assets/img/icon-nav-order.svg';


function BottomNav() {
    // Declare t for translations
    const { t } = useTranslation();

    // REDUX States
    const { role, isAuthenticated } = useSelector((state) => state.user);

    const footerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollFooter = (direction) => {
        const footer = footerRef.current;
        if (direction === 'left') {
            footer.scrollBy({ left: -100, behavior: 'smooth' });
        } else {
            footer.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };
    const checkScroll = () => {
        const footer = footerRef.current;
        setCanScrollLeft(footer.scrollLeft > 0);
        setCanScrollRight(footer.scrollWidth > footer.clientWidth && footer.scrollLeft + footer.clientWidth < footer.scrollWidth);
    };
    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => {
            window.removeEventListener('resize', checkScroll);
        };
    }, []);
    useEffect(() => {
        const footer = footerRef.current;
        footer.addEventListener('scroll', checkScroll);
        return () => {
            footer.removeEventListener('scroll', checkScroll);
        };
    }, []);

    return (
        <div className="bottomNav">
            {canScrollLeft && <button className="scrollButton" onClick={() => scrollFooter('left')}>
                <img className='arrow' src={ArrowLeft} alt='arrow'/>
            </button>}
            <footer className='bottomNavContainer' ref={footerRef}>
                <NavLink className='tab' to='/'>
                    <img className='icon' src={IconNavHome} alt='Home nav icon'/>
                </NavLink>
                |
                <NavLink className='tab' to='/foods'>
                    <img className='icon' src={IconNavFood} alt='Food nav icon'/>
                </NavLink>
                |
                <NavLink className='tab' to='/drinks'>
                    <img className='icon' src={IconNavDrink} alt='Drink nav icon'/>
                </NavLink>
                |
                <NavLink className='tab' to='/order'>
                    <img className='icon' src={IconNavOrder} alt='Order nav icon'/>
                </NavLink>
                {isAuthenticated && role === 'employee' && (
                    <NavLink className='tab' to='/cms'>{t('nav.user')}</NavLink>
                )}
            </footer>
            {canScrollRight &&
                <button className="scrollButton" onClick={() => scrollFooter('right')}>
                    <img className='arrow' src={ArrowRight} alt='arrow'/>
                </button>
            }
        </div>
    );
}

export default BottomNav;
