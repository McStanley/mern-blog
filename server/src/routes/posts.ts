import { Router } from 'express';
import { getAll, getComments, getOne } from '../controllers/posts';

const router = Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.get('/:id/comments', getComments);

export default router;
