import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function YearDemo() {
	const yearChartData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June'],
		datasets: [
			{
				data: [2450, 2500, 1950, 2600, 2450, 3000],
				backgroundColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(96, 113, 150, 1)',
					'rgba(105, 153, 93, 1)',
					'rgba(75, 192, 192, 1)',
				],
				hoverOffset: 4,
			},
		],
	};
	return (
		<div className="landing-page__demo-right">
			<div className="image-container">
				<Bar
					height={100}
					width={100}
					data={yearChartData}
					options={{
						maintainAspectRatio: true,
						scales: {
							yAxes: [
								{
									ticks: {
										beginAtZero: true,
										min: 0,
									},
								},
							],
						},
					}}
				/>
			</div>
			<div className="landing-page__section-text">
				<h3 className="landing-page__subtitle">Yearly Summary</h3>
				<p className="landing-page__section-description">
					Summarizes your totals across the year. The yearly report tracks how much you spent in each category across
					every month.
				</p>
			</div>
		</div>
	);
}
