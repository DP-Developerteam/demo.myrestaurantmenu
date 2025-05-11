// Import styles and libraries
import '../../../App.scss';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../productSlice';

// Import to render based on categories
import ProductsCategory from './ProductsCategory';

//Import assets
import IconView from '../../../assets/img/icon-view.svg';

function Foods() {
    // Declare t for translations
    const { t } = useTranslation();
    // Single state to manage current view
    const [currentView, setCurrentView] = useState(null);
    // Single state to manage product card view: 'default', 'image', 'video'
    const [productCardView, setProductCardView] = useState('image');
    // REDUX Initialize dispatch
    const dispatch = useDispatch();
    const { products, error, lastUpdated } = useSelector((state) => state.product);

    // Check internet speed
    const isInternetSlow = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            return connection.downlink < 5; // Define slow threshold (e.g., 1 Mbps)
        }
        return false;
    };
    // If internet is slow and products have been fetched, avoid the API call
    useEffect(() => {
        const internetIsSlow = isInternetSlow();
        if (products.length === 0) {
            // If Redux Products is empty, then fetch products.
            dispatch(getProductsThunk());
        } else if (!internetIsSlow) {
            // If internet is fast, then do normal product fetching
            dispatch(getProductsThunk());
        } else {
            // If internet is slow and products have been fetched once, then avoid doing API calls.
            console.log('Using cache due to slow internet or already updated products.');
        }
    }, [dispatch, lastUpdated, currentView, products]);

    // Category case to render buttons and components
    const componentMap = {
        breakfast: (
            <ProductsCategory
                category='breakfast'
                titleKey='product.nav.breakfast.title'
                descriptionKey='product.nav.breakfast.description'
                crossCategory='foods'
                productCardView={productCardView}
            />
        ),
        brunch: (
            <ProductsCategory
                category='brunch'
                titleKey='product.nav.brunch.title'
                descriptionKey='product.nav.brunch.description'
                crossCategory='foods'
                productCardView={productCardView}
            />
        ),
        snack: (
            <ProductsCategory
                category='snack'
                titleKey='product.nav.snack.title'
                descriptionKey='product.nav.snack.description'
                crossCategory='foods'
                productCardView={productCardView}
            />
        ),
        dinner: (
            <ProductsCategory
                category='dinner'
                titleKey='product.nav.dinner.title'
                descriptionKey='product.nav.dinner.description'
                crossCategory='foods'
                productCardView={productCardView}
            />
        ),
    };

    // Handler to set current view
    const handleViewChange = (view = null) => {
        setCurrentView(view);
    };

    // Handler to set product card view
    const handleViewProductCard = () => {
        setProductCardView(view => {
            if (view === 'image') return 'default';
            if (view === 'default') return 'video';
            return 'image';
        });
    }

    // Handle return based in status fetched data
    // if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='page product-page foods'>
            {currentView ? (
                // Render selected component if a view is selected
                <>
                    <div className='nav-products-view'>
                        {/* <button className='btn-border-dark' onClick={() => handleViewChange()}>&lt;</button> */}
                        <div className='nav-container'>
                            {Object.keys(componentMap).map((category) => (
                                <button
                                    className='btn btn-border-dark'
                                    key={category}
                                    onClick={() => handleViewChange(category)}
                                >
                                    <p>{t(`product.nav.${category}.title`)}</p>
                                </button>
                            ))}
                        </div>
                        <button className='view-icons' onClick={handleViewProductCard}>
                            <p className='font-smaller'>{`${productCardView === 'default' ? 'Basic' : productCardView === 'image' ? 'Fotos' : 'Videos'}`}</p>
                            <img className='icon' src={IconView} alt='Drink nav icon'/>
                        </button>
                    </div>
                    {componentMap[currentView]}
                    <div className='section section-extra-nav'>
                        {Object.keys(componentMap).map((category) => (
                            <div
                                className='btn btn-border-dark btn-full-width btn-subtitel'
                                key={category}
                                onClick={() => handleViewChange(category)}
                            >
                                <p>{t(`product.nav.${category}.title`)}</p>
                                <span className='font-smaller'>
                                {t(`product.nav.${category}.description`)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                // Default view with navigation
                <div className='section section-product-page-default'>
                    <div className='section section-intro'>
                        <h1>{t('restaurant.info.name')}</h1>
                        <h3>{t('foods.intro.title')}</h3>
                    </div>
                    <div className='section section-extra-nav'>
                        {Object.keys(componentMap).map((category) => (
                            <div
                                className='btn btn-border-dark btn-full-width btn-subtitel'
                                key={category}
                                onClick={() => handleViewChange(category)}
                            >
                                <p>{t(`product.nav.${category}.title`)}</p>
                                <span className='font-smaller'>
                                {t(`product.nav.${category}.description`)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Foods