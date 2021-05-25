import React from 'react';
import ReportCategory from './ReportCategory';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export default function MonthReport({ searchYear, searchMonth, categoryTotals, purchases }) {
	function getMonthlyTotal() {
		return categoryTotals
			.reduce((monthlyTotal, category) => {
				return (monthlyTotal += Number(category.total));
			}, 0)
			.toFixed(2);
	}

	return (
		<div className="month-report container">
			<h3 className="report__total">
				{`${monthNames[searchMonth - 1]} ${searchYear} Total - `} ${getMonthlyTotal()}
			</h3>
			{categoryTotals.map((category) => (
				<ReportCategory key={category.name} category={category} purchases={purchases} />
			))}
		</div>
	);
}
