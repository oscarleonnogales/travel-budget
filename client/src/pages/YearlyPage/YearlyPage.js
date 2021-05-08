import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import './YearlyPage.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../redux/actions/purchases';
import Navbar from '../../components/Navbar/Navbar';
import { Bar } from 'react-chartjs-2';
import { ViewPortContext } from '../../App';

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

export default function YearlyPage() {
	const dispatch = useDispatch();
	const { isMobileDevice } = useContext(ViewPortContext);
	const allPurchases = useSelector((state) => state.purchases);
	// const userSettings = useSelector((state) => state.userSettings);
	const [chartData, setChartData] = useState({});
	const [uniqueYears, setUniqueYears] = useState([]);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	useEffect(() => {
		const newUniqueYears = [];
		[...allPurchases].forEach((purchase) => {
			const year = dayjs(purchase.date).format('YYYY');
			if (!newUniqueYears.includes(year)) newUniqueYears.push(year);
		});
		setUniqueYears(newUniqueYears);
	}, [allPurchases]);

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	useEffect(() => {
		setChartData({
			labels: [...monthNames],
			datasets: [
				{
					label: `${selectedYear} Summary`,
					data: [...monthNames].map((month) => {
						return allPurchases.reduce((total, purchase) => {
							return dayjs(purchase.date).format('MMMM') === month &&
								dayjs(purchase.date).format('YYYY') === selectedYear
								? (total += purchase.amount)
								: total;
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
	}, [allPurchases]);

	const handleChange = (e) => {
		setSelectedYear(e.target.value);
	};

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content yearly-page">
				<div className="selecte-form-container">
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
				<div className="graph-container">
					<Bar height={100} width={100} data={chartData} options={{ maintainAspectRatio: isMobileDevice }} />
				</div>
			</main>
		</>
	);
}
