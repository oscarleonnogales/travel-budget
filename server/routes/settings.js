import express from 'express';
const router = express.Router();

import { authorize } from '../middleware/auth.js';
import { getUserSettings, updateUserSettings, changeName } from '../controllers/settings.js';

router.get('/', authorize, getUserSettings);

router.put('/', authorize, updateUserSettings);

router.put('/name', authorize, changeName);

export default router;
