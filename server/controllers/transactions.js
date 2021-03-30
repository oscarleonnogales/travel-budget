import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';

export async function getTransactions(req, res) {
	try {
		const transactions = await Transaction.find();
		res.status(200).json(transactions);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function createNewTransaction(req, res) {
	try {
		const newTransaction = new Transaction({
			description: req.body.description,
			amount: req.body.amount,
			currency: req.body.currency,
		});
		await newTransaction.save();
		res.status(201).json(newTransaction);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function deleteTransaction(req, res) {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) return res.status(404).send(`No transaction with id: ${id}`);
		await transaction.deleteOne({ id: transaction.id });
		res.json({ message: 'Transaction successfully deleted.' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateTransaction(req, res) {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) return res.status(404).send(`No transaction with id: ${id}`);

		transaction.description = req.body.description;
		transaction.date = req.body.date;
		transaction.amount = req.body.amount;
		transaction.currency = req.body.currency;

		await transaction.save();
		res.status(201).json(transaction);
	} catch {
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}
