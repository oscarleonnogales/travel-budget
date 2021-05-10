import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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

export default function MonthForm(props) {
	const { allPurchases, changeSearchMonth, changeSearchYear, resetDate, searchMonth, searchYear } = props;
	const [uniqueYears, setUniqueYears] = useState([]);
	const [uniqueMonths, setUniqueMonths] = useState([]);

	const [activeMonths, setActiveMonths] = useState();

	useEffect(() => {
		const newUniqueMonths = [];
		[...allPurchases].forEach((p) => {
			const year = dayjs.utc(p.date).format('YYYY');
			const month = dayjs.utc(p.date).format('M');
			if (!uniqueYears.includes(year)) setUniqueYears([...uniqueYears, year]);

			let isMonthUnique = true;
			newUniqueMonths.forEach((date) => {
				if (date.year === year && date.month === month) {
					isMonthUnique = false;
				}
			});

			if (isMonthUnique) {
				newUniqueMonths.push({
					year,
					month,
				});
			}
		});
		setUniqueMonths(newUniqueMonths);
	}, [allPurchases, uniqueYears]);

	useEffect(() => {
		setActiveMonths(uniqueMonths.filter((date) => parseInt(date.year) === searchYear));
	}, [searchYear, uniqueMonths]);

	// This only runs when the searchYear changes, but we need it's own useEffect as it's run asynchronously
	// Do not add searchYear to the dependency array, or we'll run this code when we reset the date
	useEffect(() => {
		if (activeMonths?.length > 0 && searchYear) changeSearchMonth(parseInt(activeMonths[0].month));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMonths]);

	return (
		<div className="form-container">
			<div className="form-group">
				<label htmlFor="year" className="form-label">
					Year
				</label>
				<div className="custom-select mb-1">
					<select
						htmlFor="year"
						name="year"
						required
						className="form-select purchase-form-input"
						onChange={(e) => changeSearchYear(e)}
						value={searchYear}
					>
						<option value="unselected" disabled>
							Select a year
						</option>
						{uniqueYears.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
					<span className="custom-arrow"></span>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="month" className="form-label">
					Month
				</label>
				<div className="custom-select mb-1">
					<select
						htmlFor="month"
						name="month"
						required
						className="form-select purchase-form-input"
						onChange={(e) => changeSearchMonth(parseInt(e.target.value))}
						value={searchMonth}
					>
						<option value="unselected" disabled>
							Select a month
						</option>
						{activeMonths?.map((activeMonth) => (
							<option value={activeMonth.month} key={activeMonth.month}>
								{monthNames[activeMonth.month - 1]}
							</option>
						))}
					</select>
					<span className="custom-arrow"></span>
				</div>
			</div>
			<button className="save-btn form-btn" onClick={() => resetDate()}>
				Current Month
			</button>
		</div>
	);
}
