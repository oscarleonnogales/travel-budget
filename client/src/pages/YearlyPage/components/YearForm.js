import React from 'react';

export default function YearForm(props) {
	const { handleChange, uniqueYears, selectedYear } = props;
	return (
		<div className="container year-form-container">
			<label htmlFor="selectedYear">Select a Year</label>
			<div className="custom-select mb-1">
				<select
					htmlFor="selectedYear"
					name="selectedYear"
					required
					className="form-select purchase-form-input"
					onChange={handleChange}
					value={selectedYear}
				>
					<option value="unselected" disabled>
						Select a year
					</option>
					{uniqueYears?.map((year) => (
						<option value={year} key={year}>
							{year}
						</option>
					))}
				</select>
				<span className="custom-arrow"></span>
			</div>
		</div>
	);
}
