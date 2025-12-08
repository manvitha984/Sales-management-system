import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ sortBy, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'Date-desc', label: 'Date (Newest First)', field: 'Date', order: 'desc' },
    { value: 'Date-asc', label: 'Date (Oldest First)', field: 'Date', order: 'asc' },
    { value: 'Quantity-desc', label: 'Quantity (High to Low)', field: 'Quantity', order: 'desc' },
    { value: 'Quantity-asc', label: 'Quantity (Low to High)', field: 'Quantity', order: 'asc' },
    { value: 'Customer Name-asc', label: 'Customer Name (A-Z)', field: 'Customer Name', order: 'asc' },
    { value: 'Customer Name-desc', label: 'Customer Name (Z-A)', field: 'Customer Name', order: 'desc' },
  ];

  const handleChange = (e) => {
    const selected = sortOptions.find(opt => opt.value === e.target.value);
    if (selected) {
      onSortChange(selected.field, selected.order);
    }
  };

  const getCurrentValue = () => {
    return `${sortBy}-${sortOrder}`;
  };

  return (
    <div className="flex items-center gap-1.5">
      <label className="text-xs font-medium text-gray-700 whitespace-nowrap">
        Sort by:
      </label>
      <div className="relative">
        <select
          value={getCurrentValue()}
          onChange={handleChange}
          className="appearance-none px-3 py-1.5 pr-8 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5">
          <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;