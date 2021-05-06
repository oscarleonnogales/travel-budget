import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function MonthForm({ allPurchases, handleChange, resetDate, searchParameters }) {
	const [years, setYears] = useState([]);
	const [uniqueDates, setUniqueDates] = useState([]);

	useEffect(() => {
		const newDates = [];
		[...allPurchases].forEach((p) => {
			const year = dayjs(p.date).format('YYYY');
			const month = dayjs(p.date).format('M');
			if (!years.includes(year)) setYears([...years, year]);

			let isDateUnique = true;
			newDates.forEach((date) => {
				if (date.year === year && date.month === month) {
					isDateUnique = false;
				}
			});

			if (isDateUnique)
				newDates.push({
					year,
					month,
				});
		});
		setUniqueDates(newDates);
	}, [allPurchases, years]);

	useEffect(() => {
		console.log('uniqueDates');
		console.log(uniqueDates);
		console.log('years');
		console.log(years);
	}, [uniqueDates, years]);

	return (
		<div className="form-container">
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
						onChange={(e) => handleChange(e)}
						value={searchParameters.month}
					>
						<option value="unselected" disabled>
							Select a month
						</option>
						<option value="0">January</option>
						<option value="1">February</option>
						<option value="2">March</option>
						<option value="3">April</option>
						<option value="4">May</option>
						<option value="5">June</option>
						<option value="6">July</option>
						<option value="7">August</option>
						<option value="8">September</option>
						<option value="9">October</option>
						<option value="10">November</option>
						<option value="11">December</option>
					</select>
					<span className="custom-arrow"></span>
				</div>
			</div>
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
						onChange={(e) => handleChange(e)}
						value={searchParameters.year}
					>
						<option value="unselected" disabled>
							Select a year
						</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
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
