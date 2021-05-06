import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './YearlyPage.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../redux/actions/purchases';
import Navbar from '../../components/Navbar/Navbar';
import { Bar } from 'react-chartjs-2';

export default function YearlyPage() {
	const dispatch = useDispatch();

	const allPurchases = useSelector((state) => state.purchases);
	const [chartData, setChartData] = useState({});

	//Temporary until we have authentication
	const user = {
		categories: ['housing', 'groceries', 'food', 'transportation', 'luxuries', 'other'],
		years: [2019, 2020, 2021],
	};

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	useEffect(() => {
		setChartData({
			labels: [...user.years],
			datasets: [
				{
					label: 'Yearly Total',
					data: [...user.years].map((year) => {
						return allPurchases.reduce((total, purchase) => {
							return dayjs(purchase.date).format('YYYY') === `${year}` ? (total += purchase.amount) : total;
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

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content yearly-page">
				<div className="graph-container">
					<Bar height={100} width={100} data={chartData} options={{ maintainAspectRatio: false }} />
				</div>
			</main>
		</>
	);
}
