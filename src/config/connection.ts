// Import the Mongoose library to manage MongoDB connections
import mongoose from 'mongoose';

// Establish a connection to the local MongoDB database hosted on our computer named socialNetworkDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// Export the active database connection to be used in server.ts
export default mongoose.connection;
