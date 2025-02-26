import express from 'express';
// Import API routes from the routes folder
import routes from './routes/index.js';
// Import the database connection
import db from './config/connection.js';

await db(); // Wait to connect to database before continuing

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true}));
// Middleware to parse incoming JSON data in requests
app.use(express.json());
// Use imported routes for handling API requests
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
