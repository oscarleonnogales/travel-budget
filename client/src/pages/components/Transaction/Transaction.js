import React from 'react';
import dayjs from 'dayjs';
import './Transaction.css';

import { deleteTransaction } from '../../../actions/transactions';
import { setCurrentId } from '../../../actions/currentId';
import { useDispatch, useSelector } from 'react-redux';

export default function Transaction({ transaction }) {
	const dispatch = useDispatch();
	const currentId = useSelector((state) => state.currentId);

	return (
		<div className="transaction">
			<div className="transaction-text-details">
				<div>{transaction.description}</div>
				<div>{dayjs(transaction.date).format('MMM DD, YYYY')}</div>
			</div>
			<div className="transaction-price-details">
				<div>{transaction.amount}</div>
			</div>
			<div className="transactions-page__btn-container">
				{currentId !== transaction._id && (
					<button onClick={() => dispatch(deleteTransaction(transaction._id))}>&times;</button>
				)}
				<button onClick={() => dispatch(setCurrentId(transaction._id))}>Edit</button>
			</div>
		</div>
	);
}
