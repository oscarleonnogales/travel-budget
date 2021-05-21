import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './YearlyPage.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../redux/actions/purchases';
import Navbar from '../../components/Navbar/Navbar';
import { Bar } from 'react-chartjs-2';
import YearForm from './components/YearForm';
import { ViewPortContext } from '../../App';
import YearReport from './components/YearReport';
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

export default function YearlyPage() {
	const dispatch = useDispatch();
	const { isMobileDevice } = useContext(ViewPortContext);
	const allPurchases = useSelector((state) => state.purchases);
	const userSettings = useSelector((state) => state.userSettings);
	const [chartData, setChartData] = useState({});
	const [uniqueYears, setUniqueYears] = useState([]);
	const [reducedTotals, setReducedTotals] = useState([]);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const [selectedPurchases, setSelectedPurchases] = useState(allPurchases);
	const [reportDetails, setReportDetails] = useState({});

	// Not Correctly setting when year changes
	// useEffect(() => {
	// 	console.log(chartData);
	// }, [chartData]);

	useEffect(() => {
		const newUniqueYears = [];
		[...allPurchases].forEach((purchase) => {
			const year = dayjs.utc(purchase.date).format('YYYY');
			if (!newUniqueYears.includes(year)) newUniqueYears.push(year);
		});
		setUniqueYears(newUniqueYears);
	}, [allPurchases]);

	useEffect(() => {
		setSelectedPurchases(allPurchases.filter((p) => dayjs.utc(p.date).format('YYYY') === `${selectedYear}`));
	}, [selectedYear, allPurchases]);

	useEffect(() => {
		function getMonthlyTotals(monthName) {
			const monthNamePurchases = selectedPurchases.filter((p) => dayjs.utc(p.date).format('MMMM') === monthName);
			let totals = [...userSettings.categories].map((category) => {
				return {
					category: category.categoryName,
					total: parseFloat(
						monthNamePurchases.reduce((total, purchase) => {
							return purchase.category.categoryId === category.categoryId ? (total += purchase.convertedPrice) : total;
						}, 0)
					).toFixed(2),
				};
			});
			totals = totals.filter((category) => Number(category.total) !== 0);
			totals = totals.sort((a, b) => Number(a.total) < Number(b.total));
			return totals;
		}
		setReportDetails(
			monthNames.map((month) => ({
				monthName: month,
				summary: getMonthlyTotals(month),
			}))
		);
	}, [selectedPurchases, userSettings.categories]);

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	useEffect(() => {
		const newData = monthNames.map((month) => {
			return parseFloat(
				selectedPurchases.reduce((total, purchase) => {
					const purchaseMonth = dayjs.utc(purchase.date).format('MMMM');
					const purchaseYear = dayjs.utc(purchase.date).format('YYYY');

					return purchaseMonth === month && parseInt(purchaseYear) === selectedYear
						? (total += purchase.convertedPrice)
						: total;
				}, 0)
			).toFixed(2);
		});
		setReducedTotals(newData);
	}, [selectedPurchases, selectedYear]);

	useEffect(() => {
		setChartData({
			labels: monthNames,
			datasets: [
				{
					label: `${selectedYear} Summary`,
					data: reducedTotals,
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
	}, [reducedTotals, selectedYear]);

	const handleChange = (e) => {
		setSelectedYear(e.target.value);
	};

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content yearly-page">
				<div className="year-graph-container container">
					<Bar height={100} width={100} data={chartData} options={{ maintainAspectRatio: isMobileDevice }} />
				</div>
				<YearForm handleChange={handleChange} selectedYear={selectedYear} uniqueYears={uniqueYears} />
				<YearReport reportDetails={reportDetails} />
			</main>
		</>
	);
}
