import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const SalesTable = ({ salesData }) => {
  const [copiedPhone, setCopiedPhone] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatCurrency = (amount) => {
    return `₹ ${amount?.toLocaleString('en-IN') || 0}`;
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    const phoneStr = phone.toString().trim();
    
    if (phoneStr.startsWith('+91')) {
      const number = phoneStr.substring(3).trim();
      return `+91 ${number}`;
    }
    
    if (phoneStr.startsWith('91') && phoneStr.length === 12) {
      const number = phoneStr.substring(2);
      return `+91 ${number}`;
    }
    
    return `+91 ${phoneStr}`;
  };

  const formatCustomerID = (id) => {
    if (!id) return '';
    if (id.toString().startsWith('CUST')) {
      return id;
    }
    return `CUST${id}`;
  };

  const formatQuantity = (quantity) => {
    if (!quantity) return '00';
    const num = parseInt(quantity);
    return String(num).padStart(2, '0');
  };

  const formatProductID = (id) => {
    if (!id) return '';
    if (id.toString().startsWith('PROD')) {
      return id;
    }
    const num = id.toString().replace(/\D/g, ''); 
    return `PROD${num.padStart(4, '0')}`;
  };

  const handleCopyPhone = async (phone, index) => {
    try {
      const formattedPhone = formatPhoneNumber(phone);
      await navigator.clipboard.writeText(formattedPhone);
      setCopiedPhone(index);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer region
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salesData.map((sale, index) => (
            <tr key={sale._id || index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {sale['Transaction ID']}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {formatDate(sale['Date'])}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatCustomerID(sale['Customer ID'])}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {sale['Customer Name']}
              </td>
              
              {/* Phone Number - With +91 and Copy Icon */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>{formatPhoneNumber(sale['Phone Number'])}</span>
                  <button
                    onClick={() => handleCopyPhone(sale['Phone Number'], index)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy phone number"
                  >
                    {copiedPhone === index ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {sale['Gender']}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {sale['Age']}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {sale['Product Category']}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatQuantity(sale['Quantity'])}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatCurrency(sale['Total Amount'])}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {sale['Customer Region']}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatProductID(sale['Product ID'])}
              </td>
              
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {sale['Employee Name']}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;