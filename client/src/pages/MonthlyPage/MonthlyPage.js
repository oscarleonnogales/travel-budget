import './MonthlyPage.css';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
// import { useSelector } from 'react-redux';
// const allPurchases = useSelector((state) => state.allPurchases);

export default function MonthlyPage() {
	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content"></main>
		</>
	);
}
