# TruEstate - Retail Sales Management System
## Complete Architecture Documentation

## 📁 Project Structure

Sales management system/
├── front-end/                    # React Frontend Application
│   ├── node_modules/             # Frontend dependencies
│   ├── public/                   # Static Assets
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/           # Reusable UI Components
│   │   │   ├── ErrorMessage.jsx       # Error display component
│   │   │   ├── FilterDropdowns.jsx    # Filter dropdown components
│   │   │   ├── FilterPanel.jsx        # Sales data filtering UI
│   │   │   ├── LoadingSpinner.jsx     # Loading state indicator
│   │   │   ├── Pagination.jsx         # Page navigation component
│   │   │   ├── SalesTable.jsx         # Main data table display
│   │   │   ├── SearchBar.jsx          # Search input component
│   │   │   ├── Sidebar.jsx            # Sidebar navigation
│   │   │   └── SortDropdown.jsx       # Sort options selector
│   │   ├── hooks/                # Custom React Hooks
│   │   │   ├── useDebounce.js         # Debouncing utility hook
│   │   │   └── useSalesData.js        # Central data management hook
│   │   ├── routes/               # Route Components (Pages)
│   │   │   ├── Dashboard.jsx          # Main dashboard page
│   │   │   └── index.jsx              # Routes configuration
│   │   ├── services/             # API Services
│   │   │   └── api.js                 # Axios client & API endpoints
│   │   ├── styles/               # CSS Styles
│   │   │   └── index.css              # Global styles
│   │   ├── utils/                # Utility Functions
│   │   │   ├── constants.js           # Application constants
│   │   │   └── helpers.js             # Helper functions
│   │   ├── App.jsx               # Root component with routing
│   │   └── main.jsx              # Application entry point
│   ├── .env                      # Environment variables
│   ├── .eslintrc.cjs             # ESLint configuration
│   ├── .gitignore
│   ├── FILE_REFERENCE.md         # File reference documentation
│   ├── IMPLEMENTATION_GUIDE.md   # Implementation guide
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── package-lock.json         # Dependency lock file
│   ├── postcss.config.js         # PostCSS configuration
│   ├── QUICKSTART.md             # Quick start guide
│   ├── README.md                 # Frontend README
│   ├── SUMMARY.md                # Project summary
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── vercel.json               # Vercel deployment config
│   └── vite.config.js            # Vite build configuration
│
├── back-end/                     # Node.js Backend API
│   ├── config/                   # Configuration files
│   │   └── database.js                # MongoDB connection configuration
│   ├── controllers/              # Route Controllers
│   │   └── salesController.js         # Sales business logic
│   ├── models/                   # Database Models
│   │   └── Sales.js                   # Mongoose Sales schema
│   ├── node_modules/             # Backend dependencies
│   ├── routes/                   # API Routes
│   │   └── salesRoutes.js             # Sales API endpoints
│   ├── services/                 # Business Services
│   │   └── salesService.js            # Sales data service layer
│   ├── src/                      # Source directory
│   ├── utils/                    # Utility Functions
│   │   ├── seedDatabase.js            # Database seeding script
│   │   └── testCSV.js                 # CSV testing utility
│   ├── .env                      # Backend environment variables
│   ├── .gitignore
│   ├── index.js                  # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── package-lock.json         # Dependency lock file
│   └── README.md                 # Backend README
│
└── docs/                         # Project Documentation
    └── ARCHITECTURE.md           # This file (Complete architecture)
```

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            React Application (Vite)                     │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │   │
│  │  │  Dashboard   │  │  Components  │  │   Hooks     │ │   │
│  │  │    Page      │  │  (UI Layer)  │  │  (Logic)    │ │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │   │
│  │         │                  │                  │         │   │
│  │         └──────────────────┼──────────────────┘         │   │
│  │                            │                            │   │
│  │                    ┌───────▼───────┐                   │   │
│  │                    │  API Service  │                   │   │
│  │                    │   (Axios)     │                   │   │
│  │                    └───────┬───────┘                   │   │
│  └────────────────────────────┼───────────────────────────┘   │
└────────────────────────────────┼───────────────────────────────┘
                                 │
                                 │ HTTPS/REST API
                                 │
┌────────────────────────────────▼───────────────────────────────┐
│                    BACKEND SERVER (Node.js)                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Express.js Application                     │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │   │
│  │  │   Routes     │  │  Middleware  │  │   Models    │ │   │
│  │  │  (API Endpoints)│ │   (CORS,    │  │ (Mongoose)  │ │   │
│  │  │              │  │   Parsing)   │  │             │ │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │   │
│  │         │                  │                  │         │   │
│  │         └──────────────────┼──────────────────┘         │   │
│  │                            │                            │   │
│  │                    ┌───────▼───────┐                   │   │
│  │                    │   Database    │                   │   │
│  │                    │  Connection   │                   │   │
│  │                    └───────┬───────┘                   │   │
│  └────────────────────────────┼───────────────────────────┘   │
└────────────────────────────────┼───────────────────────────────┘
                                 │
                                 │ MongoDB Protocol
                                 │
┌────────────────────────────────▼───────────────────────────────┐
│                      MongoDB Database                           │
│                                                                  │
│  Collections:                                                   │
│  └── sales (retail_sales collection)                           │
│      ├── Indexes on: transactionId, date, customerName        │
│      └── Document structure defined by Sales model            │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx (BrowserRouter)
└── Dashboard.jsx (Main Container)
    ├── Header Section
    │   ├── Logo/Title: "TruEstate - Retail Sales Management System"
    │   └── User Info: "Anurag Yadav"
    │
    ├── Summary Cards Row (Flex Layout)
    │   ├── Total Units Card
    │   │   └── Sum of all quantities
    │   ├── Total Amount Card
    │   │   └── Sum of all final amounts
    │   └── Total Transactions Card
    │       └── Count of all transactions
    │
    └── Main Content Grid (Grid Layout)
        ├── Left Sidebar (25% width)
        │   └── FilterPanel
        │       ├── Customer Region Filter (Checkboxes)
        │       ├── Gender Filter (Checkboxes)
        │       ├── Age Range Filter (Number inputs)
        │       ├── Product Category Filter (Checkboxes)
        │       ├── Tags Filter (Checkboxes)
        │       ├── Payment Method Filter (Checkboxes)
        │       └── Date Range Filter (Date inputs)
        │
        └── Right Content Area (75% width)
            ├── Controls Bar (Flex)
            │   ├── SearchBar (Customer name/phone search)
            │   └── SortDropdown (Sort options)
            │
            ├── Conditional Rendering:
            │   ├── ErrorMessage (if error)
            │   ├── LoadingSpinner (if loading)
            │   └── SalesTable (if data loaded)
            │       └── Table with sales transaction rows
            │
            └── Pagination
                └── Page navigation controls
```

### State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│              useSalesData Hook (State Manager)               │
│                                                              │
│  Managed States:                                            │
│  ├── salesData: Array<SalesTransaction>                    │
│  ├── filterOptions: Object (available filter values)       │
│  ├── loading: boolean                                       │
│  ├── error: string | null                                   │
│  ├── pagination: {                                          │
│  │    currentPage: number                                   │
│  │    totalPages: number                                    │
│  │    totalItems: number                                    │
│  │    itemsPerPage: number                                  │
│  │    hasNextPage: boolean                                  │
│  │    hasPreviousPage: boolean                             │
│  │   }                                                       │
│  └── queryParams: {                                         │
│       search: string                                         │
│       sortBy: string                                         │
│       page: number                                           │
│       limit: number (10)                                     │
│       regions: Array<string>                                │
│       genders: Array<string>                                │
│       categories: Array<string>                             │
│       tags: Array<string>                                    │
│       paymentMethods: Array<string>                         │
│       ageRange: { min: number, max: number }               │
│       dateRange: { start: string, end: string }            │
│      }                                                       │
│                                                              │
│  Exposed Functions:                                          │
│  ├── loadSalesData() - Fetches data from API               │
│  ├── updateSearch(term) - Updates search parameter         │
│  ├── updateSort(option) - Updates sort parameter           │
│  ├── updateFilters(type, value) - Updates filter params    │
│  ├── changePage(pageNum) - Changes current page            │
│  └── retry() - Retries failed API request                  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Sequence

```
┌──────────────┐
│ User Action  │
│ (Input/Click)│
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│         Component Event Handler              │
│  (onChange, onClick, onSubmit)              │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│     Dashboard Callback Function             │
│  (Receives data from child component)       │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│    useSalesData Update Function             │
│  (updateSearch, updateFilters, etc.)        │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│       queryParams State Update              │
│  (React useState triggers re-render)        │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│      useEffect Detects Change               │
│  (Watches queryParams dependency)           │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│         loadSalesData() Called              │
│  (Async function execution starts)          │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│       API Service Call (Axios)              │
│  GET /api/sales?params                      │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│        Backend Route Handler                │
│  Express.js processes request               │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│       MongoDB Query Execution               │
│  Mongoose model queries database            │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│       Response Sent to Frontend             │
│  JSON: { data, pagination }                 │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│      State Updated in Hook                  │
│  salesData, pagination, loading = false     │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│         React Re-renders UI                 │
│  Components display updated data            │
└─────────────────────────────────────────────┘
```

### Search with Debouncing

```
User types: "J" → "o" → "h" → "n"
     │         │       │       │
     ▼         ▼       ▼       ▼
┌─────────────────────────────────────┐
│   SearchBar onChange fires          │
│   updateSearch('J')                 │
│   updateSearch('Jo')                │
│   updateSearch('Joh')               │
│   updateSearch('John')              │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│   useDebounce Hook                  │
│   - Stores 'John' in state          │
│   - Sets 500ms timer                │
│   - Each new input resets timer     │
└──────────┬──────────────────────────┘
           │
           │ (500ms passes)
           ▼
┌─────────────────────────────────────┐
│   Debounced value returns 'John'    │
│   Triggers useEffect in useSalesData│
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│   queryParams.search = 'John'       │
│   loadSalesData() called            │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│   API: GET /api/sales?search=John   │
│   Results displayed in SalesTable   │
└─────────────────────────────────────┘
```

### Filter Processing Logic

```
User clicks "North" checkbox in FilterPanel
           │
           ▼
┌─────────────────────────────────────────────┐
│   FilterPanel handleCheckboxChange          │
│   - type: 'regions'                         │
│   - value: 'North'                          │
│   - currentFilters: { regions: ['South'] }  │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│   Logic: Check if 'North' in array          │
│   - Not present → Add to array              │
│   - Present → Remove from array (toggle)    │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│   New filters: { regions: ['South','North']}│
│   onFilterChange callback fired             │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│   Dashboard receives callback               │
│   updateFilters('regions', ['South','North'])│
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│   useSalesData updates queryParams          │
│   - queryParams.regions = ['South','North'] │
│   - queryParams.page = 1 (reset to page 1)  │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│   useEffect triggers loadSalesData()        │
│   API: GET /api/sales?regions=South,North   │
└─────────────────────────────────────────────┘
```

## 🔧 Backend Architecture

### Express Server Structure

```
server.js (Entry Point)
├── Load environment variables (.env)
├── Connect to MongoDB (db.js)
├── Initialize Express app
├── Configure Middleware
│   ├── CORS (cross-origin requests)
│   ├── express.json() (parse JSON bodies)
│   └── express.urlencoded() (parse URL-encoded bodies)
├── Mount Routes
│   └── /api/sales → salesRoutes
├── Global Error Handler
└── Start Server (PORT from env or 5000)
```

### Sales API Endpoints

```
Base URL: /api/sales

┌─────────────────────────────────────────────────────────┐
│  GET /api/sales                                          │
│  Description: Fetch paginated and filtered sales data   │
│                                                          │
│  Query Parameters:                                       │
│  ├── search: string (customer name or phone)           │
│  ├── sortBy: string (date_desc, quantity_asc, etc.)    │
│  ├── page: number (default: 1)                         │
│  ├── limit: number (default: 10)                       │
│  ├── regions: string (comma-separated)                 │
│  ├── genders: string (comma-separated)                 │
│  ├── categories: string (comma-separated)              │
│  ├── tags: string (comma-separated)                    │
│  ├── paymentMethods: string (comma-separated)          │
│  ├── ageMin: number                                     │
│  ├── ageMax: number                                     │
│  ├── dateStart: string (YYYY-MM-DD)                    │
│  └── dateEnd: string (YYYY-MM-DD)                      │
│                                                          │
│  Response: {                                            │
│    success: boolean,                                    │
│    data: Array<SalesTransaction>,                      │
│    pagination: {                                        │
│      currentPage: number,                              │
│      totalPages: number,                               │
│      totalItems: number,                               │
│      itemsPerPage: number,                             │
│      hasNextPage: boolean,                             │
│      hasPreviousPage: boolean                          │
│    }                                                    │
│  }                                                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  GET /api/sales/filters                                 │
│  Description: Get available filter options              │
│                                                          │
│  Response: {                                            │
│    success: boolean,                                    │
│    data: {                                              │
│      regions: Array<string>,                           │
│      genders: Array<string>,                           │
│      categories: Array<string>,                        │
│      tags: Array<string>,                              │
│      paymentMethods: Array<string>                     │
│    }                                                    │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
```

### MongoDB Query Building Process

```
┌─────────────────────────────────────────────────────────┐
│        Request Received: GET /api/sales?...             │
└──────────┬──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│     Extract Query Parameters                            │
│  const { search, sortBy, page, regions, ... } = req.query│
└──────────┬──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│     Build MongoDB Filter Object                         │
│  let filter = {};                                       │
│                                                          │
│  if (search) {                                          │
│    filter.$or = [                                       │
│      { customerName: { $regex: search, $options: 'i' }}│
│      { phoneNumber: { $regex: search, $options: 'i' }} │
│    ]                                                    │
│  }                                                       │
│                                                          │
│  if (regions) {                                         │
│    filter.customerRegion = { $in: regions.split(',') } │
│  }                                                       │
│                                                          │
│  if (ageMin || ageMax) {                               │
│    filter.age = {};                                     │
│    if (ageMin) filter.age.$gte = ageMin;              │
│    if (ageMax) filter.age.$lte = ageMax;              │
│  }                                                       │
│  ... (similar for other filters)                       │
└──────────┬──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│     Determine Sort Order                                │
│  let sort = {};                                         │
│  switch(sortBy) {                                       │
│    case 'date_desc': sort = { date: -1 }; break;      │
│    case 'date_asc': sort = { date: 1 }; break;        │
│    case 'quantity_desc': sort = { quantity: -1 }; break│
│    ... (other sort options)                            │
│  }                                                       │
└──────────┬──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│     Calculate Pagination                                │
│  const skip = (page - 1) * limit;                      │
│  const total = await Sales.countDocuments(filter);     │
│  const totalPages = Math.ceil(total / limit);         │
└──────────┬──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│     Execute Database Query                              │
│  const sales = await Sales.find(filter)                │
│    .sort(sort)                                          │
│    .skip(skip)                                          │
│    .limit(limit)                                        │
│    .lean();  // Returns plain JS objects               │
└──────────┬──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│     Format Response                                     │
│  res.json({                                             │
│    success: true,                                       │
│    data: sales,                                         │
│    pagination: { ... }                                  │
│  });                                                    │
└─────────────────────────────────────────────────────────┘
```

### Database Schema (Sales Model)

```javascript
SalesTransaction Document Structure:
{
  transactionId: String (required, unique),
  date: Date (required, indexed),
  
  // Customer Information
  customerName: String (required, indexed),
  customerId: String (required),
  phoneNumber: String (required),
  gender: String (enum: ['Male', 'Female', 'Other']),
  age: Number,
  customerRegion: String,
  customerType: String (enum: ['Regular', 'VIP', 'New']),
  
  // Product Information
  productId: String (required),
  productName: String (required),
  brand: String,
  productCategory: String,
  tags: [String],
  
  // Transaction Details
  quantity: Number (required, min: 1),
  pricePerUnit: Number (required, min: 0),
  discountPercentage: Number (default: 0, min: 0, max: 100),
  totalAmount: Number (required),
  finalAmount: Number (required),
  
  // Payment & Delivery
  paymentMethod: String (enum: ['Cash', 'Card', 'UPI', 'Net Banking']),
  orderStatus: String (enum: ['Completed', 'Pending', 'Cancelled']),
  deliveryType: String,
  
  // Store & Employee
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String,
  
  // Metadata
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}

Indexes:
- transactionId (unique)
- date (for date-based queries)
- customerName (for search queries)
- productCategory (for filtering)
```

## 🔌 API Communication Layer

### Axios Configuration (api.js)

```javascript
Base Configuration:
- Base URL: process.env.VITE_API_URL or 'http://localhost:5000/api'
- Timeout: 10000ms (10 seconds)
- Headers: { 'Content-Type': 'application/json' }

Request Interceptor:
- Logs outgoing requests (in development)
- Can add auth tokens (future feature)

Response Interceptor:
- Handles successful responses
- Catches and formats errors:
  ├── Network errors
  ├── Timeout errors
  ├── HTTP error codes (4xx, 5xx)
  └── Returns user-friendly error messages

Exported Functions:
- fetchSalesData(params): GET /api/sales
- fetchFilterOptions(): GET /api/sales/filters
```

### Request/Response Cycle

```
Frontend Component
    │
    └─► useSalesData hook
         │
         └─► loadSalesData()
              │
              └─► api.fetchSalesData(queryParams)
                   │
                   ├─► Build query string from params
                   ├─► Add request interceptor logic
                   └─► Axios GET request
                        │
                        ▼
                   Internet / Network
                        │
                        ▼
                   Backend Server
                        │
                        └─► Express receives request
                             │
                             └─► salesRoutes handler
                                  │
                                  ├─► Parse query params
                                  ├─► Build MongoDB query
                                  ├─► Execute database query
                                  └─► Format response
                                       │
                                       ▼
                                  Internet / Network
                                       │
                                       ▼
                   Axios receives response
                        │
                        ├─► Response interceptor processes
                        └─► Returns data to frontend
                             │
                             ▼
                   useSalesData hook
                        │
                        ├─► Updates salesData state
                        ├─► Updates pagination state
                        └─► Sets loading = false
                             │
                             ▼
                   React re-renders components
                        │
                        └─► SalesTable displays new data
```

## 🎯 Key Features & Implementation

### 1. Real-time Search

```
Implementation:
├── SearchBar component captures input
├── useDebounce hook delays API call (500ms)
├── Prevents excessive API requests
├── Backend uses MongoDB $regex for case-insensitive search
└── Searches in: customerName, phoneNumber fields
```

### 2. Advanced Filtering

```
Supported Filters:
├── Customer Region (Multi-select checkboxes)
├── Gender (Multi-select checkboxes)
├── Age Range (Min/Max number inputs)
├── Product Category (Multi-select checkboxes)
├── Tags (Multi-select checkboxes)
├── Payment Method (Multi-select checkboxes)
└── Date Range (Start/End date pickers)

Implementation:
- FilterPanel manages local filter state
- onChange callbacks update parent (Dashboard)
- Dashboard calls updateFilters() from useSalesData
- Backend builds MongoDB $in, $gte, $lte queries
```

### 3. Flexible Sorting

```
Sort Options:
├── Date (Newest First / Oldest First)
├── Quantity (High to Low / Low to High)
├── Amount (High to Low / Low to High)
└── Customer Name (A-Z / Z-A)

Implementation:
- SortDropdown shows available options
- Selection updates queryParams.sortBy
- Backend applies MongoDB .sort() with appropriate field/direction
```

### 4. Pagination

```
Implementation:
├── Backend calculates:
│   ├── Total items matching query
│   ├── Total pages (items / limit)
│   ├── Current page
│   └── hasNextPage, hasPreviousPage flags
├── Frontend Pagination component:
│   ├── Displays page numbers
│   ├── Previous/Next buttons
│   └── Calls changePage() on click
└── queryParams.page updates trigger new API call
```

### 5. Summary Statistics

```
Dashboard displays:
├── Total Units: Sum of all quantities
├── Total Amount: Sum of all finalAmount values
└── Total Transactions: Count of all records

Calculation:
- Computed from current salesData array
- Updates automatically when data changes
- Uses JavaScript reduce() for summation
```

## 🛠️ Technology Stack

### Frontend Technologies

```
┌─────────────────────────────────────────────────────────┐
│ React 18.2.0                                            │
│ └─ Purpose: UI library for building components         │
│    Features: Hooks, JSX, Virtual DOM                   │
│                                                          │
│ Vite 5.0.8                                              │
│ └─ Purpose: Fast build tool & dev server               │
│    Features: HMR, optimized builds, ES modules         │
│                                                          │
│ Tailwind CSS 3.4.1                                      │
│ └─ Purpose: Utility-first CSS framework                │
│    Features: Responsive design, JIT compilation        │
│                                                          │
│ React Router DOM 6.21.3                                 │
│ └─ Purpose: Client-side routing                        │
│    Features: BrowserRouter, Route, Link                │
│                                                          │
│ Axios 1.6.5                                             │
│ └─ Purpose: HTTP client for API calls                  │
│    Features: Interceptors, promise-based, auto JSON    │
└─────────────────────────────────────────────────────────┘
```

### Backend Technologies

```
┌─────────────────────────────────────────────────────────┐
│ Node.js (v14+ required)                                 │
│ └─ Purpose: JavaScript runtime for server              │
│                                                          │
│ Express 4.18.2                                          │
│ └─ Purpose: Web application framework                  │
│    Features: Routing, middleware, HTTP utilities       │
│                                                          │
│ MongoDB 6.3.0                                           │
│ └─ Purpose: NoSQL database driver                      │
│    Features: Connection management, operations         │
│                                                          │
│ Mongoose 8.0.4                                          │
│ └─ Purpose: MongoDB object modeling                    │
│    Features: Schema validation, middleware, queries    │
│                                                          │
│ dotenv 16.3.1                                           │
│ └─ Purpose: Environment variable management            │
│                                                          │
│ cors 2.8.5                                              │
│ └─ Purpose: Enable cross-origin requests               │
└─────────────────────────────────────────────────────────┘
```

### Development Tools

```
├── ESLint - JavaScript linting
├── PostCSS - CSS processing
├── Autoprefixer - CSS vendor prefixes
├── Vercel - Frontend deployment
└── Git - Version control
```


## 📊 Data Flow: Complete Example

### Scenario: User searches for "John" and filters by "North" region

```
Step 1: User types "John" in SearchBar
    └─► SearchBar.jsx onChange fires
        └─► updateSearch('John') called
            └─► queryParams.search = 'John'

Step 2: useDebounce waits 500ms
    └─► No new input → Returns debounced value
        └─► useEffect in useSalesData triggered
            └─► loadSalesData() called

Step 3: User clicks "North" checkbox
    └─► FilterPanel handleCheckboxChange
        └─► onFilterChange('regions', ['North'])
            └─► updateFilters('regions', ['North'])
                ├─► queryParams.regions = ['North']
                └─► queryParams.page = 1 (reset)

Step 4: useSalesData builds API request
    └─► api.fetchSalesData({
          search: 'John',
          regions: ['North'],
          sortBy: 'date_desc',
          page: 1,
          limit: 10
        })

Step 5: Axios sends GET request
    └─► GET /api/sales?search=John&regions=North&sortBy=date_desc&page=1&limit=10

Step 6: Backend receives request
    └─► Express routes to /api/sales handler
        └─► Build MongoDB query:
            {
              $or: [
                { customerName: /John/i },
                { phoneNumber: /John/i }
              ],
              customerRegion: { $in: ['North'] }
            }

Step 7: MongoDB query executes
    └─► Sales.find(query).sort({ date: -1 }).skip(0).limit(10)
        └─► Returns matching documents

Step 8: Backend formats response
    └─► {
          success: true,
          data: [... sales transactions ...],
          pagination: {
            currentPage: 1,
            totalPages: 5,
            totalItems: 42,
            itemsPerPage: 10,
            hasNextPage: true,
            hasPreviousPage: false
          }
        }

Step 9: Axios receives response
    └─► Response interceptor processes
        └─► Returns data to useSalesData

Step 10: useSalesData updates state
    └─► setSalesData(response.data)
    └─► setPagination(response.pagination)
    └─► setLoading(false)

Step 11: React re-renders Dashboard
    └─► SalesTable displays filtered data
    └─► Pagination shows "Page 1 of 5"
    └─► Summary cards update with new totals
```
