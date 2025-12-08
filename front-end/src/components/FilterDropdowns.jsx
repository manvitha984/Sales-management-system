import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const validateAgeRange = (min, max) => {
  const minAge = parseInt(min);
  const maxAge = parseInt(max);

  if (min && isNaN(minAge)) return 'Minimum age must be a valid number';
  if (max && isNaN(maxAge)) return 'Maximum age must be a valid number';
  if (minAge < 0) return 'Minimum age cannot be negative';
  if (maxAge < 0) return 'Maximum age cannot be negative';
  if (minAge > 150) return 'Minimum age cannot exceed 150';
  if (maxAge > 150) return 'Maximum age cannot exceed 150';
  if (min && max && minAge > maxAge) return 'Minimum age cannot be greater than maximum age';
  
  return null;
};

const validateDateRange = (start, end) => {
  if (!start && !end) return null;
  
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  if (start && isNaN(startDate?.getTime())) return 'Invalid start date';
  if (end && isNaN(endDate?.getTime())) return 'Invalid end date';
  if (startDate && endDate && startDate > endDate) return 'Start date cannot be after end date';
  
  return null;
};

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
        setFilterOptions({
          regions: response.data.data.regions || [],
          genders: response.data.data.genders || [],
          categories: response.data.data.categories || [],
          tags: response.data.data.tags || [],
          paymentMethods: response.data.data.paymentMethods || [],
          ageRange: response.data.data.ageRange || { min: 18, max: 100 },
          dateRange: response.data.data.dateRange || { min: null, max: null },
        });
      }
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  }, []);

  const handleMultiSelectChange = useCallback((filterType, value) => {
    if (!value || !value.trim()) return;

    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    if (newValues.length > 50) {
      console.warn(`Maximum 50 ${filterType} selections allowed`);
      return;
    }

    onFilterChange({
      ...filters,
      [filterType]: newValues,
    });
  }, [filters, onFilterChange]);

  const handleAgeRangeChange = useCallback((type, value) => {
    const newAgeRange = {
      ...filters.ageRange,
      [type]: value,
    };

    const error = validateAgeRange(newAgeRange.min, newAgeRange.max);
    if (error) {
      console.warn('Age range validation:', error);
    }

    onFilterChange({
      ...filters,
      ageRange: newAgeRange,
    });
  }, [filters, onFilterChange]);

  const handleDateRangeChange = useCallback((type, value) => {
    const newDateRange = {
      ...filters.dateRange,
      [type]: value,
    };

    const error = validateDateRange(newDateRange.start, newDateRange.end);
    if (error) {
      console.warn('Date range validation:', error);
    }

    onFilterChange({
      ...filters,
      dateRange: newDateRange,
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
      options: filterOptions.tags.slice(0, 100), 
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
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
          activeCount > 0
            ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>{label}</span>
        {activeCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-blue-600 text-white">
            {activeCount}
          </span>
        )}
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

const RangeFilter = ({ filters, handleAgeRangeChange, filterOptions }) => {
  const [error, setError] = useState(null);

  const handleChange = (type, value) => {
    handleAgeRangeChange(type, value);
    
    const newMin = type === 'min' ? value : filters.ageRange?.min;
    const newMax = type === 'max' ? value : filters.ageRange?.max;
    const validationError = validateAgeRange(newMin, newMax);
    setError(validationError);
  };

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-medium text-gray-700 mb-2">Select Age Range</p>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[11px] text-gray-600 mb-1">Min Age</label>
          <input
            type="number"
            placeholder="Min"
            min="0"
            max="150"
            value={filters.ageRange?.min || ''}
            onChange={(e) => handleChange('min', e.target.value)}
            className={`block w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-600 mb-1">Max Age</label>
          <input
            type="number"
            placeholder="Max"
            min="0"
            max="150"
            value={filters.ageRange?.max || ''}
            onChange={(e) => handleChange('max', e.target.value)}
            className={`block w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        </div>
      </div>
      {error && (
        <div className="flex items-start gap-1.5 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <svg className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-[11px] text-red-700 font-medium">{error}</p>
        </div>
      )}
      <p className="text-[11px] text-gray-500 mt-2">
        Available range: {filterOptions.ageRange.min} - {filterOptions.ageRange.max}
      </p>
    </div>
  );
};

const DateFilter = ({ filters, handleDateRangeChange }) => {
  const [error, setError] = useState(null);

  const handleChange = (type, value) => {
    handleDateRangeChange(type, value);
    
    const newStart = type === 'start' ? value : filters.dateRange?.start;
    const newEnd = type === 'end' ? value : filters.dateRange?.end;
    const validationError = validateDateRange(newStart, newEnd);
    setError(validationError);
  };

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-medium text-gray-700 mb-2">Select Date Range</p>
      <div>
        <label className="block text-[11px] text-gray-600 mb-1">From Date</label>
        <input
          type="date"
          value={filters.dateRange?.start || ''}
          onChange={(e) => handleChange('start', e.target.value)}
          className={`block w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>
      <div>
        <label className="block text-[11px] text-gray-600 mb-1">To Date</label>
        <input
          type="date"
          value={filters.dateRange?.end || ''}
          onChange={(e) => handleChange('end', e.target.value)}
          className={`block w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>
      {error && (
        <div className="flex items-start gap-1.5 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <svg className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-[11px] text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

const MultiSelectFilter = ({ options, filterType, filters, handleMultiSelectChange }) => {
  if (!options || options.length === 0) {
    return (
      <div className="text-center py-6">
        <svg className="mx-auto h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-gray-500">No options available</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-gray-700 mb-2">Select Options</p>
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors group"
          >
            <input
              type="checkbox"
              checked={filters[filterType]?.includes(option) || false}
              onChange={() => handleMultiSelectChange(filterType, option)}
              className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
            />
            <span className="ml-2.5 text-xs text-gray-700 group-hover:text-gray-900 transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
      {filters[filterType]?.length >= 50 && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-[11px] text-yellow-800">
            Maximum of 50 selections reached
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterDropdowns;