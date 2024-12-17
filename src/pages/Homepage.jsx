//Import styles and libraries
import '../App.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//Import images/icons
import IconNavHome from '../assets/img/icon-nav-home.svg';
import IconNavFood from '../assets/img/icon-nav-food.svg';
import IconNavDrink from '../assets/img/icon-nav-drink.svg';
import IconNavOrder from '../assets/img/icon-nav-order.svg';
// import ImgCarousel1 from '../assets/img/22994.jpg';

function Homepage() {

    const { t } = useTranslation();

    return (
        <div className='page homepage'>
            <div className='intro'>
                <h1>{t('home.intro.title')}</h1>
                <button className="btn-solid">{t('home.intro.button')}</button>
            </div>
            <div className='section-grid-nav'>
                <NavLink className='nav-item' to='/'>
                    <img className='icon' src={IconNavHome} alt='Home nav icon'/>
                    <p>{t('nav.home')}</p>
                </NavLink>
                <NavLink className='nav-item' to='/foods'>
                    <img className='icon' src={IconNavFood} alt='Home nav icon'/>
                    <p>{t('nav.foods')}</p>
                </NavLink>
                <NavLink className='nav-item' to='/order'>
                    <img className='icon' src={IconNavOrder} alt='Home nav icon'/>
                    <p>{t('nav.orders')}</p>
                </NavLink>
                <NavLink className='nav-item' to='/drinks'>
                    <img className='icon' src={IconNavDrink} alt='Home nav icon'/>
                    <p>{t('nav.drinks')}</p>
                </NavLink>
            </div>

            <div className='section-extra-nav'>
                <NavLink className='btn-border' to='/'>
                    <p>{t('nav.reservation')}</p>
                </NavLink>
                <NavLink className='btn-border' to='/'>
                    <p>{t('nav.gift')}</p>
                </NavLink>
                <NavLink className='btn-border' to='/'>
                    <p>{t('nav.rewards')}</p>
                </NavLink>
                <NavLink className='btn-border' to='/'>
                    <p>{t('nav.personal')}</p>
                </NavLink>
            </div>

            {/* <div className='section-carousel'>
                <p>Take a sneak peek at our cozy restaurant, where great food meets a welcoming atmosphere. Enjoy a blend of art, design, and tasty dishes made with love and care, all served in a relaxed, friendly setting.</p>
                <div className='carousel-container'>
                    <div className='img-container'>
                        <img src={ImgCarousel1} alt="" width="333px" heigth="333px"/>
                    </div>
                    <div className='img-container'>
                        <img src={ImgCarousel1} alt="" width="333px" heigth="333px"/>
                    </div>
                    <div className='img-container'>
                        <img src={ImgCarousel1} alt="" width="333px" heigth="333px"/>
                    </div>
                    <div className='img-container'>
                        <img src={ImgCarousel1} alt="" width="333px" heigth="333px"/>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Homepage