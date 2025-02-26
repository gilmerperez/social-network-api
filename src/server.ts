import express from 'express';
import routes from './routes/index.js'; // Import API routes from the routes folder
import db from './config/connection.js'; // Import the database connection

// Wait to connect to database before continuing
await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
