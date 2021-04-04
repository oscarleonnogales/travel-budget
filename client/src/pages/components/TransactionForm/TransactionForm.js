import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../../../actions/transactions';
import { setCurrentId } from '../../../actions/currentId';
import './TransactionForm.css';

export default function AddTransactionForm() {
	const [currentData, setCurrentData] = useState({
		date: '',
		description: '',
		amount: '',
		currency: '',
	});
	const currentId = useSelector((state) => state.currentId);
	const transactions = useSelector((state) => state.transactions);

	const dispatch = useDispatch();

	useEffect(() => {
		if (currentId) setCurrentData(transactions.find((t) => t._id === currentId));
	}, [currentId, transactions]);

	useEffect(() => {
		console.log(currentData);
	}, [currentData]);

	function handleChange(e) {
		setCurrentData({ ...currentData, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (currentId) {
			dispatch(updateTransaction(currentId, currentData));
		} else {
			dispatch(addTransaction(currentData));
		}
		clearForm();
	}

	function clearForm() {
		dispatch(setCurrentId(null));
		setCurrentData({
			date: '',
			description: '',
			amount: '',
			currency: '',
		});
	}

	return (
		<div>
			<h3>{currentId ? 'Edit' : 'Add'} Transaction</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="date">Date</label>
				<input type="date" name="date" value={currentData.date} onChange={handleChange}></input>
				<label htmlFor="description">Description</label>
				<input type="text" name="description" value={currentData.description} onChange={handleChange}></input>
				<label htmlFor="amount">Amount</label>
				<input type="number" name="amount" step="0.01" value={currentData.amount} onChange={handleChange}></input>
				<label htmlFor="currency">Currency</label>
				<input type="text" name="currency" value={currentData.currency} onChange={handleChange}></input>
				<button type="submit">Save</button>
			</form>
			<button onClick={clearForm}>{currentId ? 'Cancel' : 'Clear Form'}</button>
		</div>
	);
}
