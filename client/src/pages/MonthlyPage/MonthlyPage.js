import './MonthlyPage.css';

import React, { useState, useEffect } from 'react';
import Purchase from '../components/Purchase/Purchase';
import dayjs from 'dayjs';
import Navbar from '../components/Navbar/Navbar';
import { useSelector } from 'react-redux';

export default function MonthlyPage() {
	const allPurchases = useSelector((state) => state.purchases);
	const [selectedPurchases, setSelectedPurchases] = useState(allPurchases);
	const [searchParameters, setSearchParameters] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	useEffect(() => {
		setSelectedPurchases(
			allPurchases.filter(
				(p) => dayjs(p.date).format('M-YYYY') === `${searchParameters.month + 1}-${searchParameters.year}`
			)
		);
	}, [allPurchases, searchParameters]);

	async function handleChange(e) {
		setSearchParameters({ ...searchParameters, [e.target.name]: parseInt(e.target.value) });
	}

	function resetDate() {
		setSearchParameters({
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
		});
	}

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content monthly-page">
				<div className="page-column">
					<div className="form-container">
						<div className="transaction-form-group">
							<div className="form-group">
								<label htmlFor="month" className="form-label">
									Month
								</label>
								<div className="custom-select mb-1">
									<select
										htmlFor="month"
										name="month"
										required
										className="form-select transaction-form-input"
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
										className="form-select transaction-form-input"
										onChange={(e) => handleChange(e)}
										value={searchParameters.year}
									>
										<option value="unselected" disabled>
											Select a year
										</option>
										<option value="2021">2021</option>
										<option value="2020">2020</option>
										<option value="2019">2019</option>
										<option value="2018">2018</option>
										<option value="2017">2017</option>
									</select>
									<span className="custom-arrow"></span>
								</div>
							</div>
							<button className="save-btn form-btn" onClick={() => resetDate()}>
								Current Month
							</button>
						</div>
					</div>
					<div className="month-purchases-container">
						{selectedPurchases.map((purchase) => {
							return <Purchase purchase={purchase} renderButtons={false} key={purchase._id} />;
						})}
					</div>
				</div>
				<div className="graph-container">fancy graph</div>
			</main>
		</>
	);
}
