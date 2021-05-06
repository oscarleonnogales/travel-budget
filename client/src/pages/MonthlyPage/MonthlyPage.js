import './MonthlyPage.css';
import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../redux/actions/purchases';
import { ViewPortContext } from '../../App';
import { Doughnut } from 'react-chartjs-2';
import MonthForm from './components/MonthForm';
import PurchasesContainer from '../../components/PurchasesContainer/PurchasesContainer';

export default function MonthlyPage() {
	const dispatch = useDispatch();
	const allPurchases = useSelector((state) => state.purchases);
	const userSettings = useSelector((state) => state.userSettings);
	const { isMobileDevice } = useContext(ViewPortContext);
	const [chartData, setChartData] = useState({});
	const [selectedPurchases, setSelectedPurchases] = useState(allPurchases);
	const [searchParameters, setSearchParameters] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

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
			labels: [...userSettings.categories].map((category) => category.categoryName),
			datasets: [
				{
					label: 'April 2020',
					// label: `${searchParameters.month} ${searchParameters.year}`,
					data: [...userSettings.categories].map((category) => {
						return selectedPurchases.reduce((total, purchase) => {
							return purchase.category.categoryId === category.categoryId ? (total += purchase.convertedPrice) : total;
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

	const handleChange = (e) => {
		setSearchParameters({ ...searchParameters, [e.target.name]: parseInt(e.target.value) });
	};

	const resetDate = () => {
		setSearchParameters({
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
		});
	};

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content monthly-page">
				<MonthForm
					allPurchases={allPurchases}
					handleChange={handleChange}
					resetDate={resetDate}
					searchParameters={searchParameters}
				/>

				{selectedPurchases?.length > 0 && <PurchasesContainer purchases={selectedPurchases} renderButtons={false} />}

				<div className="graph-container">
					<Doughnut height={100} width={100} data={chartData} options={{ maintainAspectRatio: isMobileDevice }} />
				</div>
			</main>
		</>
	);
}
