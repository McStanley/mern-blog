import { Router } from 'express';
import { create } from '../controllers/comments';

const router = Router();

router.post('/', create);

export default router;
