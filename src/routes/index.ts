import { Router } from 'express';
const router = Router();

// Import API routes from the `api` folder
import apiRoutes from './api/index.js';

// Use the API routes for any requests starting with `/api`
router.use('/api', apiRoutes);

// If a request doesn't match any defined API routes, send a response indicating a wrong route.
router.use((_req, res) => {
  return res.send('Wrong route!');
});

// Export the router to be used in server.ts
export default router;
