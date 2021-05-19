import React, { useState } from 'react';

export default function ReportCategory({ category, purchases }) {
	const [purchasesVisible, setPurchasesVisible] = useState(false);

	const changePurchasesVisibility = () => {
		setPurchasesVisible(!purchasesVisible);
	};
	return (
		<div className="report__category">
			<div className="report__category-title">
				<button type="button" onClick={changePurchasesVisibility} className="report__purchases-toggle-btn">
					{!purchasesVisible && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="bi bi-caret-down toggle-purchases-caret"
							viewBox="0 0 16 16"
						>
							<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
						</svg>
					)}
					{purchasesVisible && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="bi bi-caret-up toggle-purchases-caret"
							viewBox="0 0 16 16"
						>
							<path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
						</svg>
					)}
				</button>
				<p>{category.name}</p>
				<p>${category.total}</p>
			</div>
			{purchasesVisible && (
				<div className="report__purchases">
					{purchases.map((purchase) => {
						if (purchase.category.categoryName === category.name) {
							return (
								<div className="report__purchase" key={purchase._id}>
									<div className="report__purchase-description">{purchase.description}</div>
									<div className="report__purchase-amount">${purchase.convertedPrice}</div>
								</div>
							);
						} else return null;
					})}
				</div>
			)}
		</div>
	);
}
