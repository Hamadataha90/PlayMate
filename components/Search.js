import React, { useState, useCallback } from 'react';

/**
 * Search component
 * Props:
 *   posts     – the full array of posts from Firestore
 *   onSearch  – callback(filteredPosts) invoked whenever the query changes
 */
function Search({ posts = [], onSearch }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const runFilter = useCallback(
    (value) => {
      const q = value.trim().toLowerCase();
      if (!q) {
        onSearch?.(posts); // empty query → show all
        return;
      }

      const filtered = posts.filter((post) => {
        const title    = (post?.title    ?? '').toLowerCase();
        const game     = (post?.game     ?? '').toLowerCase();
        const desc     = (post?.desc     ?? '').toLowerCase();
        const location =
          typeof post?.location === 'object'
            ? `${post.location.city ?? ''} ${post.location.country ?? ''}`.toLowerCase()
            : (post?.location ?? '').toLowerCase();
        const userName = (post?.userName ?? '').toLowerCase();

        return (
          title.includes(q)    ||
          game.includes(q)     ||
          desc.includes(q)     ||
          location.includes(q) ||
          userName.includes(q)
        );
      });

      onSearch?.(filtered);
    },
    [posts, onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    runFilter(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.(posts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runFilter(query);
  };

  const resultCount =
    query.trim() !== ''
      ? posts.filter((post) => {
          const q = query.trim().toLowerCase();
          const title    = (post?.title    ?? '').toLowerCase();
          const game     = (post?.game     ?? '').toLowerCase();
          const desc     = (post?.desc     ?? '').toLowerCase();
          const location =
            typeof post?.location === 'object'
              ? `${post.location.city ?? ''} ${post.location.country ?? ''}`.toLowerCase()
              : (post?.location ?? '').toLowerCase();
          const userName = (post?.userName ?? '').toLowerCase();
          return (
            title.includes(q) || game.includes(q) || desc.includes(q) ||
            location.includes(q) || userName.includes(q)
          );
        }).length
      : null;

  return (
    <div className="w-full pb-12 pt-4">
      <form
        className="max-w-2xl w-full mx-auto px-4"
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search posts"
      >
        <label
          htmlFor="search-input"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        <div className="relative group">
          {/* Search icon */}
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none transition-colors duration-300 ${
              isFocused ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
            }`}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="block w-full py-5 pl-14 pr-36 text-base text-gray-900 bg-white border border-gray-200 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(79,70,229,0.1)] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900/30 transition-all duration-300 outline-none"
            placeholder="Search players, sports, locations..."
            autoComplete="off"
            aria-label="Search players, sports or locations"
          />

          {/* Clear button — only when there is a query */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-[8.5rem] top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Search button */}
          <button
            type="submit"
            className="absolute right-2.5 top-2.5 bottom-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-full text-base px-8 py-2 transition-all duration-300 dark:focus:ring-indigo-800 cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Result count hint */}
        {resultCount !== null && (
          <p className="mt-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse-once">
            {resultCount === 0
              ? 'No posts found — try a different keyword.'
              : `${resultCount} post${resultCount !== 1 ? 's' : ''} found`}
          </p>
        )}
      </form>
    </div>
  );
}

export default Search;
