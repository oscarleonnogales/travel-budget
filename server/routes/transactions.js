import express from 'express';
const router = express.Router();

import {
	getTransactions,
	createNewTransaction,
	deleteTransaction,
	updateTransaction,
} from '../controllers/transactions.js';

router.get('/', getTransactions);

router.post('/', createNewTransaction);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

export default router;
