import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
// Import assets
import iconSearch from '../../../assets/img/icon-search.svg';

function FilterProductBar({ setProductsFilterList, productsList }) {
    // Obtener el idioma actual
    const { i18n } = useTranslation();
    const lang = i18n.language.split('-')[0]; // Extraer el código de idioma principal (ej: "es" de "es-ES")

    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Toggle sort order
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    // Define the function to filter and sort Products, memoized with useCallback to avoid unnecessary re-creation
    const filterAndSortProducts = useCallback(() => {
        // Make a shallow copy of productsList array to avoid directly mutating the original
        let filteredProducts = [...productsList];

        // If there's a search term, filter products whose name or description includes the term (case insensitive)
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => {
                // Obtener el nombre y la descripción traducidos
                const name = typeof product.name === 'string' ? product.name : product.name[lang] || product.name.en;
                const description = typeof product.description === 'string' ? product.description : product.description[lang] || product.description.en;

                // Filtrar por nombre o descripción
                return (
                    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        // Sort the filtered products by name based on the sortOrder ('asc' or 'desc')
        filteredProducts.sort((a, b) => {
            // Obtener los nombres traducidos para la comparación
            const nameA = typeof a.name === 'string' ? a.name : a.name[lang] || a.name.en;
            const nameB = typeof b.name === 'string' ? b.name : b.name[lang] || b.name.en;

            return sortOrder === 'asc'
                ? nameA.localeCompare(nameB)  // Sort A-Z if sortOrder is 'asc'
                : nameB.localeCompare(nameA); // Sort Z-A if sortOrder is 'desc'
        });

        // Update the products state with the filtered and sorted array
        setProductsFilterList(filteredProducts);
    }, [searchTerm, sortOrder, setProductsFilterList, productsList, lang]); // Añadir lang como dependencia

    // useEffect hook to invoke filterAndSortProducts whenever the function or its dependencies change
    useEffect(() => {
        filterAndSortProducts(); // Call the function to apply filtering and sorting
    }, [filterAndSortProducts]); // Run this effect only when filterAndSortProducts changes

    return (
        <div className='filter-bar'>
            <div className='form-group'>
                <div className='form-field search-bar'>
                    <label className='icon'>
                        <img className='icon' src={iconSearch} alt='search icon' width='20px' height='20px' />
                    </label>
                    <input
                        type="text"
                        placeholder="name or description"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-field toggle'>
                    <button className='toggle' onClick={handleSortOrder}>
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterProductBar;
// import React, { useState, useEffect, useCallback } from 'react';
// // Import assets
// import iconSearch from '../../../assets/img/icon-search.svg';

// function FilterProductBar({ setProductsFilterList, productsList }) {
//     const [searchTerm, setSearchTerm] = useState(''); // State for the search input
//     const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

//     // Handle search term change
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     // Toggle sort order
//     const handleSortOrder = () => {
//         setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
//     };

//     // Define the function to filter and sort Products, memoized with useCallback to avoid unnecessary re-creation
//     const filterAndSortProducts = useCallback(() => {
//         // Make a shallow copy of productsList array to avoid directly mutating the original
//         let filteredProducts = [...productsList];

//         // If there's a search term, filter products whose client name or company includes the term (case insensitive)
//         if (searchTerm) {
//             filteredProducts = filteredProducts.filter(product =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Sort the filtered products chronological by date based on the sortOrder ('asc' or 'desc')
//         filteredProducts.sort((a, b) => {
//             return sortOrder === 'asc'
//                 ? a.name.localeCompare(b.name)  // Sort A-Z if sortOrder is 'asc'
//                 : b.name.localeCompare(a.name); // Sort Z-A if sortOrder is 'desc'
//         });

//         // Update the products state with the filtered and sorted array
//         setProductsFilterList(filteredProducts);
//     }, [searchTerm, sortOrder, setProductsFilterList, productsList]); // Memoize the function based on dependencies

//     // useEffect hook to invoke filterAndSortProducts whenever the function or its dependencies change
//     useEffect(() => {
//         filterAndSortProducts(); // Call the function to apply filtering and sorting
//     }, [filterAndSortProducts]); // Run this effect only when filterAndSortProducts changes


//     return (
//         <div className='filter-bar'>
//             <div className='form-group'>
//                 <div className='form-field search-bar'>
//                     <label className='icon'>
//                         <img className='icon' src={iconSearch} alt='delete icon' width='20px' height='20px'/>
//                     </label>
//                     <input
//                         type="text"
//                         placeholder="name or company"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//             </div>
//             <div className='form-group'>
//                 <div className='form-field toggle'>
//                     <button className='toggle' onClick={handleSortOrder} >
//                         {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FilterProductBar;
