import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './Purchase.css';

import { deletePurchase } from '../../../../redux/actions/purchases';
import { setCurrentId } from '../../../../redux/actions/currentId';
import { useDispatch, useSelector } from 'react-redux';
dayjs.extend(utc);

export default function Purchase({ purchase }) {
	const dispatch = useDispatch();
	const currentId = useSelector((state) => state.currentId);
	const userSettings = useSelector((state) => state.userSettings);

	return (
		<>
			<div className="purchase">
				<div className="purchase-btn-container">
					<button className="save-btn purchase-btn" onClick={() => dispatch(setCurrentId(purchase._id))}>
						Edit
					</button>
					{currentId !== purchase._id && (
						<button className="cancel-btn purchase-btn" onClick={() => dispatch(deletePurchase(purchase._id))}>
							&times;
						</button>
					)}
				</div>
				<div className="purchase-date">{dayjs.utc(purchase.date).format('MMM DD, YYYY')}</div>
				<div className="purchase-text">
					<div className="purchase-description">{purchase.description}</div>
					<div className="pruchase-category">{purchase.category.categoryName}</div>
				</div>
				<div className="purchase-pricing">
					<div className="purchase-converted-price">${purchase.convertedPrice.toFixed(2)}</div>
					{purchase.currency !== userSettings?.defaultCurrency && (
						<div className="purchase-actual-price">
							{purchase.amount} {purchase.currency}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
