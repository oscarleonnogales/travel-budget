import React from 'react';
import Purchase from '../Purchase/Purchase';
import './PurchasesContainer.css';

export default function PurchasesContainer({ purchases, renderButtons }) {
	return (
		<div className="purchases-container">
			{purchases?.map((purchase) => {
				return <Purchase purchase={purchase} renderButtons={renderButtons} key={purchase._id} />;
			})}
			{purchases?.map((purchase) => {
				return <Purchase purchase={purchase} renderButtons={renderButtons} key={purchase._id} />;
			})}
			{purchases?.map((purchase) => {
				return <Purchase purchase={purchase} renderButtons={renderButtons} key={purchase._id} />;
			})}
			{purchases?.map((purchase) => {
				return <Purchase purchase={purchase} renderButtons={renderButtons} key={purchase._id} />;
			})}
			{purchases?.map((purchase) => {
				return <Purchase purchase={purchase} renderButtons={renderButtons} key={purchase._id} />;
			})}
			{purchases?.map((purchase) => {
				return <Purchase purchase={purchase} renderButtons={renderButtons} key={purchase._id} />;
			})}
		</div>
	);
}
