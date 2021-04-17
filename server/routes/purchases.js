import express from 'express';
const router = express.Router();

import { getPurchases, createNewPurchase, deletePurchase, updatePurchase } from '../controllers/purchases.js';

router.get('/', getPurchases);

router.post('/', createNewPurchase);

router.put('/:id', updatePurchase);

router.delete('/:id', deletePurchase);

export default router;
