import React, { useState } from 'react';
import searchLOGO from '../assets/search.png';

function Search() {
    const [query, setQuery] = useState('');

    const handleSearchMenuClick = () => {
        console.log('Hi User');
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', query);
        
    };

    return (
        <div className="flex items-center justify-between border border-gray-300 rounded-full bg-white w-full max-w-md mx-auto my-5 px-4 py-2 shadow-md hover:shadow-lg hover:border-blue-500 transition duration-300">
            {/* Menu Icon */}
            <button
                onClick={handleSearchMenuClick}
                className="text-2xl text-gray-700 bg-transparent cursor-pointer hover:scale-110 transition-transform duration-300"
            >
                ☰
            </button>
            
            
            <input
                type="text"
                placeholder="Type to search ..."
                className="flex-1 border-none outline-none px-4 py-2 text-gray-700 text-sm bg-gray-100 rounded-full focus:bg-white focus:shadow focus:ring-2 focus:ring-blue-10 transition duration-300"
                value={query}
                onChange={handleChange}
            />
            
           
            <button
                className="p-2 cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={handleSearch}
            >
                <img src={searchLOGO} alt="search" className="w-5 h-5" />
            </button>
        </div>
    );
}

export default Search;


