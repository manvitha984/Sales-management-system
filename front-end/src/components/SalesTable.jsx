import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';

const SalesTable = ({ salesData, loading }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatCurrency = (amount) => {
    return `₹${amount?.toLocaleString('en-IN') || 0}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!salesData || salesData.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No sales data found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap sticky left-0 bg-blue-50 z-10">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Customer ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Phone Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Gender
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Age
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Product Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Total Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Customer Region
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Product ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Employee Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((sale, index) => (
              <tr 
                key={sale._id || index} 
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 sticky left-0 bg-white z-10">
                  {sale['Transaction ID'] || '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(sale.Date)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {sale['Customer ID'] || '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {sale['Customer Name'] || '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{sale['Phone Number'] || '-'}</span>
                    {sale['Phone Number'] && (
                      <button
                        onClick={() => copyToClipboard(sale['Phone Number'])}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy phone number"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    sale.Gender === 'Male' 
                      ? 'bg-blue-100 text-blue-800'
                      : sale.Gender === 'Female'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {sale.Gender || '-'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center font-medium">
                  {sale.Age || '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                    {sale['Product Category'] || '-'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  <span className="inline-flex items-center justify-center w-12 h-8 bg-green-100 text-green-800 font-bold rounded">
                    {sale.Quantity !== undefined && sale.Quantity !== null ? sale.Quantity : '-'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-600">
                  {formatCurrency(sale['Total Amount'])}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {sale['Customer Region'] || '-'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-mono">
                  {sale['Product ID'] || '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">
                  {sale['Employee Name'] || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-700">
          Showing <span className="font-semibold">{salesData.length}</span> records
        </p>
      </div>
    </div>
  );
};

export default SalesTable;