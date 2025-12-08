import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your .env file has correct MONGODB_URI');
    console.error('   2. Ensure password has no special characters (or URL encode them)');
    console.error('   3. Verify IP whitelist includes 0.0.0.0/0');
    console.error('   4. Check internet connection\n');
    process.exit(1);
  }
};

export default connectDB;