
export const formatCurrency = (value) => {
  if (!value && value !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};


export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
};


export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.toString().replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};


export const truncateText = (text, maxLength = 30) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};


export const capitalizeWords = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  
  return searchParams.toString();
};


export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};


export const parseFiltersFromURL = (searchParams) => {
  const filters = {};
  
  for (const [key, value] of searchParams.entries()) {
    if (filters[key]) {
      if (!Array.isArray(filters[key])) {
        filters[key] = [filters[key]];
      }
      filters[key].push(value);
    } else {
      filters[key] = value;
    }
  }
  
  return filters;
};


export const isEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};
