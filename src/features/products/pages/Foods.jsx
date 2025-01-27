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

function Foods() {
    // const for translations
    const { t } = useTranslation();
    // Single state to manage current view
    const [currentView, setCurrentView] = useState(null);
    // Single state to manage product card view: "default", "image", "video"
    // const [productCardView, setProductCardView] = useState("default");
    const [productCardView, setProductCardView] = useState(false); //this is a temporary solution until I get videos.
    // REDUX
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
            console.log("Using cache due to slow internet or already updated products.");
        }
    }, [dispatch, lastUpdated, currentView, products]);

    // Category case to render buttons and components
    const componentMap = {
        breakfast: (
            <ProductsCategory
                category="breakfast"
                titleKey="product.nav.breakfast.title"
                descriptionKey="product.nav.breakfast.description"
                crossCategory="foods"
                productCardView={productCardView}
            />
        ),
        brunch: (
            <ProductsCategory
                category="brunch"
                titleKey="product.nav.brunch.title"
                descriptionKey="product.nav.brunch.description"
                crossCategory="foods"
                productCardView={productCardView}
            />
        ),
        snack: (
            <ProductsCategory
                category="snack"
                titleKey="product.nav.snack.title"
                descriptionKey="product.nav.snack.description"
                crossCategory="foods"
                productCardView={productCardView}
            />
        ),
        dinner: (
            <ProductsCategory
                category="dinner"
                titleKey="product.nav.dinner.title"
                descriptionKey="product.nav.dinner.description"
                crossCategory="foods"
                productCardView={productCardView}
            />
        ),
    };

    // Handler to set current view
    const handleViewChange = (view = null) => {
        setCurrentView(view);
    };

    // Handler to set product card view
    const handleViewProductCard = (view = null) => {
        setProductCardView(!productCardView); //this is a temporary solution until I get videos.
        // setProductCardView(view);
    }

    // Handle return based in status fetched data
    // if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='page product-nav foods'>
            {currentView ? (
                // Render selected component if a view is selected
                <>
                    <div className='nav-products-view row-center'>
                        <button className='btn-border-dark' onClick={() => handleViewChange()}>&lt;</button>
                        <div className='view-icons row-center'>
                            <button className='btn-border-dark' onClick={() => handleViewProductCard()}>change VIEW</button> {/* this is a temporary solution until I get videos. */}
                            {/* <button className='btn-border-dark' onClick={() => handleViewProductCard('default')}>Default VIEW</button> */}
                            {/* <button className='btn-border-dark' onClick={() => handleViewProductCard('image')}>Image VIEW</button> */}
                            {/* <button className='btn-border-dark' onClick={() => handleViewProductCard('video')}>Video VIEW</button> */}
                        </div>
                    </div>
                    {componentMap[currentView]}
                </>
            ) : (
                // Default view with navigation
                <>
                    <div className='intro'>
                        <h1>{t('restaurant.info.name')}</h1>
                        <br/>
                        <button className="btn-border-dark">{t('nav.contact')}</button>
                    </div>
                    <div className='section-extra-nav'>
                        {Object.keys(componentMap).map((category) => (
                            <div
                                className="btn-border-dark btn-full-width btn-subtitel"
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

export default Foods