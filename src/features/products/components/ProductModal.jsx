// Import styles and libraries
// import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//Import assets
import IconClose from '../../../assets/img/icon-close.svg';

const ProductModal = ({ type, product, onCloseProductModal }) => {
    // const for translations
    const { t, i18n } = useTranslation();
    // get language code
    let lang = i18n.language.split('-')[0];
    // Determine product name based on current language
    const localizedName = typeof product.name === 'string' ? product.name : product.name[lang] || product.name.en;

    const renderContent = () => {
        switch (type) {
        case 'image':
            return (
                <img src={product.image} alt="Expanded view" className="modal-image" />
            );
        case 'video':
            return (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    src={product.video}
                    poster={product.image}
                    loading="lazy"
                    aria-label={localizedName}
                >
                    Your browser does not support HTML5 video.
                </video>
            );
        case 'unauthorized':
            return (
            <>
                <p className='bold font-large' >{t('product.modal.like.line1')} {localizedName}?</p>
                <Link className='font-small button btn-border-dark' to="/cms">{t('product.modal.like.line2')}</Link>
                <p className='font-bold' >{t('product.modal.like.line3')}</p>
                <Link className='font-small button btn-border-dark' to="/signup">{t('product.modal.like.line4')}</Link>
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