import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  'Transaction ID': { type: String, required: true, trim: true },
  'Customer ID': { type: String, required: true, index: true, trim: true },
  'Customer Name': { type: String, required: true, index: true, trim: true },
  'Phone Number': { type: String, required: true, index: true, trim: true },
  'Gender': { type: String, enum: ['Male', 'Female', 'Other', ''], index: true },
  'Age': { type: Number, min: 0, max: 150 },
  'Customer Region': { type: String, index: true, trim: true },
  'Customer Type': { type: String, trim: true },
  'Product ID': { type: String, required: true, trim: true },
  'Product Name': { type: String, required: true, trim: true },
  'Brand': { type: String, trim: true },
  'Product Category': { type: String, index: true, trim: true },
  'Tags': [{ type: String, trim: true }],
  'Quantity': { type: Number, required: true, min: 0 },
  'Price per Unit': { type: Number, required: true, min: 0 },
  'Discount Percentage': { type: Number, default: 0, min: 0, max: 100 },
  'Total Amount': { type: Number, required: true, min: 0 },
  'Final Amount': { type: Number, required: true, min: 0 },
  'Date': { type: Date, required: true, index: true },
  'Payment Method': { type: String, index: true, trim: true },
  'Order Status': { type: String, trim: true },
  'Delivery Type': { type: String, trim: true },
  'Store ID': { type: String, trim: true },
  'Store Location': { type: String, trim: true },
  'Salesperson ID': { type: String, trim: true },
  'Employee Name': { type: String, trim: true },
}, {
  timestamps: true,
  collection: 'sales'
});

salesSchema.index({ 'Customer Name': 'text', 'Phone Number': 'text' });
salesSchema.index({ 'Customer Region': 1, 'Date': -1 });
salesSchema.index({ 'Product Category': 1, 'Date': -1 });

const Sales = mongoose.model('Sales', salesSchema);
export default Sales;