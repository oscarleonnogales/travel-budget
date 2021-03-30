import express from 'express';
const router = express.Router();
import Transaction from '../models/transaction.js';

router.get('/', async (req, res) => {
	const transactions = await Transaction.find();
	res.status(200);
	res.json(transactions);
});

router.post('/', async (req, res) => {
	console.log(req);
	try {
		const newTransaction = new Transaction({
			description: req.body.description,
			amount: req.body.amount,
			currency: req.body.currency,
		});
		await newTransaction.save();
		res.status(201).end();
	} catch (error) {
		//Might need to change this
		res.status(400).send('Invalid inputs');
	}
});

router.put('/:id', async (req, res) => {
	const transaction = await Transaction.findById(req.params.id);
	try {
		transaction.description = req.body.description;
		transaction.date = req.body.date;
		transaction.amount = req.body.amount;
		transaction.currency = req.body.currency;

		await transaction.save();
		res.status(201).end();
	} catch (error) {
		// Might have to change this
		res.status(400).send('Invalid Inputs');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Transaction.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch {
		res.status(500).send('Server Error. Try again later.');
	}
});

export default router;
