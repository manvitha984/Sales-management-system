import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, X, ChevronDown } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: 18, max: 100 },
    dateRange: { min: null, max: null },
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales/filters`);
      if (response.data.success) {
        setFilterOptions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleMultiSelectChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...filters,
      [filterType]: newValues,
    });
  };

  const handleAgeRangeChange = (type, value) => {
    onFilterChange({
      ...filters,
      ageRange: {
        ...filters.ageRange,
        [type]: value,
      },
    });
  };

  const handleDateRangeChange = (type, value) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      region: [],
      gender: [],
      ageRange: { min: '', max: '' },
      category: [],
      tags: [],
      paymentMethod: [],
      dateRange: { start: '', end: '' },
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    count += filters.region?.length || 0;
    count += filters.gender?.length || 0;
    count += filters.category?.length || 0;
    count += filters.tags?.length || 0;
    count += filters.paymentMethod?.length || 0;
    if (filters.ageRange?.min || filters.ageRange?.max) count++;
    if (filters.dateRange?.start || filters.dateRange?.end) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-blue-600 rounded-full">
            {activeCount}
          </span>
        )}
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  {activeCount > 0 && (
                    <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {activeCount} active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {/* LEFT COLUMN */}
                  <div className="space-y-6">
                    {/* Customer Region */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Customer Region
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {filterOptions.regions.map((region) => (
                          <label
                            key={region}
                            className="flex items-center p-2.5 hover:bg-gray-50 rounded-md cursor-pointer border border-gray-200 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filters.region?.includes(region)}
                              onChange={() => handleMultiSelectChange('region', region)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{region}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Gender
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {filterOptions.genders.map((gender) => (
                          <label
                            key={gender}
                            className="flex items-center p-2.5 hover:bg-gray-50 rounded-md cursor-pointer border border-gray-200 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filters.gender?.includes(gender)}
                              onChange={() => handleMultiSelectChange('gender', gender)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{gender}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Age Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Age Range (A/2)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Min age"
                          value={filters.ageRange?.min || ''}
                          onChange={(e) => handleAgeRangeChange('min', e.target.value)}
                          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Max age"
                          value={filters.ageRange?.max || ''}
                          onChange={(e) => handleAgeRangeChange('max', e.target.value)}
                          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Available: {filterOptions.ageRange.min} - {filterOptions.ageRange.max}
                      </p>
                    </div>

                    {/* Product Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Product Category
                      </label>
                      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                        <div className="grid grid-cols-2 gap-2">
                          {filterOptions.categories.map((category) => (
                            <label
                              key={category}
                              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.category?.includes(category)}
                                onChange={() => handleMultiSelectChange('category', category)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">{category}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-6">
                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Tags
                      </label>
                      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                        <div className="grid grid-cols-2 gap-2">
                          {filterOptions.tags.slice(0, 40).map((tag) => (
                            <label
                              key={tag}
                              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.tags?.includes(tag)}
                                onChange={() => handleMultiSelectChange('tags', tag)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                              />
                              <span className="ml-2 text-sm text-gray-700 truncate">{tag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {filterOptions.paymentMethods.map((method) => (
                          <label
                            key={method}
                            className="flex items-center p-2.5 hover:bg-gray-50 rounded-md cursor-pointer border border-gray-200 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filters.paymentMethod?.includes(method)}
                              onChange={() => handleMultiSelectChange('paymentMethod', method)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Date Range
                      </label>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">From Date</label>
                          <input
                            type="date"
                            value={filters.dateRange?.start || ''}
                            onChange={(e) => handleDateRangeChange('start', e.target.value)}
                            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">To Date</label>
                          <input
                            type="date"
                            value={filters.dateRange?.end || ''}
                            onChange={(e) => handleDateRangeChange('end', e.target.value)}
                            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterPanel;