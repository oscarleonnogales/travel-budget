import express from 'express';
const router = express.Router();

import { createNewUser, authenticateUser } from '../controllers/users.js ';

router.get('/', (req, res) => {
	res.send('users');
});

router.post('/signup', createNewUser);

router.post('/login', authenticateUser);

export default router;
