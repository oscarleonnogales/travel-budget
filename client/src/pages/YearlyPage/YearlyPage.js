import React from 'react';
import './YearlyPage.css';
// import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';

export default function YearlyPage() {
	// const allPurchases = useSelector((state) => state.allPurchases);

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content"></main>
		</>
	);
}
