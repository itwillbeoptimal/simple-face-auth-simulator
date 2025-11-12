import { Router } from 'express';
import multer from 'multer';
import { extractEmbedding } from '@/api/controllers/face.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/extract-embedding', upload.single('file'), extractEmbedding);

export default router;
