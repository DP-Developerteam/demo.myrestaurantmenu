// Import styles and libraries
import '../../../App.scss';
import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../productSlice';

// Import pages renderer
import ProductsCategory from './ProductsCategory';

function Drinks() {
    // Declare t for translations
    const { t } = useTranslation();

    // REDUX declarations
    const dispatch = useDispatch();

    // REDUX States
    const { products, error, lastUpdated } = useSelector((state) => state.product);

    // State to manage current view
    const [currentView, setCurrentView] = useState(null);

    // State to manage product card view: "default", "image", "video"
    // const [productCardView, setProductCardView] = useState("default");
    const [productCardView, setProductCardView] = useState(false); //this is a temporary solution until I get videos.

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
        cold: (
            <ProductsCategory
                category="cold"
                titleKey="product.nav.cold.title"
                descriptionKey="product.nav.cold.description"
                crossCategory="drinks"
                productCardView={productCardView}
            />
        ),
        hot: (
            <ProductsCategory
                category="hot"
                titleKey="product.nav.hot.title"
                descriptionKey="product.nav.hot.description"
                crossCategory="drinks"
                productCardView={productCardView}
            />
        ),
        fresh: (
            <ProductsCategory
                category="fresh"
                titleKey="product.nav.fresh.title"
                descriptionKey="product.nav.fresh.description"
                crossCategory="drinks"
                productCardView={productCardView}
            />
        ),
        alcohol: (
            <ProductsCategory
                category="alcohol"
                titleKey="product.nav.alcohol.title"
                descriptionKey="product.nav.alcohol.description"
                crossCategory="drinks"
                productCardView={productCardView}
            />
        ),
        cocktail: (
            <ProductsCategory
                category="cocktail"
                titleKey="product.nav.cocktail.title"
                descriptionKey="product.nav.cocktail.description"
                crossCategory="drinks"
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
    // const handleViewProductCard = (view = null) => {
        setProductCardView(!productCardView); //this is a temporary solution until I get videos.
        // setProductCardView(view);
    }

    // Handle return based in status fetched data
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='page product-page drinks'>
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
                <div className='section-product-page-default'>
                    <div className='section section-intro'>
                        <h1>{t('restaurant.info.name')}</h1>
                        <br/>
                        <button className="btn-border-dark">{t('nav.contact')}</button>
                    </div>
                    <div className='section section-extra-nav'>
                        {Object.keys(componentMap).map((category) => (
                            <div
                                className="btn btn-border-dark btn-full-width btn-subtitel"
                                key={category}
                                onClick={() => handleViewChange(category)}
                            >
                                <p>{t(`product.nav.${category}.title`)}</p>
                                <span className="small">
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

export default Drinks