import React from 'react';
import { SORT_OPTIONS } from '../utils/constants';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2.5">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Sort by:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;