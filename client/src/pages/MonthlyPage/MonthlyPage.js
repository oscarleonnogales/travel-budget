import './MonthlyPage.css';
import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../redux/actions/purchases';
import { ViewPortContext } from '../../App';
import { Doughnut } from 'react-chartjs-2';
import MonthForm from './components/MonthForm';
import PurchasesContainer from '../../components/PurchasesContainer/PurchasesContainer';
dayjs.extend(utc);

export default function MonthlyPage() {
	const dispatch = useDispatch();
	const allPurchases = useSelector((state) => state.purchases);
	const userSettings = useSelector((state) => state.userSettings);
	const { isMobileDevice } = useContext(ViewPortContext);

	const [selectedPurchases, setSelectedPurchases] = useState(allPurchases);
	const [chartData, setChartData] = useState({});

	const [searchMonth, setSearchMonth] = useState(new Date().getMonth() + 1);
	const [searchYear, setSearchYear] = useState(new Date().getFullYear());

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	useEffect(() => {
		setSelectedPurchases(
			allPurchases.filter((p) => dayjs.utc(p.date).format('M-YYYY') === `${searchMonth}-${searchYear}`)
		);
	}, [allPurchases, searchMonth, searchYear]);

	useEffect(() => {
		setChartData({
			labels: [...userSettings.categories].map((category) => category.categoryName),
			datasets: [
				{
					data: [...userSettings.categories].map((category) => {
						return parseFloat(
							selectedPurchases.reduce((total, purchase) => {
								return purchase.category.categoryId === category.categoryId
									? (total += purchase.convertedPrice)
									: total;
							}, 0)
						).toFixed(2);
					}),
					backgroundColor: [
						'rgba(54, 162, 235, 1)',
						'rgba(255, 99, 132, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(96, 113, 150, 1)',
						'rgba(105, 153, 93, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 149, 110, 1)',
						'rgb(64, 99, 255)',
						'rgba(221, 80, 74, 1)',
						'rgb(14, 167, 9)',
						'rgb(255, 199, 89)',
					],
					hoverOffset: 4,
				},
			],
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPurchases]);

	const changeSearchMonth = (month) => {
		setSearchMonth(month);
	};

	const changeSearchYear = (e) => {
		setSearchYear(parseInt(e.target.value));
	};

	const resetDate = () => {
		setSearchMonth(new Date().getMonth() + 1);
		setSearchYear(new Date().getFullYear());
	};

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content monthly-page">
				<div className="graph-container monthly-graph-container">
					<Doughnut height={100} width={100} data={chartData} options={{ maintainAspectRatio: isMobileDevice }} />
				</div>
				<div className="form-and-purchases">
					<MonthForm
						allPurchases={allPurchases}
						changeSearchMonth={changeSearchMonth}
						changeSearchYear={changeSearchYear}
						resetDate={resetDate}
						searchYear={searchYear}
						searchMonth={searchMonth}
					/>

					{selectedPurchases?.length > 0 && <PurchasesContainer purchases={selectedPurchases} renderButtons={false} />}
				</div>
			</main>
		</>
	);
}
