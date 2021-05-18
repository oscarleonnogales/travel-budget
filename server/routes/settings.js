import express from 'express';
const router = express.Router();

import { authorize } from '../middleware/auth.js';
import {
	getUserSettings,
	changeName,
	changePassword,
	changeDefaultCurrency,
	setPurchaseCategories,
} from '../controllers/settings.js';

router.get('/', authorize, getUserSettings);

router.put('/name', authorize, changeName);

router.put('/password', authorize, changePassword);

router.put('/currency', authorize, changeDefaultCurrency);

router.put('/categories', authorize, setPurchaseCategories);

export default router;
