import { Router } from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';
import reactionRoutes from './reactionRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

export default router;
