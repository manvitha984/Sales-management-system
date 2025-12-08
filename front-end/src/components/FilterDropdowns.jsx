import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FilterDropdowns = ({ filters, onFilterChange }) => {
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: 18, max: 100 },
    dateRange: { min: null, max: null },
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales/filters`);
      if (response.data?.success) {
        setFilterOptions(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  }, []);

  const handleMultiSelectChange = useCallback((filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...filters,
      [filterType]: newValues,
    });
  }, [filters, onFilterChange]);

  const handleAgeRangeChange = useCallback((type, value) => {
    onFilterChange({
      ...filters,
      ageRange: {
        ...filters.ageRange,
        [type]: value,
      },
    });
  }, [filters, onFilterChange]);

  const handleDateRangeChange = useCallback((type, value) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    });
  }, [filters, onFilterChange]);

  const clearFilter = useCallback((filterType) => {
    if (filterType === 'ageRange') {
      onFilterChange({
        ...filters,
        ageRange: { min: '', max: '' },
      });
    } else if (filterType === 'dateRange') {
      onFilterChange({
        ...filters,
        dateRange: { start: '', end: '' },
      });
    } else {
      onFilterChange({
        ...filters,
        [filterType]: [],
      });
    }
  }, [filters, onFilterChange]);

  const getActiveCount = useCallback((filterType) => {
    if (filterType === 'ageRange') {
      return filters.ageRange?.min || filters.ageRange?.max ? 1 : 0;
    }
    if (filterType === 'dateRange') {
      return filters.dateRange?.start || filters.dateRange?.end ? 1 : 0;
    }
    return filters[filterType]?.length || 0;
  }, [filters]);

  const filterConfig = useMemo(() => [
    {
      label: 'Customer Region',
      filterType: 'region',
      options: filterOptions.regions,
      isMulti: true,
    },
    {
      label: 'Gender',
      filterType: 'gender',
      options: filterOptions.genders,
      isMulti: true,
    },
    {
      label: 'Age Range',
      filterType: 'ageRange',
      isRange: true,
    },
    {
      label: 'Product Category',
      filterType: 'category',
      options: filterOptions.categories,
      isMulti: true,
    },
    {
      label: 'Tags',
      filterType: 'tags',
      options: filterOptions.tags.slice(0, 30),
      isMulti: true,
    },
    {
      label: 'Payment Method',
      filterType: 'paymentMethod',
      options: filterOptions.paymentMethods,
      isMulti: true,
    },
    {
      label: 'Date',
      filterType: 'dateRange',
      isDate: true,
    },
  ], [filterOptions]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filterConfig.map((config) => (
        <FilterDropdown
          key={config.filterType}
          {...config}
          filters={filters}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          dropdownRefs={dropdownRefs}
          handleMultiSelectChange={handleMultiSelectChange}
          handleAgeRangeChange={handleAgeRangeChange}
          handleDateRangeChange={handleDateRangeChange}
          clearFilter={clearFilter}
          getActiveCount={getActiveCount}
          filterOptions={filterOptions}
        />
      ))}
    </div>
  );
};

const FilterDropdown = ({
  label,
  filterType,
  options = [],
  isMulti = false,
  isRange = false,
  isDate = false,
  filters,
  openDropdown,
  setOpenDropdown,
  dropdownRefs,
  handleMultiSelectChange,
  handleAgeRangeChange,
  handleDateRangeChange,
  clearFilter,
  getActiveCount,
  filterOptions,
}) => {
  const isOpen = openDropdown === filterType;
  const activeCount = getActiveCount(filterType);

  const toggleDropdown = useCallback(() => {
    setOpenDropdown(isOpen ? null : filterType);
  }, [isOpen, filterType, setOpenDropdown]);

  const handleClearAndClose = useCallback(() => {
    clearFilter(filterType);
    setOpenDropdown(null);
  }, [clearFilter, filterType, setOpenDropdown]);

  return (
    <div className="relative" ref={(el) => (dropdownRefs.current[filterType] = el)}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span>{label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[240px] max-w-[280px]">
          <div className="p-3 max-h-[300px] overflow-y-auto">
            {isRange ? (
              <RangeFilter
                filters={filters}
                handleAgeRangeChange={handleAgeRangeChange}
                filterOptions={filterOptions}
              />
            ) : isDate ? (
              <DateFilter
                filters={filters}
                handleDateRangeChange={handleDateRangeChange}
              />
            ) : (
              <MultiSelectFilter
                options={options}
                filterType={filterType}
                filters={filters}
                handleMultiSelectChange={handleMultiSelectChange}
              />
            )}
          </div>

          {activeCount > 0 && (
            <div className="border-t border-gray-200 px-3 py-2">
              <button
                type="button"
                onClick={handleClearAndClose}
                className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const RangeFilter = ({ filters, handleAgeRangeChange, filterOptions }) => (
  <div className="space-y-2.5">
    <p className="text-xs font-medium text-gray-700 mb-2">Select Age Range</p>
    <div className="grid grid-cols-2 gap-2.5">
      <div>
        <label className="block text-[11px] text-gray-600 mb-1">Min Age</label>
        <input
          type="number"
          placeholder="Min"
          value={filters.ageRange?.min || ''}
          onChange={(e) => handleAgeRangeChange('min', e.target.value)}
          className="block w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-[11px] text-gray-600 mb-1">Max Age</label>
        <input
          type="number"
          placeholder="Max"
          value={filters.ageRange?.max || ''}
          onChange={(e) => handleAgeRangeChange('max', e.target.value)}
          className="block w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
    <p className="text-[11px] text-gray-500">
      Available range: {filterOptions.ageRange.min} - {filterOptions.ageRange.max}
    </p>
  </div>
);

const DateFilter = ({ filters, handleDateRangeChange }) => (
  <div className="space-y-2.5">
    <p className="text-xs font-medium text-gray-700 mb-2">Select Date Range</p>
    <div>
      <label className="block text-[11px] text-gray-600 mb-1">From Date</label>
      <input
        type="date"
        value={filters.dateRange?.start || ''}
        onChange={(e) => handleDateRangeChange('start', e.target.value)}
        className="block w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label className="block text-[11px] text-gray-600 mb-1">To Date</label>
      <input
        type="date"
        value={filters.dateRange?.end || ''}
        onChange={(e) => handleDateRangeChange('end', e.target.value)}
        className="block w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
);

const MultiSelectFilter = ({ options, filterType, filters, handleMultiSelectChange }) => (
  <div className="space-y-1.5">
    <p className="text-xs font-medium text-gray-700 mb-2">Select Options</p>
    {options.map((option) => (
      <label
        key={option}
        className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
      >
        <input
          type="checkbox"
          checked={filters[filterType]?.includes(option) || false}
          onChange={() => handleMultiSelectChange(filterType, option)}
          className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <span className="ml-2.5 text-xs text-gray-700">{option}</span>
      </label>
    ))}
  </div>
);

export default FilterDropdowns;