// Import styles and libraries
import '../../../App.scss';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector } from 'react-redux';

const ProductsCategory = ({ category, titleKey, descriptionKey, crossCategory }) => {
    // const for translations
    const { t } = useTranslation();

    // REDUX
    const { products, isLoading, error } = useSelector((state) => state.product);

    // Memoizing the filtered products to prevent recalculation on every render
    const categoryFilter = useMemo(() => {
        return products.filter((product) => product.category === category);
    }, [products, category]);

    // Determine the cross-selling target based on the current category
    const crossSellingCategory = crossCategory === 'foods' ? 'drinks' : 'foods';
    const crossSellingPath = `/${crossSellingCategory}`;

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
                <div key={product._id} className='product-card'>
                    <div className='product-image'>
                        <img src={product.image} alt="" width="400" height="400" loading="lazy"/>
                        <div className='icons-container'>
                            <p>C</p>
                            <p>L</p>
                            <p>S</p>
                        </div>
                    </div>
                    <div className='product-card-content'>
                        <div className='text column'>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                        <div className='price column'>
                            <p>${product.price}</p>
                        </div>
                    </div>
                    <hr/>
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