// Import the Mongoose library to manage MongoDB connections
import mongoose from 'mongoose';

// Establish a connection to the local MongoDB database
const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
}

// Export the active database connection to be used in server.ts
export default db;
