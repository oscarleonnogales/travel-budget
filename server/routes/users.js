import express from 'express';
const router = express.Router();

import {
	createNewUser,
	createGoogleUser,
	authenticateUser,
	validateEmail,
	getUserSettings,
	updateUserSettings,
	changePassword,
	changeName,
} from '../controllers/users.js ';
import { authorize } from '../middleware/auth.js';

router.post('/signup', createNewUser);

router.post('/googleSignup', authorize, createGoogleUser);

router.post('/login', authenticateUser);

router.put('/change-password', authorize, changePassword);

router.post('/validate', validateEmail);

router.get('/settings', authorize, getUserSettings);

router.put('/settings', authorize, updateUserSettings);

router.put('/namechange', authorize, changeName);

export default router;
