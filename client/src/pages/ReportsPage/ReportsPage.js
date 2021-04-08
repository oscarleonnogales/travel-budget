import React from 'react';
import './ReportsPage.css';
import { useSelector } from 'react-redux';

export default function ReportsPage() {
	const transactions = useSelector((state) => state.transactions);

	return (
		<>
			<div className="reports__current-month-container"></div>
			<div className="reports__current-year-container"></div>
			<div className="reports__current-year-container"></div>
		</>
	);
}
