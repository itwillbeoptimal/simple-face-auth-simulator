import { Router } from 'express';
import {
  getFaceEmbeddings,
  getUser,
  verifyPassword,
  changePassword,
} from '@/api/controllers/user.controller';
import { authenticate } from '@/shared/middlewares/auth.middleware';

const router = Router();

router.get('/face-embeddings', getFaceEmbeddings);
router.get('/:userId', getUser);
router.post('/verify-password', authenticate, verifyPassword);
router.put('/change-password', authenticate, changePassword);

export default router;
