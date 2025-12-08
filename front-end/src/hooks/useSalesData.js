import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export const useSalesData = (params) => {
  const [salesData, setSalesData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [
    params.search,
    params.filters,
    params.sortBy,
    params.sortOrder,
    params.page,
    params.limit,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();

      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 10);

      if (params.search && params.search.trim()) {
        queryParams.append('search', params.search.trim());
      }

      if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
      }
      if (params.sortOrder) {
        queryParams.append('sortOrder', params.sortOrder);
      }

      if (params.filters) {
        if (params.filters.region && params.filters.region.length > 0) {
          queryParams.append('region', params.filters.region.join(','));
        }

        if (params.filters.gender && params.filters.gender.length > 0) {
          queryParams.append('gender', params.filters.gender.join(','));
        }

        if (params.filters.ageRange) {
          if (params.filters.ageRange.min) {
            queryParams.append('ageMin', params.filters.ageRange.min);
          }
          if (params.filters.ageRange.max) {
            queryParams.append('ageMax', params.filters.ageRange.max);
          }
        }

        if (params.filters.category && params.filters.category.length > 0) {
          queryParams.append('category', params.filters.category.join(','));
        }

        if (params.filters.tags && params.filters.tags.length > 0) {
          queryParams.append('tags', params.filters.tags.join(','));
        }

        if (params.filters.paymentMethod && params.filters.paymentMethod.length > 0) {
          queryParams.append('paymentMethod', params.filters.paymentMethod.join(','));
        }

        if (params.filters.dateRange) {
          if (params.filters.dateRange.start) {
            queryParams.append('startDate', params.filters.dateRange.start);
          }
          if (params.filters.dateRange.end) {
            queryParams.append('endDate', params.filters.dateRange.end);
          }
        }
      }

      const url = `${API_BASE_URL}/sales?${queryParams.toString()}`;
      console.log('Fetching from:', url);

      const response = await axios.get(url);
      
      console.log('API Response:', response.data);

      if (response.data && response.data.success) {
        setSalesData(response.data.data || []);
        setPagination(response.data.pagination);
        setStatistics(response.data.statistics);
      } else {
        setSalesData([]);
        setError('No data received from server');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setSalesData([]);
      setError(err.response?.data?.message || err.message || 'Failed to load sales data');
    } finally {
      setLoading(false);
    }
  };

  return {
    salesData,
    statistics,
    pagination,
    loading,
    error,
    refetch: fetchData,
  };
};