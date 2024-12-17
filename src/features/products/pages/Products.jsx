// Import styles and libraries
// import '../../../App.scss'; -> it's imported in products.scss
import '../products.scss';
import React, { useEffect, useState } from 'react';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../productSlice';
// Import components
import CreateProductForm from '../components/CreateProductForm';
import DeleteProductForm from '../components/DeleteProductForm';
import EditProductForm from '../components/EditProductForm';
import FilterProductBar from '../components/FilterProductBar';
import Notifications from '../../../components/Notifications';
// Import assets
import iconDelete from '../../../assets/img/icon-delete.svg';
import iconEdit from '../../../assets/img/icon-edit.svg';
import iconAdd from '../../../assets/img/icon-add.svg';
import iconArrowUp from '../../../assets/img/icon-arrow-up.svg';
import iconArrowDown from '../../../assets/img/icon-arrow-down.svg';

function Products() {
    // REDUX
    const dispatch = useDispatch();
    // const { products: reduxProducts, errorMessage } = useSelector((state) => state.product);
    const { products, isLoading, error, lastUpdated } = useSelector((state) => state.product);
    // const { token } = useSelector((state) => state.user);
    // State to show/hidde products
    const [showProducts, setShowProducts] = useState(true);
    // Array to store and filter products data
    const [productsList, setProductsList] = useState([]);
    const [productsFilterList, setProductsFilterList] = useState([]);
    // States for modals and selected product
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    // Show hide products
    const toggleProducts = () => {
        setShowProducts(!showProducts)
    }

    // Logic to fetch products when the component mounts
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
    }, [dispatch, lastUpdated, products]);
    // Update local products when Redux products change
    useEffect(() => {
        setProductsList(products || []);
        setProductsFilterList(products || []);
    }, [products]);

    // DELETE. Selected product and show delete modal
    const selectProductDelete = (product) => {
        setSelectedProduct(product);
        setDeleteModal(true);
    };
    // EDIT. Set the selected product and show edit modal
    const selectProductEdit = (product) => {
        setSelectedProduct(product);
        setEditModal(true);
    };
    // CREATE. Show create modal
    const createProduct = () => {
        setCreateModal(true);
    };
    // NOTIFICATION. Show create modal
    const notification = (type) => {
        setNotificationType(type);
        setNotificationModal(true);
    };
    // Close Notification
    const closeNotification = () => {
        setNotificationModal(false);
    }
    // Close  all modals
    const closeModals = () => {
        // Set all states to false. Add here all modals/states created in the file
        setDeleteModal(false);
        setEditModal(false);
        setCreateModal(false);
        setSelectedProduct(null);
    };

    // Handle return based in status fetched data
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='products-page crud-page'>
            <header className='header-container'>
                <div className='title-container'>
                    <h1 className='title'>Products</h1>
                    {showProducts === false ?
                        ( <img className='icon' onClick={(toggleProducts)} src={iconArrowDown} alt='delete icon' width='20px' height='20px'/> )
                        : ( <img className='icon' onClick={(toggleProducts)} src={iconArrowUp} alt='delete icon' width='20px' height='20px'/> )
                    }
                </div>
                <button className="button" onClick={() => createProduct()}>
                    Create product <img className='icon' src={iconAdd} alt='delete icon' width='20px' height='20px'/>
                </button>
            </header>
            {productsFilterList.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <>
                    {showProducts === false ? (
                        <></>
                    ) : (
                        <>
                            <div className='filter-bar-container'>
                                <FilterProductBar setProductsFilterList={setProductsFilterList} productsList={productsList} />
                            </div>
                            <ul className='items-container'>
                                {productsFilterList.map((product) => (
                                    <li key={`product-${product._id}`} className='item'>
                                        <div className='text-container'>
                                            <p className='paragraph bold'>{product.name}</p>
                                            <p className='paragraph description'>{product.description}</p>
                                            <p className='paragraph description'>{product.price} €</p>
                                        </div>
                                        <div className='buttons-container'>
                                            <button className='icon' onClick={() => selectProductDelete(product)}>
                                                <img className='icon' src={iconDelete} alt='delete icon' width='20px' height='20px' />
                                            </button>
                                            <button className='icon' onClick={() => selectProductEdit(product)}>
                                                <img className='icon' src={iconEdit} alt='edit icon' width='20px' height='20px' />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}

            {notificationModal && (
                <Notifications
                    type={notificationType}
                    onCloseNotification={closeNotification}
                />
            )}
            {createModal && (
                <CreateProductForm
                    onCloseModals={closeModals}
                    onSave={(createdProduct) => {
                        // setCurrentProduct(createdProduct)
                        setSelectedProduct(createdProduct)
                        setProductsList((prevProducts) => [...prevProducts, createdProduct]);
                        closeModals();
                        notification('product-create');
                    }}
                />
            )}
            {deleteModal && selectedProduct && (
                <DeleteProductForm
                    product={selectedProduct}
                    onCloseModals={closeModals}
                    onSave={(productId) => {
                        setProductsList((prevProducts) => prevProducts.filter(product => product._id !== productId));
                        closeModals();
                        notification('product-delete');
                    }}
                    />
                )}
            {editModal && selectedProduct && (
                <EditProductForm
                    product={selectedProduct}
                    onCloseModals={closeModals}
                    onSave={(updatedProduct) => {
                        // setCurrentProduct(updatedProduct)
                        setSelectedProduct(updatedProduct)
                        setProductsList(prevProducts => prevProducts.map(product => product._id === updatedProduct._id ? updatedProduct : product));
                        closeModals();
                        notification('product-edit');
                    }}
                />
            )}

        </div>
    );
};

export default Products;