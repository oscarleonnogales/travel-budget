import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function MonthDemo() {
	const monthChartData = {
		labels: ['Housing', 'Groceries', 'Transportation', 'Entertainment', 'Luxuries', 'Restaurants/Takeout'],
		datasets: [
			{
				data: [850, 250, 250, 150, 100, 180],
				backgroundColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(96, 113, 150, 1)',
					'rgba(105, 153, 93, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
				hoverOffset: 4,
			},
		],
	};

	return (
		<div className="landing-page__demo-left">
			<div className="landing-page__section-text">
				<h3 className="landing-page__subtitle">Monthly Breakdowns</h3>
				<p className="landing-page__section-description">
					See exactly where your money's going with detailed reports and an interactive graph.
				</p>
			</div>
			<div className="image-container">
				<Doughnut height={100} width={100} data={monthChartData} options={{ maintainAspectRatio: true }} />
			</div>
		</div>
	);
}
