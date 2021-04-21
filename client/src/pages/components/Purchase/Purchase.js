import React from 'react';
import dayjs from 'dayjs';
import './Purchase.css';

import { deletePurchase } from '../../../actions/purchases';
import { setCurrentId } from '../../../actions/currentId';
import { useDispatch, useSelector } from 'react-redux';

export default function Purchase({ purchase, renderButtons }) {
	const dispatch = useDispatch();
	const currentId = useSelector((state) => state.currentId);

	return (
		<>
			<div className="transaction">
				<div className="transaction-row">
					<div className="transaction-description">{purchase.description}</div>
					<div className="transaction-converted-price">${purchase.amount}</div>
				</div>
				<div className="transaction-row">
					<div className="transaction-date">{dayjs(purchase.date).format('MMM DD, YYYY')}</div>
					{/* Do something here to only show if not the users default currency */}
					{purchase.currency !== 'usd' && (
						<div className="transaction-actual-price">
							{purchase.amount} {purchase.currency}
						</div>
					)}
				</div>
				{renderButtons && (
					<div className="transaction-btn-container">
						<button className="save-btn transaction-btn" onClick={() => dispatch(setCurrentId(purchase._id))}>
							Edit
						</button>
						{currentId !== purchase._id && (
							<button className="cancel-btn transaction-btn" onClick={() => dispatch(deletePurchase(purchase._id))}>
								&times;
							</button>
						)}
					</div>
				)}
			</div>
		</>
	);
}
