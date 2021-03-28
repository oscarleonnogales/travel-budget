import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transaction from '../components/Transaction/Transaction';
import AddTransactionForm from '../components/AddTransactionForm/AddTransactionForm';

export default function TransactionsPage() {
	const [transactions, setTransactions] = useState([]);

	useEffect(fetchTransactions, []);

	function fetchTransactions() {
		axios.get('http://localhost:3001/transactions').then((res) => {
			setTransactions(res.data);
		});
	}

	return (
		<div>
			{transactions.map((transaction) => {
				return <Transaction transaction={transaction} key={transaction._id} />;
			})}
			<AddTransactionForm></AddTransactionForm>
		</div>
	);
}
