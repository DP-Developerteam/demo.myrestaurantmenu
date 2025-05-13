// Import styles and libraries
import React from 'react';
import { useTranslation } from 'react-i18next';
//Import assets
import IconClose from '../../../assets/img/icon-close.svg';

const ProductModal = ({ type, product, onCloseProductModal }) => {
    // const for translations
    const { t, i18n } = useTranslation();
    // get language code
    let lang = i18n.language.split('-')[0];
    // Determine product name based on current language
    const localizedName = typeof product.name === 'string' ? product.name : product.name[lang] || product.name.en;

    console.log(product)

    const renderContent = () => {
        switch (type) {
        case 'image':
            return (
                <img src={product.image} alt="Expanded view" className="modal-image" />
            );
        case 'unauthorized':
            return (
            <>
                <p>Seems like you have tried to like "{localizedName}"</p>
                <p>To like a product you need to sign in before</p>
                <p>Sign in now and hit that like button like there is no tomorrow</p>
                <p>Don't you have an account yet? Create one right now</p>
            </>
            );
        default:
            return null;
        }
    };
    return (
        <div className="modal-overlay" onClick={onCloseProductModal}>
            <div className={`modal-container ${type}`} onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <p className='font-small'>{localizedName}</p>
                    <button className="button" type="button" onClick={onCloseProductModal}>
                        <img className='icon' src={IconClose} alt='delete icon' width='20px' height='20px' />
                    </button>
                </div>
                <div className={`modal-content ${type}`}>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default ProductModal