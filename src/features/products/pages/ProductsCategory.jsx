// Import styles and libraries
import '../../../App.scss';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux
import { useSelector } from 'react-redux';
//Import assets
import IconNavFood from '../../../assets/img/icon-nav-food.svg';
import IconNavDrink from '../../../assets/img/icon-nav-drink.svg';
import IconProductLike from '../../../assets/img/icon-like.svg';
import IconProductAdd from '../../../assets/img/icon-add.svg';

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
        // Determine the actual view mode
        let actualViewMode = productCardView;
        // Check if the product has a video
        if (productCardView === 'video' && product.video === '') {
            actualViewMode = 'image'; // Fallback to image if video not available
        }
        // Check if the product has an image
        if (actualViewMode === 'image' && product.image === '') {
            actualViewMode = 'default'; // Fallback to default if image not available
        }
        // Switch view of the card
        switch (actualViewMode) {
            case "default":
                return (
                    <>
                        <div className='icons-container'>
                            <button>
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button>
                                <p className='font-small'>{t('product.action.add')}</p>
                                <img className='icon' src={IconProductAdd} alt='Like icon'/>
                            </button>
                        </div>
                        <div className='product-card-content'>
                            <div className='text column'>
                                <h3>{localizedName}</h3>
                                <p>{localizedDescription}</p>
                            </div>
                            <div className='price column'>
                                <p>{product.price} €</p>
                            </div>
                        </div>
                    </>
                );
            case "image":
                return (
                    <>
                        <div className='product-image'>
                            <img src={product.image} alt="" loading="lazy"/>
                        </div>
                        <div className='icons-container'>
                            <button>
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button>
                                <p className='font-small'>{t('product.action.add')}</p>
                                <img className='icon' src={IconProductAdd} alt='Like icon'/>
                            </button>
                        </div>
                        <div className='product-card-content'>
                            <div className='text column'>
                                <h3>{localizedName}</h3>
                                <p>{localizedDescription}</p>
                            </div>
                            <div className='price column'>
                                <p>{product.price}€</p>
                            </div>
                        </div>
                    </>
                );
            case "video":
                return (
                    <>
                        <div className='product-image'>
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
                        </div>
                        <div className='icons-container'>
                            <button>
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button>
                                <p className='font-small'>{t('product.action.add')}</p>
                                <img className='icon' src={IconProductAdd} alt='Like icon'/>
                            </button>
                        </div>
                        <div className='product-card-content'>
                            <div className='text column'>
                                <h3>{localizedName}</h3>
                                <p>{localizedDescription}</p>
                            </div>
                            <div className='price column'>
                                <p>{product.price}€</p>
                            </div>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div className='icons-container'>
                            <button>
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button>
                                <p className='font-small'>{t('product.action.add')}</p>
                                <img className='icon' src={IconProductAdd} alt='Like icon'/>
                            </button>
                        </div>
                        <div className='product-card-content'>
                            <div className='text column'>
                                <h3>{localizedName}</h3>
                                <p>{localizedDescription}</p>
                            </div>
                            <div className='price column'>
                                <p>{product.price} €</p>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <>
            <div className="section-intro">
                <h1>{t(titleKey)}</h1>
                <p>{t(descriptionKey)}</p>
            </div>
            <div className="products-container">
                {categoryFilter.map((product) => (
                    <div key={product._id} className='product-card'>
                        {renderProductCard(product)}
                    </div>
                ))}
            </div>
            <div className="cross-selling-container">
                <div className='section section-icon-text'>
                    <div className='items-container'>
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
            </div>
        </>
    );
};

export default ProductsCategory;