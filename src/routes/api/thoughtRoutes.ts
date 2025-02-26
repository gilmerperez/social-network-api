import { Router } from 'express';
const router = Router();

// Import user controller functions

router.get('/', (_req, res) => res.send('User route working!'));

// Export the router to be used in `api/index.ts`
export default router;