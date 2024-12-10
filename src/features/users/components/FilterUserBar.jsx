// Import libs
import React, { useState, useEffect, useCallback } from 'react';
// Import assets
import iconSearch from '../../../assets/img/icon-search.svg';

function FilterUserBar({ setUsersFilterList, usersList }) {
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

    // Define the function to filter and sort users, memoized with useCallback to avoid unnecessary re-creation
    const filterAndSortUsers = useCallback(() => {
        // Make a shallow copy of usersList array to avoid directly mutating the original
        let filteredUsers = [...usersList];
        // If there's a search term, filter users whose name or company includes the term (case insensitive)
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // Sort the filtered users alphabetically by name based on the sortOrder ('asc' or 'desc')
        filteredUsers.sort((a, b) => {
            return sortOrder === 'desc'
                ? a.name.localeCompare(b.name)  // Sort A-Z if sortOrder is 'asc'
                : b.name.localeCompare(a.name); // Sort Z-A if sortOrder is 'desc'
        });
        // // Update the users state with the filtered and sorted array
        setUsersFilterList(filteredUsers);
        // Return the filtered and sorted array
        return filteredUsers;
    }, [searchTerm, sortOrder, setUsersFilterList, usersList ]); // Memoize the function based on dependencies

    // useEffect hook to invoke filterAndSortUsers whenever the function or its dependencies change
    useEffect(() => {
        filterAndSortUsers(); // Call the function to apply filtering and sorting
    }, [filterAndSortUsers]);


    return (
        <div className='filter-bar'>
            <div className='form-group'>
                <div className='form-field search-bar'>
                    <label className='icon'>
                        <img className='icon' src={iconSearch} alt='delete icon' width='20px' height='20px'/>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='form-field toggle'>
                    <button className='toggle' onClick={handleSortOrder} >
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterUserBar;
