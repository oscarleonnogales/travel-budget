import express from 'express';
const router = express.Router();

import { createNewUser, authenticateUser, validateEmail } from '../controllers/users.js ';

router.post('/signup', createNewUser);

router.post('/login', authenticateUser);

router.post('/validate', validateEmail);

export default router;
