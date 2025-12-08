import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, '../../../sales_data.csv');

const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').slice(0, 3);

console.log('=== CSV HEADER ===');
console.log(lines[0]);
console.log('\n=== FIRST DATA ROW ===');
console.log(lines[1]);
console.log('\n=== PARSED COLUMNS ===');
const headers = lines[0].split(',');
headers.forEach((header, index) => {
  console.log(`${index + 1}. ${header.trim()}`);
});