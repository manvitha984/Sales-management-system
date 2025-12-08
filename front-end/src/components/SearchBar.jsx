import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debounceTimerRef = useRef(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (isSubmittingRef.current) {
      isSubmittingRef.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    isSubmittingRef.current = true;
    
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm ml-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Name, Phone no."
          className="block w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Search by customer name or phone number"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;