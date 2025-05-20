// Import styles and libraries
import '../../../App.scss';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux
import { useSelector } from 'react-redux';
// Import components
import ProductModal from '../components/ProductModal.jsx'
//Import assets
import IconNavFood from '../../../assets/img/icon-nav-food.svg';
import IconNavDrink from '../../../assets/img/icon-nav-drink.svg';
import IconProductLike from '../../../assets/img/icon-like.svg';
import IconProductAdd from '../../../assets/img/icon-add.svg';
import IconExpand from '../../../assets/img/icon-expand.svg';

const ProductsCategory = ({ category, titleKey, descriptionKey, crossCategory, productCardView }) => {
    // const for translations
    const { t, i18n } = useTranslation();
    // get language code
    let lang = i18n.language.split('-')[0];

    // REDUX
    const { products, error } = useSelector((state) => state.product);
    const { isAuthenticated } = useSelector(state => state.user);

    // Memoizing the filtered products to prevent recalculation on every render
    const categoryFilter = useMemo(() => {
        return products.filter((product) => product.category === category);
    }, [products, category]);

    // Determine the cross-selling target based on the current category
    const crossSellingCategory = crossCategory === 'foods' ? 'drinks' : 'foods';
    const crossSellingPath = `/${crossSellingCategory}`;

    // State for modal
    const [productModal, setProductModal] = useState({
        isOpen: false,
        type: null,
        product: {}
    });
    // Handle modal
    const handleProductModal = (type, product) => {
        setProductModal({ isOpen: true, type: type, product: product });
    };
    // Close modal
    const closeProductModal = () => {
        setProductModal({ isOpen: false, type: null, content: null });
    };

    // Handle like button
    const handleProductLike = (type, product) => {
        if (!isAuthenticated) {
            handleProductModal(type, product);
        } else {
            console.log("You clicked the like button")
            return
        }
    }
    // Handle add button
    const handleProductAdd = () => {
        console.log("You clicked the add button")
        return
    }

    // Optimization video autoplay only when item is visible in the screen
    // Declare videoRefs
    const videoRefs = useRef([]);
    // useEffect
    useEffect(() => {
        // Check productCardView. Continue only if it is video.
        if (productCardView === 'image' || productCardView === 'default') return;
        // Declare options for IntersectionObserver
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4 // percentage of view of the video to set autoplay
        };
        // Declare callback for IntersectionObserver
        const callback = (entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play()
                        .then(() => {
                            video.classList.add('playing');
                        })
                        .catch(e => console.log('Autoplay prevented:', e));
                } else {
                    video.pause();
                    video.classList.remove('playing');
                }
            });
        };
        // Declare observers
        const observers = [];
        // IntersectionObserver
        videoRefs.current.forEach(video => {
            if (video) {
                const observer = new IntersectionObserver(callback, options);
                observer.observe(video);
                observers.push(observer);
            }
        });
        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [productCardView, categoryFilter]); // Re-run when view or category changes
    // Set video Ref
    const setVideoRef = (el) => {
        if (el && !videoRefs.current.includes(el)) {
            videoRefs.current.push(el);
        } else if (!el) {
            videoRefs.current = videoRefs.current.filter(ref => ref !== el);
        }
    };

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
                            <button onClick={() => handleProductLike('unauthorized', product)} >
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button onClick={() => handleProductAdd('unauthorized', product)} >
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
                            <img className='icon' src={IconExpand} alt="" loading="lazy" onClick={() => handleProductModal('image', product)}/>
                            <img src={product.image} alt="" loading="lazy"/>
                        </div>
                        <div className='icons-container'>
                            <button onClick={() => handleProductLike('unauthorized', product)} >
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button onClick={() => handleProductAdd('unauthorized', product)} >
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
            case "video":
                return (
                    <>
                        <div className='product-image'>
                            <img className='icon' src={IconExpand} alt="" loading="lazy" onClick={() => handleProductModal('video', product)}/>
                            <video
                                ref={setVideoRef}
                                muted
                                loop
                                playsInline
                                controls={false}
                                src={product.video}
                                poster={product.image}
                                loading="lazy"
                                preload="none"
                                aria-label={localizedName}
                            >
                                Your browser does not support HTML5 video.
                            </video>
                        </div>
                        <div className='icons-container'>
                            <button onClick={() => handleProductLike('unauthorized', product)} >
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button onClick={() => handleProductAdd('unauthorized', product)} >
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
            default:
                return (
                    <>
                        <div className='icons-container'>
                            <button onClick={() => handleProductLike('unauthorized', product)} >
                                <img className='icon' src={IconProductLike} alt='Like icon'/>
                                <p className='font-small'>{product.likes}</p>
                            </button>
                            <button onClick={() => handleProductAdd('unauthorized', product)} >
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
            {productModal.isOpen && (
                <ProductModal
                    type={productModal.type}
                    product={productModal.product}
                    onCloseProductModal={closeProductModal}
                />
            )}
        </>
    );
};

export default ProductsCategory;