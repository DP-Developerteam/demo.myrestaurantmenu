import React, { useState, useEffect, useCallback } from 'react';
// Import assets
import iconSearch from '../../../assets/img/icon-search.svg';

function FilterProductBar({ setProductsFilterList, productsList }) {
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

        // If there's a search term, filter products whose client name or company includes the term (case insensitive)
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort the filtered products chronological by date based on the sortOrder ('asc' or 'desc')
        filteredProducts.sort((a, b) => {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)  // Sort A-Z if sortOrder is 'asc'
                : b.name.localeCompare(a.name); // Sort Z-A if sortOrder is 'desc'
        });

        // Update the products state with the filtered and sorted array
        setProductsFilterList(filteredProducts);
    }, [searchTerm, sortOrder, setProductsFilterList, productsList]); // Memoize the function based on dependencies

    // useEffect hook to invoke filterAndSortProducts whenever the function or its dependencies change
    useEffect(() => {
        filterAndSortProducts(); // Call the function to apply filtering and sorting
    }, [filterAndSortProducts]); // Run this effect only when filterAndSortProducts changes


    return (
        <div className='filter-bar'>
            <div className='form-group'>
                <div className='form-field search-bar'>
                    <label className='icon'>
                        <img className='icon' src={iconSearch} alt='delete icon' width='20px' height='20px'/>
                    </label>
                    <input
                        type="text"
                        placeholder="name or company"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-field toggle'>
                    <button className='toggle' onClick={handleSortOrder} >
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterProductBar;
