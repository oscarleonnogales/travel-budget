const express = require('express');
const router = express.Router();
const Transaction = require('../models/transation');

router.get('/', async (req, res) => {
	const transactions = await Transaction.find();
	res.status(200);
	res.json(transactions);
});

router.post('/', async (req, res) => {
	try {
		const newTransaction = new Transaction({
			description: req.body.description,
			amount: req.body.amount,
			currency: req.body.currency,
		});
		await newTransaction.save();
		res.status(201);
	} catch (error) {
		//Might need to change this
		res.status(400);
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
		res.status(201);
	} catch (error) {
		// Might have to change this
		res.status(400);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Transaction.findByIdAndDelete(req.params.id);
		res.status(204);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
});

module.exports = router;
