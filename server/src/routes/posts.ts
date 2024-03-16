import { Router } from 'express';
import { getAll } from '../controllers/posts';

const router = Router();

router.get('/', getAll);

export default router;
