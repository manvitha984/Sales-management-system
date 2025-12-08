import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdowns from '../components/FilterDropdowns';
import SortDropdown from '../components/SortDropdown';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useSalesData } from '../hooks/useSalesData';

const INITIAL_FILTERS = {
  region: [],
  gender: [],
  ageRange: { min: '', max: '' },
  category: [],
  tags: [],
  paymentMethod: [],
  dateRange: { start: '', end: '' },
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('Date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const { salesData, statistics, pagination, loading, error, refetch } = useSalesData({
    search: searchTerm,
    filters,
    sortBy,
    sortOrder,
    page: currentPage,
    limit,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy, sortOrder]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = (path) => {
    console.log('Navigating to:', path);
  };

  return (
    <div className="h-screen flex bg-[#FAFAFA] overflow-hidden">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                Sales Management System
              </h1>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {/* Filters and Sort Row - Compact with smaller text */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <FilterDropdowns filters={filters} onFilterChange={handleFilterChange} />
              <div className="ml-auto">
                <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
              </div>
            </div>

            {/* Statistics Cards - Narrower */}
            {statistics && (
              <div className="flex items-start gap-3 mb-4">
                <StatCard
                  label="Total units sold"
                  value={statistics.totalQuantity?.toLocaleString() || 0}
                />
                <StatCard
                  label="Total Amount"
                  value={`₹${statistics.totalAmount?.toLocaleString('en-IN') || 0}`}
                  subtext={`(${statistics.totalRecords?.toLocaleString() || 0} SRs)`}
                />
                <StatCard
                  label="Total Discount"
                  value={`₹${statistics.totalDiscount?.toLocaleString('en-IN') || 0}`}
                  subtext={`(${statistics.totalRecords?.toLocaleString() || 0} SRs)`}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4">
                <ErrorMessage message={error} onRetry={refetch} />
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            )}

            {/* Sales Table */}
            {!loading && !error && salesData && salesData.length > 0 && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <SalesTable salesData={salesData} loading={loading} />
                  </div>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && (!salesData || salesData.length === 0) && (
              <EmptyState />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, subtext }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-3.5 shadow-sm flex-shrink-0 min-w-[200px]">
    <div className="flex items-center gap-2 mb-1.5">
      <p className="text-xs font-medium text-gray-600">{label}</p>
      <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/>
        <path strokeLinecap="round" d="M12 16v-4M12 8h.01"/>
      </svg>
    </div>
    <div className="flex items-baseline gap-2">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="text-[11px] text-gray-500">{subtext}</p>}
    </div>
  </div>
);

const EmptyState = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
    <svg
      className="mx-auto h-12 w-12 text-gray-400 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <h3 className="text-base font-semibold text-gray-900 mb-2">
      No sales records found
    </h3>
    <p className="text-sm text-gray-500">
      Try adjusting your search or filter criteria
    </p>
  </div>
);

export default Dashboard;