import Sales from '../models/Sales.js';

export const getSales = async (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      paymentMethod,
      dateStart,
      dateEnd,
      sortBy = 'Date',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (search && search.trim()) {
      const searchTerm = search.trim();
      const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      query.$or = [
        { 'Customer Name': { $regex: `^${escapedSearch}`, $options: 'i' } },
        { 'Customer Name': { $regex: `\\b${escapedSearch}`, $options: 'i' } },
        { 'Phone Number': { $regex: escapedSearch } },
      ];
    }

    if (region) {
      const regions = region.split(',').map(r => r.trim());
      query['Customer Region'] = { $in: regions };
    }

    if (gender) {
      const genders = gender.split(',').map(g => g.trim());
      query['Gender'] = { $in: genders };
    }

    if (ageMin || ageMax) {
      query['Age'] = {};
      if (ageMin) query['Age'].$gte = parseInt(ageMin);
      if (ageMax) query['Age'].$lte = parseInt(ageMax);
    }

    if (category) {
      const categories = category.split(',').map(c => c.trim());
      query['Product Category'] = { $in: categories };
    }

    if (tags) {
      const tagList = tags.split(',').map(t => t.trim());
      query['Tags'] = { $in: tagList };
    }

    if (paymentMethod) {
      const methods = paymentMethod.split(',').map(m => m.trim());
      query['Payment Method'] = { $in: methods };
    }

    if (dateStart || dateEnd) {
      query['Date'] = {};
      if (dateStart) query['Date'].$gte = new Date(dateStart);
      if (dateEnd) {
        const endDate = new Date(dateEnd);
        endDate.setHours(23, 59, 59, 999);
        query['Date'].$lte = endDate;
      }
    }

    const sortMapping = {
      'Date': 'Date',
      'Quantity': 'Quantity',
      'Customer Name': 'Customer Name',
      'Total Amount': 'Total Amount',
    };

    const sortField = sortMapping[sortBy] || 'Date';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortDirection };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [salesData, totalCount] = await Promise.all([
      Sales.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Sales.countDocuments(query),
    ]);

    const statistics = await Sales.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$Quantity' },
          totalAmount: { $sum: '$Total Amount' },
          totalDiscount: { $sum: { $multiply: ['$Total Amount', { $divide: ['$Discount Percentage', 100] }] } },
          totalRecords: { $sum: 1 },
        },
      },
    ]);

    const stats = statistics[0] || {
      totalQuantity: 0,
      totalAmount: 0,
      totalDiscount: 0,
      totalRecords: 0,
    };

    res.json({
      success: true,
      data: salesData,
      statistics: stats,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalRecords: totalCount,
        recordsPerPage: limitNum,
      },
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales data',
      error: error.message,
    });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const [regions, genders, categories, tags, paymentMethods, ageRange, dateRange] = await Promise.all([
      Sales.distinct('Customer Region'),
      Sales.distinct('Gender'),
      Sales.distinct('Product Category'),
      Sales.distinct('Tags'),
      Sales.distinct('Payment Method'),
      Sales.aggregate([
        {
          $group: {
            _id: null,
            min: { $min: '$Age' },
            max: { $max: '$Age' },
          },
        },
      ]),
      Sales.aggregate([
        {
          $group: {
            _id: null,
            min: { $min: '$Date' },
            max: { $max: '$Date' },
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        regions: regions.sort(),
        genders: genders.sort(),
        categories: categories.sort(),
        tags: tags.flat().filter((tag, index, self) => self.indexOf(tag) === index).sort(),
        paymentMethods: paymentMethods.sort(),
        ageRange: {
          min: ageRange[0]?.min || 0,
          max: ageRange[0]?.max || 100,
        },
        dateRange: {
          min: dateRange[0]?.min || null,
          max: dateRange[0]?.max || null,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options',
      error: error.message,
    });
  }
};