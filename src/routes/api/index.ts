import { Router } from 'express';
const router = Router();

// Import route handlers for users and thoughts
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

router.use('/users', userRoutes); // Define `/api/users` to handle user-related routes
router.use('/thoughts', thoughtRoutes); // Define `/api/thoughts` to handle thought-related routes

// Export the router to be used in routes/index.ts
export default router;
