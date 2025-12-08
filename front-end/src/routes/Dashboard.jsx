import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useSalesData } from '../hooks/useSalesData';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    ageRange: { min: '', max: '' },
    category: [],
    tags: [],
    paymentMethod: [],
    dateRange: { start: '', end: '' },
  });
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Sales Management System</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          <div className="flex-shrink-0">
            <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
          </div>
        </div>

        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total units sold</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {statistics.totalQuantity?.toLocaleString() || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ({statistics.totalRecords?.toLocaleString() || 0} SRs)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    ₹{statistics.totalAmount?.toLocaleString('en-IN') || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ({statistics.totalRecords?.toLocaleString() || 0} SRs)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Discount</p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    ₹{statistics.totalDiscount?.toLocaleString('en-IN') || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ({statistics.totalRecords?.toLocaleString() || 0} SRs)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {loading && <LoadingSpinner />}

        {!loading && !error && (
          <>
           <SalesTable 
  salesData={salesData || []}
  loading={loading} 
/>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}

        {!loading && !error && (!salesData || salesData.length === 0) && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No sales records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;