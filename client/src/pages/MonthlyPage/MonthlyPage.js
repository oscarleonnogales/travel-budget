import './MonthlyPage.css';

import React, { useState, useEffect } from 'react';
import Purchase from '../../components/Purchase/Purchase';
import dayjs from 'dayjs';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../redux/actions/purchases';

import { Doughnut } from 'react-chartjs-2';

export default function MonthlyPage() {
	const dispatch = useDispatch();
	const allPurchases = useSelector((state) => state.purchases);
	const [chartData, setChartData] = useState({});
	const [selectedPurchases, setSelectedPurchases] = useState(allPurchases);
	const [searchParameters, setSearchParameters] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	//Temporary until we have authentication
	const user = {
		categories: ['housing', 'groceries', 'food', 'transportation', 'luxuries', 'other'],
	};

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	useEffect(() => {
		setSelectedPurchases(
			allPurchases.filter(
				(p) => dayjs(p.date).format('M-YYYY') === `${searchParameters.month + 1}-${searchParameters.year}`
			)
		);
	}, [allPurchases, searchParameters]);

	useEffect(() => {
		setChartData({
			labels: [...user.categories],
			datasets: [
				{
					label: 'April 2020',
					// label: `${searchParameters.month} ${searchParameters.year}`,
					data: [...user.categories].map((category) => {
						return selectedPurchases.reduce((total, purchase) => {
							return purchase.category === category ? (total += purchase.amount) : total;
						}, 0);
					}),
					backgroundColor: [
						'rgba(54, 162, 235, 1)',
						'rgba(255, 99, 132, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)',
						'rgb(64, 99, 255)',
						'rgb(184, 27, 48)',
						'rgb(14, 167, 9)',
						'rgb(97, 97, 97)',
					],
					hoverOffset: 4,
				},
			],
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPurchases]);

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
						<div className="purchase-form-group">
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
				<div className="graph-container">
					<Doughnut height={100} width={100} data={chartData} />
				</div>
			</main>
		</>
	);
}
