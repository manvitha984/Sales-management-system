import React, { useState } from 'react';

const FilterPanel = ({ filters, onFilterChange, filterOptions }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (filterName) => {
    setOpenDropdown(openDropdown === filterName ? null : filterName);
  };

  const hasActiveFilter = (filterKey) => {
    if (filterKey === 'ageRange') {
      return filters.minAge || filters.maxAge;
    }
    if (filterKey === 'date') {
      return filters.startDate || filters.endDate;
    }
    return filters[filterKey]?.length > 0;
  };

  const FilterButton = ({ label, filterKey }) => {
    const isActive = hasActiveFilter(filterKey);
    const isOpen = openDropdown === filterKey;

    return (
      <button
        onClick={() => toggleDropdown(filterKey)}
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
          isActive
            ? 'bg-red-50 border-red-300 text-red-700'
            : isOpen
            ? 'bg-gray-100 border-gray-300 text-gray-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
      >
        <span>{label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        )}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <FilterButton label="Customer Region" filterKey="customerRegion" />
      <FilterButton label="Gender" filterKey="gender" />
      <FilterButton label="Age Range" filterKey="ageRange" />
      <FilterButton label="Product Category" filterKey="productCategory" />
      <FilterButton label="Tags" filterKey="tags" />
      <FilterButton label="Payment Method" filterKey="paymentMethod" />
      <FilterButton label="Date" filterKey="date" />
    </div>
  );
};

export default FilterPanel;