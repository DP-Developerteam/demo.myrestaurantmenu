import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
// Import redux and slices
import { useSelector } from 'react-redux';
// Import service
import { editProduct } from '../productService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditProductForm = ({ product, onCloseModals, onSave }) => {
    // Obtener el idioma actual
    const { i18n } = useTranslation();
    const lang = i18n.language.split('-')[0]; // Extraer el código de idioma principal (ej: "es" de "es-ES")

    // Get token to authorize update
    const { token } = useSelector((state) => state.user);
    // State for loading and error handling
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Set formData when product is updated
    const [formData, setFormData] = useState({
        name: typeof product.name === 'string' ? { en: product.name, es: '', de: '' } : product.name,
        price: product.price || '',
        description: typeof product.description === 'string' ? { en: product.description, es: '', de: '' } : product.description,
        category: product.category || '',
        ingredients: product.ingredients || '',
        image: product.image || '',
        video: product.video || '',
        vegetarian: product.vegetarian || false,
        _id: product._id,
    });

    // Sync formData with product data
    useEffect(() => {
        setFormData({
            name: typeof product.name === 'string' ? { en: product.name, es: '', de: '' } : product.name,
            price: product.price || '',
            description: typeof product.description === 'string' ? { en: product.description, es: '', de: '' } : product.description,
            category: product.category || '',
            ingredients: product.ingredients || '',
            image: product.image || '',
            video: product.video || '',
            vegetarian: product.vegetarian || false,
            _id: product._id,
        });
    }, [product]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, lang } = e.target; // Asegúrate de extraer `lang` del evento

        if (name === 'name' || name === 'description') {
            // Si el campo es name o description, actualizamos la traducción correspondiente
            setFormData((prevData) => ({
                ...prevData,
                [name]: {
                    ...prevData[name],
                    [lang]: value, // Usamos el `lang` específico del campo
                },
            }));
        } else {
            // Para otros campos, actualizamos directamente
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Crear un objeto con los datos filtrados
        const filteredFormData = {
            _id: product._id,
            ...formData,
        };

        try {
            // Directly calling editProduct
            const response = await editProduct(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedProduct = response.result;
                setSuccessMessage(response.message);
                onSave(editedProduct);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            const message = error.response?.data?.message || 'An error occurred while updating the product.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
            <form className="form-container" onSubmit={handleSubmit}>
                <header className="form-header">
                    <h2>Edit Product</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px' />
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                    <div className='form-field'>
                        <label>Name (English):</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name.en || ''}
                            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'en' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>Name (Spanish):</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name.es || ''}
                            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'es' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>Name (German):</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name.de || ''}
                            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value, lang: 'de' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>Description (English):</label>
                        <input
                            type='text'
                            name='description'
                            value={formData.description.en || ''}
                            onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'en' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>Description (Spanish):</label>
                        <input
                            type='text'
                            name='description'
                            value={formData.description.es || ''}
                            onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'es' } })}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <label>Description (German):</label>
                        <input
                            type='text'
                            name='description'
                            value={formData.description.de || ''}
                            onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value, lang: 'de' } })}
                            required
                        />
                    </div>
                        <div className='form-field'>
                            <label>Category:</label>
                            <input
                                type='text'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Price:</label>
                            <input
                                type='text'
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Ingredients:</label>
                            <input
                                type='text'
                                name='ingredients'
                                value={formData.ingredients}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Vegetarian:</label>
                            <select
                                name='vegetarian'
                                value={formData.vegetarian}
                                onChange={handleChange}
                            >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                        <div className='form-field'>
                            <label>Image:</label>
                            <input
                                type='text'
                                name='image'
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label>Video:</label>
                            <input
                                type='text'
                                name='video'
                                value={formData.video}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {successMessage && <p className="error-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="button" type="submit">Update Product</button>
                </footer>
            </form>
        </div>
    );
};

export default EditProductForm;
// // Import styles and libraries
// import '../../../App.scss';
// import React, { useEffect, useState } from 'react';
// // Import redux and slices
// import { useSelector } from 'react-redux';
// // Import service
// import { editProduct } from '../productService';
// // Import assets
// import iconClose from '../../../assets/img/icon-close.svg';

// const EditProductForm = ({product, onCloseModals, onSave}) => {
//     // Get token to authorize update
//     const { token } = useSelector((state) => state.user);
//     // State for loading and error handling
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     // Set formData when product is updated
//     const [formData, setFormData] = useState({
//         name: product.name || '',
//         price: product.price || '',
//         description: product.description || '',
//         category: product.category || '',
//         ingredients: product.ingredients || '',
//         image: product.image || '',
//         video: product.video || '',
//         vegetarian: product.vegetarian || false,
//         _id: product._id,
//     });
//     // Sync formData with product data
//     useEffect(() => {
//         setFormData({
//             name: product.name || '',
//             price: product.price || '',
//             description: product.description || '',
//             category: product.category || '',
//             ingredients: product.ingredients || '',
//             image: product.image || '',
//             video: product.video || '',
//             vegetarian: product.vegetarian || false,
//             _id: product._id,
//         });
//     }, [product]);

//     // Handle form input changes
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Handle submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage('');

//         // Include the user ID
//         const filteredFormData = {
//             _id: product._id,
//             ...product,
//         };

//         // Iteramos sobre los campos del formulario y solo agregamos los que no están vacíos
//         Object.keys(formData).forEach((key) => {
//             const value = formData[key];
//             // Verificamos que el valor sea una cadena antes de usar trim()
//             if (typeof value === 'string' && value.trim() !== '') {
//                 // If value is type string and it is not empty, then we add it to filteredFormData
//                 filteredFormData[key] = value.trim();
//             } else if (Array.isArray(value) && value.length > 0) {
//                 // If it is an array and it is not empty, then we add it to filteredFormData
//                 filteredFormData[key] = value;
//             } else if (value !== undefined && value !== null) {
//                 // If valueis not undefined o null, then we add it to filteredFormData
//                 filteredFormData[key] = value;
//             }
//         });

//         if (JSON.stringify(filteredFormData) === JSON.stringify(product)) {
//             // If there are no modifications at all, then we avoid API call
//             return;
//         }

//         try {
//             // Directly calling editProduct
//             const response = await editProduct(filteredFormData, token);
//             // Check response
//             if (response && response.message) {
//                 const editedProduct = response.result;
//                 setSuccessMessage(response.message);
//                 onSave(editedProduct);
//             }
//             // onSave(filteredFormData);
//         } catch (error) {
//             console.error('Error updating user:', error);
//             const message = error.response?.data?.message || 'An error occurred while updating the user.';
//             setErrorMessage(message);
//         }
//     };

//     return (
//         <div className="modal-overlay">
//                 <form className="form-container" onSubmit={handleSubmit}>
//                     <header className="form-header">
//                         <h2>Edit Product</h2>
//                         <button className="button" type="button" onClick={onCloseModals}>
//                             <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
//                         </button>
//                     </header>
//                     <div className='form-body'>
//                     <div className='form-group'>
//                         <div className='form-field'>
//                             <label>Name:</label>
//                                 <input
//                                     type='text'
//                                     name='name'
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className='form-field'>
//                                 <label>Description:</label>
//                                 <input
//                                     type='text'
//                                     name='description'
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className='form-field'>
//                                 <label>Category:</label>
//                                 <input
//                                     type='text'
//                                     name='category'
//                                     value={formData.category}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className='form-field'>
//                                 <label>Price:</label>
//                                 <input
//                                     type='text'
//                                     name='price'
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className='form-field'>
//                                 <label>Ingredients:</label>
//                                 <input
//                                     type='text'
//                                     name='ingredients'
//                                     value={formData.ingredients}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className='form-field'>
//                                 <label>Vegetarian:</label>
//                                 <select
//                                     name='vegetarian'
//                                     value={formData.vegetarian}
//                                     onChange={handleChange}
//                                 >
//                                     <option value={true}>Yes</option>
//                                     <option value={false}>No</option>
//                                 </select>
//                             </div>
//                             <div className='form-field'>
//                                 <label>Image:</label>
//                                 <input
//                                     type='text'
//                                     name='image'
//                                     value={formData.image}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className='form-field'>
//                                 <label>Video:</label>
//                                 <input
//                                     type='text'
//                                     name='video'
//                                     value={formData.video}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <footer className='form-footer'>
//                         {successMessage && <p className="error-message">{successMessage}</p>}
//                         {errorMessage && <p className="error-message">{errorMessage}</p>}
//                         <button className="button" type="submit">Update Product</button>
//                     </footer>
//                 </form>
//         </div>
//     );
// };

// export default EditProductForm