import { Router } from 'express';
import {
  logout_POST,
  signin_POST,
  signup_POST,
  whoami_GET,
} from '../controllers/auth';

const router = Router();

router.post('/sign-up', signup_POST);

router.post('/sign-in', signin_POST);

router.post('/log-out', logout_POST);

router.get('/whoami', whoami_GET);

export default router;
