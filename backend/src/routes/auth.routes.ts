import { Router } from 'express';
import { meHandler, signinHandler, signoutHandler, signupHandler } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signupHandler);
router.post('/signin', signinHandler);
router.post('/signout', signoutHandler);
router.get('/me', requireAuth, meHandler);

export default router;
