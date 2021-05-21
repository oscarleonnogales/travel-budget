import React from 'react';
import ReportMonth from './ReportMonth';

export default function YearReport({ reportDetails }) {
	function getYearlyTotal() {
		let yearTotal = 0;
		for (let month of Object.keys(reportDetails)) {
			yearTotal += reportDetails[month]?.summary?.reduce((total, month) => {
				return (total += Number(month.total));
			}, 0);
		}
		return yearTotal.toFixed(2);
	}

	return (
		<div className="year-report container">
			<h3 className="year-report__total">Total Expenses ${getYearlyTotal()}</h3>
			{Object.keys(reportDetails).map((month) => {
				const monthDetails = reportDetails[month];
				return <ReportMonth key={monthDetails.monthName} monthDetails={monthDetails} />;
			})}
		</div>
	);
}
