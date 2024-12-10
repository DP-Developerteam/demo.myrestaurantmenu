// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../productSlice';

const ProductsCategory = ({ category, titleKey, descriptionKey, crossCategory }) => {
    // const for translations
    const { t } = useTranslation();

    // REDUX
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.product);

    // Fetch products when the component mounts if reduxProducts is empty and is not loading
    useEffect(() => {
        if (!products.length && !isLoading) {
        dispatch(getProductsThunk());
        }
    }, [dispatch, products.length, isLoading]);

    // Memoizing the filtered products to prevent recalculation on every render
    const categoryFilter = useMemo(() => {
        return products.filter((product) => product.category === category);
    }, [products, category]);

    // Determine the cross-selling target based on the current category
    const crossSellingCategory = crossCategory === 'foods' ? 'drinks' : 'foods'; // Adjust as needed
    const crossSellingPath = `/${crossSellingCategory}`; // Ensure your routes match these paths


    // Handle return based in status fetched data
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="intro">
                <h1>{t(titleKey)}</h1>
                <p>{t(descriptionKey)}</p>
            </div>
            <div className="products-container">
                {categoryFilter.map((product) => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                </div>
                ))}
            </div>
            <div className="cross-selling-container">
                <NavLink className='nav-item' to={crossSellingPath}>
                    <p>{crossCategory === 'foods' ? t('nav.drinks') : t('nav.foods') }</p>
                </NavLink>
            </div>
        </>
    );
};

export default ProductsCategory;