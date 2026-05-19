import React, { useState } from 'react';

function Search() {
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
      e.preventDefault();
        console.log("search",search);
    };

  return (
    <div className="w-full pb-12 pt-4">
      <form className="max-w-2xl w-full mx-auto px-4" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            id="search"
            className="block w-full py-5 pl-14 pr-36 text-base text-gray-900 bg-white border border-gray-200 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(79,70,229,0.1)] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900/30 transition-all duration-300 outline-none"
            placeholder="Search for players, sports, or locations..."
            required
          />
          <button
          onClick={ (e) => handleSearch(e)}
            type="submit"
            className="absolute right-2.5 top-2.5 bottom-2.5 text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-full text-base px-8 py-2 transition-all duration-300 dark:focus:ring-indigo-800 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
