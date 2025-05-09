//Import styles and libraries
import '../App.scss';
import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../features/products/productSlice';
// Import assets
import iconDelete from '../assets/img/icon-delete.svg';
import iconEdit from '../assets/img/icon-edit.svg';

const Order = () => {
    // Declare t for translations
    const { t, i18n } = useTranslation();
    // get language code
    let lang = i18n.language.split('-')[0];
    // REDUX Initialize dispatch
    const dispatch = useDispatch();
    const { products, isLoading, error, lastUpdated } = useSelector((state) => state.product);
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
            </div>
            <div className='section section-intro'>
                <ul className='items-container'>
                    {products.map((product) => {
                    // {productsAddedList.map((product) => {
                        return (
                            <li key={`product-${product._id}`} className='item'>
                                <div className='text-container'>
                                    <p className='description'>{product.name[lang]}</p>
                                </div>
                                <div className='buttons-container'>
                                    <button className='icon'>
                                    {/* <button className='icon' onClick={() => selectProductDelete(product)}> */}
                                        <img className='icon' src={iconDelete} alt='delete icon' width='20px' height='20px' />
                                    </button>
                                    <button className='icon'>
                                    {/* <button className='icon' onClick={() => selectProductEdit(product)}> */}
                                        <img className='icon' src={iconEdit} alt='edit icon' width='20px' height='20px' />
                                    </button>
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