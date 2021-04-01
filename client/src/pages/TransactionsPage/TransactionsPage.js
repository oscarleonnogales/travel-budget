import React from 'react';
import Transaction from '../components/Transaction/Transaction';
import AddTransactionForm from '../components/AddTransactionForm/AddTransactionForm';

import { useSelector } from 'react-redux';

export default function TransactionsPage() {
	const transactions = useSelector((state) => state.transactions);

	return (
		<div>
			{transactions.map((transaction) => {
				return <Transaction transaction={transaction} key={transaction._id} />;
			})}
			<AddTransactionForm></AddTransactionForm>
		</div>
	);
}
