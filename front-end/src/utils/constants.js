export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const REGIONS = ['North', 'South', 'East', 'West', 'Central'];
export const GENDERS = ['Male', 'Female', 'Other'];
export const PAYMENT_METHODS = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];

export const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Date (Newest First)' },
  { value: 'date_asc', label: 'Date (Oldest First)' },
  { value: 'quantity_desc', label: 'Quantity (High to Low)' },
  { value: 'quantity_asc', label: 'Quantity (Low to High)' },
  { value: 'customer_name_asc', label: 'Customer Name (A-Z)' },
  { value: 'customer_name_desc', label: 'Customer Name (Z-A)' },
];

export const ITEMS_PER_PAGE = 10;

export const DEFAULT_CATEGORIES = [
  'Clothing',
  'Electronics',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Beauty',
  'Toys'
];

export const DEFAULT_TAGS = [
  'Premium',
  'Sale',
  'New Arrival',
  'Bestseller',
  'Limited Edition'
];
