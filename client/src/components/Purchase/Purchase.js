import React from 'react';
import dayjs from 'dayjs';
import './Purchase.css';

import { deletePurchase } from '../../redux/actions/purchases';
import { setCurrentId } from '../../redux/actions/currentId';
import { useDispatch, useSelector } from 'react-redux';

export default function Purchase({ purchase, renderButtons }) {
	const dispatch = useDispatch();
	const currentId = useSelector((state) => state.currentId);
	const userSettings = useSelector((state) => state.userSettings);

	return (
		<>
			<div className="purchase">
				<div className="purchase-row">
					<div className="purchase-description">{purchase.description}</div>
					<div className="purchase-converted-price">${purchase.amount}</div>
				</div>
				<div className="purchase-row">
					<div className="purchase-date">{dayjs(purchase.date).format('MMM DD, YYYY')}</div>
					{purchase.currency !== userSettings?.defaultCurrency && (
						<div className="purchase-actual-price">
							{purchase.amount} {purchase.currency}
						</div>
					)}
				</div>
				<div className="pruchase-category">{purchase.category.categoryName}</div>
				{renderButtons && (
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
				)}
			</div>
		</>
	);
}
