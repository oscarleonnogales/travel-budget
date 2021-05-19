import React from 'react';
import ReportCategory from './ReportCategory';

export default function MonthReport({ categoryTotals, purchases }) {
	function getMonthlyTotal() {
		return categoryTotals
			.reduce((monthlyTotal, category) => {
				return (monthlyTotal += Number(category.total));
			}, 0)
			.toFixed(2);
	}

	return (
		<div className="month-report container">
			<h3 className="report__total">Total Expenses ${getMonthlyTotal()}</h3>
			{categoryTotals.map((category) => (
				<ReportCategory key={category.name} category={category} purchases={purchases} />
			))}
		</div>
	);
}
