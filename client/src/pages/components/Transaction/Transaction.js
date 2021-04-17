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
		<>
			<div className="transaction">
				<div className="transaction-row">
					<div className="transaction-description">{transaction.description}</div>
					<div className="transaction-converted-price">${transaction.amount}</div>
				</div>
				<div className="transaction-row">
					<div className="transaction-date">{dayjs(transaction.date).format('MMM DD, YYYY')}</div>
					{/* Do something here to only show if not the users default currency */}
					{transaction.currency !== 'usd' && (
						<div className="transaction-actual-price">
							{transaction.amount} {transaction.currency}
						</div>
					)}
				</div>
				<div className="transaction-btn-container">
					<button className="save-btn transaction-btn" onClick={() => dispatch(setCurrentId(transaction._id))}>
						Edit
					</button>
					{currentId !== transaction._id && (
						<button className="cancel-btn transaction-btn" onClick={() => dispatch(deleteTransaction(transaction._id))}>
							&times;
						</button>
					)}
				</div>
			</div>
		</>
	);
}
