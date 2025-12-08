import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // Correct
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);


export const fetchSalesData = async (params) => {
  try {
    const response = await apiClient.get('/sales', { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const fetchFilterOptions = async () => {
  try {
    const response = await apiClient.get('/sales/filter-options');
    return response;
  } catch (error) {
    throw error;
  }
};


export const exportSalesData = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sales/export`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;