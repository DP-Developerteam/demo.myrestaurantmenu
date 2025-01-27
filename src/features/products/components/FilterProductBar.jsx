// Import styles and libraries
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// Import assets
import iconSearch from '../../../assets/img/icon-search.svg';

function FilterProductBar({ setProductsFilterList, productsList }) {
    // const for translations
    const { t, i18n } = useTranslation();
    // get language code
    const lang = i18n.language.split('-')[0];

    // State for the search input
    const [searchTerm, setSearchTerm] = useState('');
    // 'asc' for ascending, 'desc' for descending
    const [sortOrder, setSortOrder] = useState('asc');
    // State for the selected category
    const [selectedCategory, setSelectedCategory] = useState('');

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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
                return (
                    product.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });

            // If no products match the search term show all products
            if (filteredProducts.length === 0) {
                filteredProducts = [...productsList]; // Show all products
            }
        }

        // If a category is selected, filter products by category
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        // Sort the filtered products by name based on the sortOrder ('asc' or 'desc')
        filteredProducts.sort((a, b) => {
            return sortOrder === 'asc'
                ? a.name[lang].localeCompare(b.name[lang])  // Sort A-Z if sortOrder is 'asc'
                : b.name[lang].localeCompare(a.name[lang]); // Sort Z-A if sortOrder is 'desc'
        });

        // Update the products state with the filtered and sorted array
        setProductsFilterList(filteredProducts);
    }, [searchTerm, sortOrder, selectedCategory, setProductsFilterList, productsList, lang]);

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
                        placeholder={t('crud.filter.bar')}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-field category'>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">{t('crud.filter.all')}</option>
                        <option value="breakfast">{t('product.nav.breakfast.title')}</option>
                        <option value="brunch">{t('product.nav.brunch.title')}</option>
                        <option value="snack">{t('product.nav.snack.title')}</option>
                        <option value="cold">{t('product.nav.cold.title')}</option>
                        <option value="hot">{t('product.nav.hot.title')}</option>
                        <option value="fresh">{t('product.nav.fresh.title')}</option>
                        <option value="alcohol">{t('product.nav.alcohol.title')}</option>
                        <option value="cocktail">{t('product.nav.cocktail.title')}</option>
                    </select>
                </div>
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