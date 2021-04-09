import React from 'react';
import './ReportsPage.css';
// import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';

export default function ReportsPage() {
	// const transactions = useSelector((state) => state.transactions);

	return (
		<>
			<Navbar></Navbar>
			<main>
				<div className="reports__current-month-container"></div>
				<div className="reports__current-year-container"></div>
				<div className="reports__current-year-container"></div>
			</main>
		</>
	);
}
