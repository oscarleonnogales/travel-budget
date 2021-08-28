import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function ReportMonth({ monthDetails }) {
	// console.log(monthDetails);
	const [detailsVisible, setDetailsVisible] = useState(false);

	const changeDetailsVisibility = () => {
		setDetailsVisible(!detailsVisible);
	};

	function getMonthlyTotal() {
		if (monthDetails.summary?.length === 0) return 0;
		return monthDetails.summary?.reduce((total, category) => {
			return (total += Number(category.total));
		}, 0);
	}

	if (getMonthlyTotal() === 0) return null;

	return (
		<div className="report__category">
			<div className="report__category-title">
				<button type="button" onClick={changeDetailsVisibility} className="report__purchases-toggle-btn">
					{!detailsVisible && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="bi bi-caret-down toggle-purchases-caret"
							viewBox="0 0 16 16"
						>
							<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
						</svg>
					)}
					{detailsVisible && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="bi bi-caret-up toggle-purchases-caret"
							viewBox="0 0 16 16"
						>
							<path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
						</svg>
					)}
				</button>
				<p className="year-report__subtitle">{monthDetails.monthName}</p>
				<p className="year-report__subtitle">${Number(getMonthlyTotal()).toFixed(2)}</p>
			</div>
			{detailsVisible && (
				<div className="report__purchases">
					{monthDetails.summary.map((month) => (
						<div className="year-report__category" key={uuid()}>
							<div className="year-report__categoryName">{month.category}</div>
							<div className="year-report__categoryTotal">${Number(month.total).toFixed(2)}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
