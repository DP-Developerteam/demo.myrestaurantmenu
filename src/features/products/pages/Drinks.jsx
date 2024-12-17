// Import styles and libraries
import '../../../App.scss';
import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../productSlice';

// Import to render based on categories
import ProductsCategory from './ProductsCategory';

function Drinks() {
    // const for translations
    const { t } = useTranslation();
    // Single state to manage current view
    const [currentView, setCurrentView] = useState(null);
    // REDUX
    const dispatch = useDispatch();
    const { products, isLoading, error, lastUpdated } = useSelector((state) => state.product);

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
            console.log("Using cache due to slow internet or already updated products.");
        }
    }, [dispatch, lastUpdated, currentView, products]);
    // // Fetch products when the component mounts if reduxProducts is empty
    // useEffect(() => {
    //     if (products.length === 0) {
    //         dispatch(getProductsThunk());
    //     }
    // }, [dispatch, products.length]);

    // Category case to render buttons and components
    const componentMap = {
        cold: (
            <ProductsCategory
                category="cold"
                titleKey="product.nav.cold.title"
                descriptionKey="product.nav.cold.description"
                crossCategory="drinks"
            />
        ),
        hot: (
            <ProductsCategory
                category="hot"
                titleKey="product.nav.hot.title"
                descriptionKey="product.nav.hot.description"
                crossCategory="drinks"
            />
        ),
        fresh: (
            <ProductsCategory
                category="fresh"
                titleKey="product.nav.fresh.title"
                descriptionKey="product.nav.fresh.description"
                crossCategory="drinks"
            />
        ),
        alcohol: (
            <ProductsCategory
                category="alcohol"
                titleKey="product.nav.alcohol.title"
                descriptionKey="product.nav.alcohol.description"
                crossCategory="drinks"
            />
        ),
        cocktail: (
            <ProductsCategory
                category="cocktail"
                titleKey="product.nav.cocktail.title"
                descriptionKey="product.nav.cocktail.description"
                crossCategory="drinks"
            />
        ),
    };

    // Handler to set current view
    const handleViewChange = (view = null) => {
        setCurrentView(view);
    };

    // Handle return based in status fetched data
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='page product-nav drinks'>
            {currentView ? (
                // Render selected component if a view is selected
                <>
                    <button className='btn btn-back' onClick={() => handleViewChange()}>&lt;</button>
                    {componentMap[currentView]}
                </>
            ) : (
                // Default view with navigation
                <>
                    <div className='intro'>
                        <h1>{t('product.intro.title')}</h1>
                        <button className="btn-solid">{t('product.intro.button')}</button>
                    </div>
                    <div className='section-extra-nav'>
                        {Object.keys(componentMap).map((category) => (
                            <div
                                className="btn-border"
                                key={category}
                                onClick={() => handleViewChange(category)}
                            >
                                <p>{t(`product.nav.${category}.title`)}</p>
                                <span className="fontSans18">
                                {t(`product.nav.${category}.description`)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Drinks