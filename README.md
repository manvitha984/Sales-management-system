
# Sales Management System

## 1. Overview
The Sales Management System is a full-stack web application for managing and analyzing retail sales records. It provides an interactive dashboard to search, filter, sort, and paginate sales data with responsive UI components. The system is built for performance and ease of use, supporting large datasets and configurable filters. Backend exposes REST endpoints consumed by the React frontend.

## 2. Tech Stack
- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB (Mongoose), dotenv, cors
- Utilities: Lucide React (icons), nodemon (dev), csv/json seed utilities

## 3. Search Implementation Summary
- Client: debounced search input to reduce API calls and improve UX.
- Search fields: customer name, phone number, customer ID, transaction ID (frontend sends query string).
- Server: accepts search query parameter and performs case-insensitive regex / indexed queries to match across relevant fields and return paged results.

## 4. Filter Implementation Summary
- Supported filters: customer region, gender, age range, product category, tags, payment method, and date range.
- Client: filter dropdowns (multi-select, range, and date inputs) send selected filters as query parameters or request body.
- Server: validates filter values and applies them in MongoDB queries; filter option lists (regions, genders, categories, tags, payment methods, min/max age, min/max date) are exposed via a `GET /api/sales/filters` endpoint for populating UI controls.

## 5. Sorting Implementation Summary
- Sortable fields: date, quantity, customer name, and total amount.
- UI: sort dropdown provides field + direction (asc/desc).
- Server: accepts `sort` and `order` (or equivalent) query parameters and applies them to the database query so sorting is handled server-side before pagination.

## 6. Pagination Implementation Summary
- Server returns paginated responses including `data`, `totalRecords`, `totalPages`, and `currentPage`.
- Client: page controls request specific pages and configurable page size (default 10 records per page).
- Combining with search/filters/sort: pagination parameters are included together with filters and sort parameters so results remain consistent.

## 7. Setup Instructions

### Backend
1. Open terminal and go to the backend folder:
   ```
   cd back-end
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure `.env`:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   NODE_ENV=development
   ```
4. (Optional) Seed the database:
   ```
   npm run seed
   ```
5. Start the backend server:
   ```
   npm run dev
   ```

### Frontend
1. Open terminal and go to the frontend folder:
   ```
   cd front-end
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.