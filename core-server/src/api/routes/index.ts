import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import faceRoutes from './face.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/face', faceRoutes);

export default router;
