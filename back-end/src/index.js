import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',           
    'http://localhost:5173',           
    'http://localhost:5000',           
    'https://*.vercel.app',            
    /^https:\/\/.*\.vercel\.app$/      
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/sales', salesRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'TrueState Sales API',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('\n==================================================');
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('==================================================\n');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ MongoDB Atlas Connected: ${mongoose.connection.host}`);
      console.log(`📊 Database: ${mongoose.connection.name}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\n👋 MongoDB connection closed. Server shutting down...');
  process.exit(0);
});

export default app;