import express from 'express';
const router = express.Router();

import { createNewUser, createGoogleUser, authenticateUser, validateEmail } from '../controllers/users.js ';
import { authorize } from '../middleware/auth.js';

router.post('/signup', createNewUser);

router.post('/googleSignup', authorize, createGoogleUser);

router.post('/login', authenticateUser);

router.post('/validate', validateEmail);

export default router;
