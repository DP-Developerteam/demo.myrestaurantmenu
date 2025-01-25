// Import styles and libraries
import '../../../App.scss';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux and slices
import { useSelector } from 'react-redux';
//Import images/icons
import IconNavFood from '../../../assets/img/icon-nav-food.svg';
import IconNavDrink from '../../../assets/img/icon-nav-drink.svg';

const ProductsCategory = ({ category, titleKey, descriptionKey, crossCategory, productCardView }) => {
    // const for translations
    const { t, i18n } = useTranslation();
    // get language code
    let lang = i18n.language.split('-')[0];

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
    // if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Use productCardView to render product card view
    const renderProductCard = (product) => {
        // Handle localized or non-localized name and description
        const localizedName = typeof product.name === 'string' ? product.name : product.name[lang] || product.name.en;
        const localizedDescription = typeof product.description === 'string' ? product.description : product.description[lang] || product.description.en;

        return (
            <>
                {productCardView ?
                    <>
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
                                <h3>{localizedName}</h3>
                                <p>{localizedDescription}</p>
                            </div>
                            <div className='price column'>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='product-card-content'>
                            <div className='text column'>
                                <h3>{localizedName}</h3>
                                <p>{localizedDescription}</p>
                            </div>
                            <div className='price column'>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    </>
                }
            </>
        )
        //SWITCH IS COMMENTED UNTIL I GET VIDEOS
        // switch (productCardView) {
        //     case "default":
        //         return <>
        //                     <div className='product-card-content'>
        //                         <div className='text column'>
        //                             <h3>{localizedName}</h3>
        //                             <p>{localizedDescription}</p>
        //                         </div>
        //                         <div className='price column'>
        //                             <p>${product.price}</p>
        //                         </div>
        //                     </div>
        //                     <hr/>
        //                 </>;
        //     case "image":
        //         return <>
        //                     <div className='product-image'>
        //                         <img src={product.image} alt="" width="400" height="400" loading="lazy"/>
        //                         <div className='icons-container'>
        //                             <p>C</p>
        //                             <p>L</p>
        //                             <p>S</p>
        //                         </div>
        //                     </div>
        //                     <div className='product-card-content'>
        //                         <div className='text column'>
        //                             <h3>{localizedName}</h3>
        //                             <p>{localizedDescription}</p>
        //                         </div>
        //                         <div className='price column'>
        //                             <p>${product.price}</p>
        //                         </div>
        //                     </div>
        //                     <hr/>
        //                 </>;
        //     case "video":
        //         return <>
        //                     <div className='product-image'>
        //                         <img src={product.image} alt="" width="400" height="400" loading="lazy"/>
        //                     </div>
        //                     <div className='product-card-content'>
        //                         <div className='text column'>
        //                             <h3>{localizedName}</h3>
        //                             <p>{localizedDescription}</p>
        //                         </div>
        //                         <div className='price column'>
        //                             <p>${product.price}</p>
        //                         </div>
        //                     </div>
        //                     <hr/>
        //                 </>;
        //     default:
        //         return <>
        //                     <div className='product-card-content'>
        //                         <div className='text column'>
        //                             <h3>{localizedName}</h3>
        //                             <p>{localizedDescription}</p>
        //                         </div>
        //                         <div className='price column'>
        //                             <p>${product.price}</p>
        //                         </div>
        //                     </div>
        //                     <hr/>
        //                 </>;
        // }
    };

    return (
        <>
            <div className="intro">
                <h1>{t(titleKey)}</h1>
                <p>{t(descriptionKey)}</p>
            </div>
            <div className="products-container">
                {categoryFilter.map((product) => (
                    <div key={product._id} className='product-card'>
                        {renderProductCard(product)}
                        <hr/>
                    </div>
                ))}
            </div>
            <div className="cross-selling-container">
                <div className='section section-icon-text'>
                    {/* {crossCategory === 'foods' ?
                        <h2>¿Algo de beber?</h2>
                        :
                        <h2>¿Algo de comer?</h2>
                    } */}
                    <div className='icon-text-container row-start'>
                        <div className='icon-container row-center'>
                            {crossCategory === 'foods' ?
                                <img className='icon' src={IconNavDrink} alt='Drink nav icon'/>
                                :
                                <img className='icon' src={IconNavFood} alt='Food nav icon'/>
                            }
                        </div>
                        <div className='text-container column-start'>
                            {crossCategory === 'foods' ?
                                <>
                                    <h3>{t('product.crossSelling.drink.title')}</h3>
                                </>
                                :
                                <>
                                    <h3>{t('product.crossSelling.food.title')}</h3>
                                </>
                            }
                            <NavLink className='nav-item btn-border-dark btn-full-width' to={crossSellingPath}>
                                <p>{crossCategory === 'foods' ? t('product.crossSelling.drink.button') : t('product.crossSelling.food.button') }</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsCategory;