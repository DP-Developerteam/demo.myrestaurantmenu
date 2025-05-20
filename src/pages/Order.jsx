//Import styles and libraries
import '../App.scss';
import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';

const Order = () => {
    // Declare t for translations
    const { t, i18n } = useTranslation();
    // get language code
    let lang = i18n.language.split('-')[0];
    // REDUX Initialize dispatch
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.product);
    // Array to store and filter products data
    const [productsList, setProductsList] = useState([]);
    const [productsFilterList, setProductsFilterList] = useState([]);

    // Update local products when Redux products change
    useEffect(() => {
        setProductsList(products || []);
        setProductsFilterList(products || []);
    }, [products]);

    return (
        <div className='page order-page'>
            <div className='section section-intro'>
                <h2>{t('section.orders.intro.title')}</h2>
                <p>{t('section.orders.intro.content')}</p>
            </div>
            <div className='section section-order'>
                <ul className='items-container'>
                    {products.map((product) => {
                    // {productsAddedList.map((product) => {
                        return (
                            <li key={`product-${product._id}`} className='item'>
                                <div className='text-container'>
                                    <p className='description'>{product.name[lang]}</p>
                                </div>
                                <div className='amount-container'>
                                    <button className='icon btn-border-dark'>+</button>
                                    <p>5</p>
                                    <button className='icon btn-border-dark'>-</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Order