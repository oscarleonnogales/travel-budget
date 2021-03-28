import React from 'react';
import dayjs from 'dayjs';
import './Transaction.css';

export default function Transaction({ transaction }) {
	return (
		<div className="transaction">
			<div className="transaction-text-details">
				<div>{transaction.description}</div>
				<div>{dayjs(transaction.date).format('MMM DD, YYYY')}</div>
			</div>
			<div className="transaction-price-details">
				<div>{transaction.amount}</div>
			</div>
		</div>
	);
}
