import { Router } from 'express';
import multer from 'multer';
import { signup, login, refresh, logout, checkEmail } from '@/api/controllers/auth.controller';
import { BadRequestError } from '@/shared/types/error';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new BadRequestError('이미지 파일만 업로드할 수 있습니다'));
    }
  },
});

router.post('/signup', upload.single('face'), signup);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/check-email', checkEmail);

export default router;
