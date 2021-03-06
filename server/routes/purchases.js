import express from 'express';
const router = express.Router();

import { getPurchases, createNewPurchase, deletePurchase, updatePurchase } from '../controllers/purchases.js';
import { authorize } from '../middleware/auth.js';

router.get('/', authorize, getPurchases);

router.post('/', authorize, createNewPurchase);

router.put('/:id', authorize, updatePurchase);

router.delete('/:id', authorize, deletePurchase);

export default router;
