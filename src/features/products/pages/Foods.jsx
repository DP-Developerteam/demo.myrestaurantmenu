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
    // REDUX
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.product);
    // Fetch products when the component mounts if reduxProducts is empty
    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProductsThunk());
        }
    }, [dispatch, products.length]);

    // Category case to render buttons and components
    const componentMap = {
        breakfast: (
            <ProductsCategory
                category="breakfast"
                titleKey="product.nav.breakfast.title"
                descriptionKey="product.nav.breakfast.description"
                crossCategory="foods"
            />
        ),
        brunch: (
            <ProductsCategory
                category="brunch"
                titleKey="product.nav.brunch.title"
                descriptionKey="product.nav.brunch.description"
                crossCategory="foods"
            />
        ),
        snack: (
            <ProductsCategory
                category="snack"
                titleKey="product.nav.snack.title"
                descriptionKey="product.nav.snack.description"
                crossCategory="foods"
            />
        ),
        dinner: (
            <ProductsCategory
                category="dinner"
                titleKey="product.nav.dinner.title"
                descriptionKey="product.nav.dinner.description"
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
        <div className='page product-nav foods'>
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

export default Foods