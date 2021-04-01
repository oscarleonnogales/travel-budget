import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../../actions/transactions';
import './AddTransactionForm.css';

export default function AddTransactionForm() {
	const [transactionData, setTransactionData] = useState({
		date: '',
		description: '',
		amount: '',
		currency: '',
	});

	const dispatch = useDispatch();

	function handleChange(e) {
		setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(addTransaction(transactionData));
		clearForm();
	}

	function clearForm() {
		setTransactionData({
			date: '',
			description: '',
			amount: '',
			currency: '',
		});
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="date">Date</label>
				<input type="date" name="date" value={transactionData.date} onChange={handleChange}></input>
				<label htmlFor="description">Description</label>
				<input type="text" name="description" value={transactionData.description} onChange={handleChange}></input>
				<label htmlFor="amount">Amount</label>
				<input type="number" name="amount" step="0.01" value={transactionData.amount} onChange={handleChange}></input>
				<label htmlFor="currency">Currency</label>
				<input type="text" name="currency" value={transactionData.currency} onChange={handleChange}></input>
				<button type="submit">Add Transaction</button>
			</form>
			<button onClick={clearForm}>Clear Form</button>
		</>
	);
}
