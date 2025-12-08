import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sales from '../models/Sales.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const lines = fileContent.split(/\r?\n/).filter(line => line.trim());
      
      if (lines.length === 0) {
        return resolve([]);
      }

      const headers = parseCSVLine(lines[0]);
      console.log(`   Columns found: ${headers.length}`);
      console.log(`   First 5 columns: ${headers.slice(0, 5).join(', ')}`);

      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        
        if (values.length !== headers.length) {
          console.warn(`   ⚠️  Row ${i + 1}: Expected ${headers.length} columns, got ${values.length}`);
          continue;
        }

        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        data.push(row);
      }

      console.log(`   Data rows parsed: ${data.length}`);
      console.log(`   Sample row keys: ${Object.keys(data[0]).slice(0, 5).join(', ')}`);
      
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};


const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; 
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());

  return result;
};


const cleanRowData = (row) => {
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const parseNumber = (numStr, defaultVal = 0) => {
    if (numStr === null || numStr === undefined || numStr === '') return defaultVal;
    const cleaned = String(numStr).replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? defaultVal : num;
  };

  const parseInteger = (numStr, defaultVal = 0) => {
    if (numStr === null || numStr === undefined || numStr === '') return defaultVal;
    const cleaned = String(numStr).replace(/[^0-9]/g, '');
    const num = parseInt(cleaned);
    return isNaN(num) ? defaultVal : num;
  };

  const parseTags = (tagStr) => {
    if (!tagStr) return [];
    const cleaned = String(tagStr).replace(/^"|"$/g, '');
    return cleaned
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  return {
    'Transaction ID': String(row['Transaction ID'] || '').trim(),
    'Date': parseDate(row['Date']),
    'Customer ID': String(row['Customer ID'] || '').trim(),
    'Customer Name': String(row['Customer Name'] || '').trim(),
    'Phone Number': String(row['Phone Number'] || '').trim(),
    'Gender': String(row['Gender'] || '').trim(),
    'Age': parseInteger(row['Age']),
    'Customer Region': String(row['Customer Region'] || '').trim(),
    'Customer Type': String(row['Customer Type'] || '').trim(),
    'Product ID': String(row['Product ID'] || '').trim(),
    'Product Name': String(row['Product Name'] || '').trim(),
    'Brand': String(row['Brand'] || '').trim(),
    'Product Category': String(row['Product Category'] || '').trim(),
    'Tags': parseTags(row['Tags']),
    'Quantity': parseInteger(row['Quantity']),
    'Price per Unit': parseNumber(row['Price per Unit']),
    'Discount Percentage': parseNumber(row['Discount Percentage']),
    'Total Amount': parseNumber(row['Total Amount']),
    'Final Amount': parseNumber(row['Final Amount']),
    'Payment Method': String(row['Payment Method'] || '').trim(),
    'Order Status': String(row['Order Status'] || '').trim(),
    'Delivery Type': String(row['Delivery Type'] || '').trim(),
    'Store ID': String(row['Store ID'] || '').trim(),
    'Store Location': String(row['Store Location'] || '').trim(),
    'Salesperson ID': String(row['Salesperson ID'] || '').trim(),
    'Employee Name': String(row['Employee Name'] || '').trim(),
  };
};


const seedDatabase = async () => {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 TruEstate Database Seeding Started');
    console.log('='.repeat(60) + '\n');

    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    console.log('🗑️  Dropping old collection (if exists)...');
    try {
      await mongoose.connection.db.dropCollection('sales');
      console.log('✅ Dropped old collection with all indexes\n');
    } catch (error) {
      if (error.code === 26) {
        console.log('ℹ️  Collection doesn\'t exist - creating fresh\n');
      } else {
        throw error;
      }
    }

    const csvPath = path.join(__dirname, '../../../sales_data.csv');
    
    console.log('📂 Looking for CSV file...');
    console.log(`   Expected path: ${csvPath}`);

    if (!fs.existsSync(csvPath)) {
      console.error('\n❌ CSV file not found!');
      console.error('\n💡 Please ensure the file is at:');
      console.error(`   ${csvPath}\n`);
      
      const altPath = path.join(__dirname, '../../../truestate_assignment_dataset.csv');
      if (fs.existsSync(altPath)) {
        console.log('✅ Found file at alternative location:');
        console.log(`   ${altPath}`);
        console.log('\n💡 Renaming to sales_data.csv...');
        fs.renameSync(altPath, csvPath);
        console.log('✅ File renamed successfully!\n');
      } else {
        process.exit(1);
      }
    }

    console.log('📖 Reading CSV file...');
    const rawData = await parseCSV(csvPath);
    console.log(`✅ Successfully read ${rawData.length} rows\n`);

    const RECORD_LIMIT = 430000;
    const limitedData = rawData.slice(0, RECORD_LIMIT);
    console.log(`ℹ️  Dataset Limitation for Free Tier:`);
    console.log(`   Total available: ${rawData.length.toLocaleString()} records`);
    console.log(`   Using: ${limitedData.length.toLocaleString()} records (${Math.round(limitedData.length/rawData.length*100)}%)`);
    console.log(`   Reason: MongoDB Atlas M0 free tier has 512 MB storage limit`);
    console.log(`   Estimated storage: ~${Math.round((limitedData.length / 1000000) * 531)} MB (including indexes)\n`);

    if (limitedData.length === 0) {
      console.error('❌ No data found in CSV file!');
      process.exit(1);
    }

    console.log('🔄 Transforming data...');
    const salesData = limitedData.map(cleanRowData);
    console.log(`✅ Transformed ${salesData.length} records\n`);

    if (salesData.length > 0) {
      console.log('📋 Sample record preview:');
      const sample = salesData[0];
      console.log(`   Transaction ID: ${sample['Transaction ID']}`);
      console.log(`   Customer: ${sample['Customer Name']}`);
      console.log(`   Product: ${sample['Product Name']}`);
      console.log(`   Quantity: ${sample['Quantity']}`);
      console.log(`   Amount: ₹${sample['Total Amount']}`);
      console.log(`   Date: ${sample['Date'].toISOString().split('T')[0]}\n`);
    }

    console.log('💾 Inserting data into MongoDB Atlas...');
    const batchSize = 1000; 
    let insertedCount = 0;

    for (let i = 0; i < salesData.length; i += batchSize) {
      const batch = salesData.slice(i, i + batchSize);
      try {
        const result = await Sales.insertMany(batch, { ordered: false });
        insertedCount += result.length;
        const progress = Math.round((insertedCount / salesData.length) * 100);
        // Only log every 10k records
        if (insertedCount % 10000 === 0 || insertedCount === salesData.length) {
          console.log(`   ✅ Progress: ${insertedCount.toLocaleString()}/${salesData.length.toLocaleString()} (${progress}%)`);
        }
      } catch (error) {
        if (error.writeErrors) {
          const inserted = batch.length - error.writeErrors.length;
          insertedCount += inserted;
          console.log(`   ⚠️  Batch had ${error.writeErrors.length} errors`);
        }
      }
    }

    console.log(`\n✅ Total inserted: ${insertedCount.toLocaleString()} records\n`);

    console.log('🔍 Creating database indexes...');
    await Sales.createIndexes();
    console.log('✅ Indexes created\n');

    const totalRecords = await Sales.countDocuments();
    const uniqueCustomers = await Sales.distinct('Customer ID');
    const dateRange = await Sales.aggregate([
      {
        $group: {
          _id: null,
          minDate: { $min: '$Date' },
          maxDate: { $max: '$Date' },
        },
      },
    ]);

    console.log('='.repeat(60));
    console.log('📊 DATABASE STATISTICS');
    console.log('='.repeat(60));
    console.log(`   Total Records:      ${totalRecords.toLocaleString()}`);
    console.log(`   Unique Customers:   ${uniqueCustomers.length.toLocaleString()}`);
    if (dateRange[0]) {
      console.log(`   Date Range:         ${dateRange[0].minDate.toISOString().split('T')[0]} to ${dateRange[0].maxDate.toISOString().split('T')[0]}`);
    }
    console.log('='.repeat(60));
    console.log('\n🎉 Database seeding completed successfully!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ SEEDING ERROR');
    console.error('='.repeat(60));
    console.error(`Error: ${error.message}`);
    console.error(`Stack: ${error.stack}\n`);
    
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();