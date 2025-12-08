import Sales from '../models/Sales.js';

const buildQuery = (filters) => {
  const query = {};

  if (filters.search) {
    query.$or = [
      { 'Customer Name': { $regex: filters.search, $options: 'i' } },
      { 'Phone Number': { $regex: filters.search, $options: 'i' } },
    ];
  }

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    query['Customer Region'] = { $in: filters.customerRegion };
  }

  if (filters.gender && filters.gender.length > 0) {
    query.Gender = { $in: filters.gender };
  }

  if (filters.minAge || filters.maxAge) {
    query.Age = {};
    if (filters.minAge) query.Age.$gte = parseInt(filters.minAge);
    if (filters.maxAge) query.Age.$lte = parseInt(filters.maxAge);
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    query['Product Category'] = { $in: filters.productCategory };
  }

  if (filters.tags && filters.tags.length > 0) {
    query.Tags = { $in: filters.tags };
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    query['Payment Method'] = { $in: filters.paymentMethod };
  }

  if (filters.startDate || filters.endDate) {
    query.Date = {};
    if (filters.startDate) query.Date.$gte = new Date(filters.startDate);
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      query.Date.$lte = endDate;
    }
  }

  return query;
};

const buildSort = (sortBy) => {
  const sortOptions = {
    'date-desc': { Date: -1 },
    'date-asc': { Date: 1 },
    'quantity-desc': { Quantity: -1 },
    'quantity-asc': { Quantity: 1 },
    'name-asc': { 'Customer Name': 1 },
    'name-desc': { 'Customer Name': -1 },
  };
  return sortOptions[sortBy] || { Date: -1 };
};

export const getSalesData = async (filters, sortBy, page, limit) => {
  try {
    const query = buildQuery(filters);
    const sort = buildSort(sortBy);
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [data, totalItems] = await Promise.all([
      Sales.find(query).sort(sort).skip(skip).limit(limitNum).lean().exec(),
      Sales.countDocuments(query),
    ]);

    const formattedData = data.map(item => ({
      ...item,
      Date: item.Date ? item.Date.toISOString().split('T')[0] : null,
    }));

    return {
      data: formattedData,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalItems / limitNum),
        totalItems,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < Math.ceil(totalItems / limitNum),
        hasPrevPage: pageNum > 1,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch sales data: ${error.message}`);
  }
};

export const getFilterOptions = async () => {
  try {
    const [customerRegions, genders, productCategories, tags, paymentMethods] = await Promise.all([
      Sales.distinct('Customer Region'),
      Sales.distinct('Gender'),
      Sales.distinct('Product Category'),
      Sales.distinct('Tags'),
      Sales.distinct('Payment Method'),
    ]);

    return {
      customerRegions: customerRegions.filter(Boolean).sort(),
      genders: genders.filter(Boolean).sort(),
      productCategories: productCategories.filter(Boolean).sort(),
      tags: tags.filter(Boolean).sort(),
      paymentMethods: paymentMethods.filter(Boolean).sort(),
    };
  } catch (error) {
    throw new Error(`Failed to fetch filter options: ${error.message}`);
  }
};

export const getStats = async () => {
  try {
    const totalRecords = await Sales.countDocuments();
    const dateRange = await Sales.aggregate([
      {
        $group: {
          _id: null,
          minDate: { $min: '$Date' },
          maxDate: { $max: '$Date' },
        },
      },
    ]);

    return {
      totalRecords,
      dateRange: dateRange[0] || { minDate: null, maxDate: null },
    };
  } catch (error) {
    throw new Error(`Failed to fetch stats: ${error.message}`);
  }
};