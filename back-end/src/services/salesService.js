class SalesService {
  validateAgeRange(min, max) {
    const minAge = parseInt(min);
    const maxAge = parseInt(max);

    const isMinValid = !isNaN(minAge) && minAge >= 0 && minAge <= 150;
    const isMaxValid = !isNaN(maxAge) && maxAge >= 0 && maxAge <= 150;

    if (isMinValid && isMaxValid && minAge > maxAge) {
      return { valid: false, error: 'Minimum age cannot be greater than maximum age' };
    }

    return {
      valid: true,
      min: isMinValid ? minAge : undefined,
      max: isMaxValid ? maxAge : undefined,
    };
  }

  validateDateRange(start, end) {
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    const isStartValid = startDate && !isNaN(startDate.getTime());
    const isEndValid = endDate && !isNaN(endDate.getTime());

    if (isStartValid && isEndValid && startDate > endDate) {
      return { valid: false, error: 'Start date cannot be after end date' };
    }

    return {
      valid: true,
      start: isStartValid ? startDate : undefined,
      end: isEndValid ? endDate : undefined,
    };
  }

  async getSalesData(options = {}) {
    try {
      const {
        search = '',
        filters = {},
        sortBy = 'Date',
        sortOrder = 'desc',
        page = 1,
        limit = 10,
      } = options;

      const query = {};

      if (search && search.trim()) {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { 'Customer Name': searchRegex },
          { 'Phone Number': searchRegex },
          { 'Customer ID': searchRegex },
          { 'Transaction ID': searchRegex },
        ];
      }

      if (filters.region && Array.isArray(filters.region) && filters.region.length > 0) {
        const validRegions = filters.region.filter(r => r && r.trim());
        if (validRegions.length > 0) {
          query['Customer Region'] = { $in: validRegions };
        }
      }

      if (filters.gender && Array.isArray(filters.gender) && filters.gender.length > 0) {
        const validGenders = filters.gender.filter(g => g && g.trim());
        if (validGenders.length > 0) {
          query['Gender'] = { $in: validGenders };
        }
      }

      if (filters.ageRange) {
        const ageValidation = this.validateAgeRange(
          filters.ageRange.min,
          filters.ageRange.max
        );

        if (!ageValidation.valid) {
          throw new Error(ageValidation.error);
        }

        const ageQuery = {};
        if (ageValidation.min !== undefined) {
          ageQuery.$gte = ageValidation.min;
        }
        if (ageValidation.max !== undefined) {
          ageQuery.$lte = ageValidation.max;
        }

        if (Object.keys(ageQuery).length > 0) {
          query['Age'] = ageQuery;
        }
      }

      if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
        const validCategories = filters.category.filter(c => c && c.trim());
        if (validCategories.length > 0) {
          query['Product Category'] = { $in: validCategories };
        }
      }

      if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
        const validTags = filters.tags.filter(t => t && t.trim()).slice(0, 50);
        if (validTags.length > 0) {
          query['Tags'] = { $in: validTags };
        }
      }

      if (filters.paymentMethod && Array.isArray(filters.paymentMethod) && filters.paymentMethod.length > 0) {
        const validMethods = filters.paymentMethod.filter(p => p && p.trim());
        if (validMethods.length > 0) {
          query['Payment Method'] = { $in: validMethods };
        }
      }

      if (filters.dateRange) {
        const dateValidation = this.validateDateRange(
          filters.dateRange.start,
          filters.dateRange.end
        );

        if (!dateValidation.valid) {
          throw new Error(dateValidation.error);
        }

        const dateQuery = {};
        if (dateValidation.start) {
          dateQuery.$gte = dateValidation.start;
        }
        if (dateValidation.end) {
          const endDate = new Date(dateValidation.end);
          endDate.setHours(23, 59, 59, 999);
          dateQuery.$lte = endDate;
        }

        if (Object.keys(dateQuery).length > 0) {
          query['Date'] = dateQuery;
        }
      }

      const validPage = Math.max(1, parseInt(page) || 1);
      const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 10)); // Max 100 per page

      const sortConfig = {};
      const allowedSortFields = ['Date', 'Quantity', 'Total Amount', 'Customer Name', 'Age'];
      const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'Date';
      sortConfig[validSortBy] = sortOrder === 'asc' ? 1 : -1;

      const skip = (validPage - 1) * validLimit;

      const [data, totalCount] = await Promise.all([
        Sales.find(query)
          .sort(sortConfig)
          .skip(skip)
          .limit(validLimit)
          .lean(),
        Sales.countDocuments(query),
      ]);

      return {
        success: true,
        data: data || [],
        pagination: {
          currentPage: validPage,
          totalPages: Math.ceil(totalCount / validLimit) || 0,
          totalRecords: totalCount || 0,
          limit: validLimit,
        },
      };
    } catch (error) {
      console.error('Error in getSalesData:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch sales data',
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalRecords: 0,
          limit: 10,
        },
      };
    }
  }

  async getStatistics(query = {}) {
    try {
      const stats = await Sales.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $ifNull: ['$Total Amount', 0] } },
            totalQuantity: { $sum: { $ifNull: ['$Quantity', 0] } },
            totalDiscount: { $sum: { $ifNull: ['$Discount', 0] } },
            totalRecords: { $sum: 1 },
          },
        },
      ]);

      return stats.length > 0
        ? {
            totalAmount: stats[0].totalAmount || 0,
            totalQuantity: stats[0].totalQuantity || 0,
            totalDiscount: stats[0].totalDiscount || 0,
            totalRecords: stats[0].totalRecords || 0,
          }
        : {
            totalAmount: 0,
            totalQuantity: 0,
            totalDiscount: 0,
            totalRecords: 0,
          };
    } catch (error) {
      console.error('Error in getStatistics:', error);
      return {
        totalAmount: 0,
        totalQuantity: 0,
        totalDiscount: 0,
        totalRecords: 0,
      };
    }
  }

  async getFilterOptions() {
    try {
      const [regions, genders, categories, tags, paymentMethods, ageRange, dateRange] =
        await Promise.all([
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

      return {
        success: true,
        data: {
          regions: (regions || []).filter(Boolean).sort(), 
          genders: (genders || []).filter(Boolean).sort(),
          categories: (categories || []).filter(Boolean).sort(),
          tags: (tags || []).filter(Boolean).slice(0, 100).sort(), 
          paymentMethods: (paymentMethods || []).filter(Boolean).sort(),
          ageRange: ageRange[0] || { min: 18, max: 100 }, 
          dateRange: dateRange[0] || { min: null, max: null },
        },
      };
    } catch (error) {
      console.error('Error in getFilterOptions:', error);
      return {
        success: false,
        data: {
          regions: [],
          genders: [],
          categories: [],
          tags: [],
          paymentMethods: [],
          ageRange: { min: 18, max: 100 },
          dateRange: { min: null, max: null },
        },
      };
    }
  }
}

module.exports = new SalesService();