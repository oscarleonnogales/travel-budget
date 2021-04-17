import React from 'react';
import Transaction from '../components/Transaction/Transaction';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import Navbar from '../components/Navbar/Navbar';

import { useSelector } from 'react-redux';
import './TransactionsPage.css';

export default function TransactionsPage() {
	const transactions = useSelector((state) => state.transactions);

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<TransactionForm />
				<div className="transactions-container">
					{transactions.map((transaction) => {
						return <Transaction transaction={transaction} key={transaction._id} />;
					})}
				</div>
			</main>
		</>
	);
}
