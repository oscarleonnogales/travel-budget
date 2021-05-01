import express from 'express';
const router = express.Router();

import {
	createNewUser,
	createGoogleUser,
	authenticateUser,
	validateEmail,
	getUserSettings,
	setUserSettings,
} from '../controllers/users.js ';
import { authorize } from '../middleware/auth.js';

router.post('/signup', createNewUser);

router.post('/googleSignup', authorize, createGoogleUser);

router.post('/login', authenticateUser);

router.post('/validate', validateEmail);

router.get('/settings', authorize, getUserSettings);

router.post('/settings', authorize, setUserSettings);

export default router;
