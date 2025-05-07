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
import ImgCarousel1 from '../assets/img/22994.jpg';
import ImgGoogleBadge from '../assets/img/google-badge.png';

function Homepage() {
    // Declare t for translations
    const { t } = useTranslation();

    return (
        <div className='page homepage'>
            <div className='section intro'>
                <h1>{t('restaurant.info.name')}</h1>
                <button className="btn-solid-dark">{t('nav.contact')}</button>
            </div>

            <div className='section section-grid-nav'>
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

            <div className='section section-extra-nav'>
                <NavLink className='btn-border-dark btn-full-width' to='/'>
                    <p>{t('nav.reservation')}</p>
                </NavLink>
                <NavLink className='btn-border-dark btn-full-width' to='/'>
                    <p>{t('nav.gift')}</p>
                </NavLink>
                <NavLink className='btn-border-dark btn-full-width' to='/'>
                    <p>{t('nav.rewards')}</p>
                </NavLink>
                <NavLink className='btn-border-dark btn-full-width' to='/'>
                    <p>{t('nav.personal')}</p>
                </NavLink>
            </div>

            <div className='section section-carousel'>
                <div className='section-content'>
                    <p>{t('section.carousel.content')}</p>
                    <div className='carousel-container'>
                        <div className='img-container'>
                            <img src={ImgCarousel1} alt="" width="250px" heigth="250px"/>
                        </div>
                        <div className='img-container'>
                            <img src={ImgCarousel1} alt="" width="250px" heigth="250px"/>
                        </div>
                        <div className='img-container'>
                            <img src={ImgCarousel1} alt="" width="250px" heigth="250px"/>
                        </div>
                        <div className='img-container'>
                            <img src={ImgCarousel1} alt="" width="250px" heigth="250px"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section section-dark section-review'>
                <div className='img-container'>
                    <img src={ImgGoogleBadge} alt="" width="250px" heigth="250px"/>
                </div>
                <div className='text-container column-start'>
                    <p>{t('section.review.content')}</p>
                    <button className="btn-border-light btn-full-width">{t('section.review.button')}</button>
                </div>
            </div>

            <div className='section section-icon-text'>
                <h2>{t('section.deals.title')}</h2>
                <div className='items-container'>

                    <div className='icon-text-container row-start'>
                        <div className='icon-container row-center'>
                            <img className='icon' src={IconNavDrink} alt='Drink nav icon'/>
                        </div>
                        <div className='text-container column-start'>
                            <h3>{t('section.deals.offerHappyHour.title')}</h3>
                            <p>{t('section.deals.offerHappyHour.content-1')}</p>
                            <p>{t('section.deals.offerHappyHour.content-2')}</p>
                        </div>
                    </div>
                    <div className='icon-text-container row-start'>
                        <div className='icon-container row-center'>
                            <img className='icon' src={IconNavDrink} alt='Drink nav icon'/>
                        </div>
                        <div className='text-container column-start'>
                            <h3>{t('section.deals.eventNewYear.title')}</h3>
                            <p>{t('section.deals.eventNewYear.content-1')}</p>
                            <p>{t('section.deals.eventNewYear.content-2')}</p>
                            <button className="btn-border-dark btn-full-width">{t('section.deals.eventNewYear.button')}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <h2>{t('section.newsletter.title')}</h2>
                <div className='section-content'>
                    <div className='img-container'>
                        <img src={ImgCarousel1} alt="" width="250px" heigth="250px"/>
                    </div>
                    <div className='text-container'>
                        <p>{t('section.newsletter.content-1')}</p>
                        <p>{t('section.newsletter.content-2')}</p>
                        <p>{t('section.newsletter.content-3')}</p>
                        <button className="btn-border-dark btn-full-width">{t('section.newsletter.button')}</button>
                    </div>
                </div>
            </div>

            <div className='section section-dark'>
                <h2>{t('section.aboutUs.title')}</h2>
                <p>{t('section.aboutUs.content-1')}</p>
                <p>{t('section.aboutUs.content-2')}</p>
                <p>{t('section.aboutUs.content-3')}</p>
            </div>
        </div>
    )
}

export default Homepage