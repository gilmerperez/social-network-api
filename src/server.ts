import express from 'express';
import routes from './routes/index.js'; // Import routes from the routes folder
import db from './config/connection.js'; // Import the database connection

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.json()); // Middleware to parse incoming JSON data in requests
app.use(routes); // Use imported routes for handling API requests

// Wait for the database connection to open before starting the server
db.once('open', () => {
  // Once connected, start the server and listen on the defined port.
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

