import React, { useState, useEffect } from 'react';
import Purchase from '../components/Purchase/Purchase';
import PurchaseForm from '../components/PurchaseForm/PurchaseForm';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../../actions/purchases';
import { useSelector } from 'react-redux';
import './PurchasesPage.css';

export default function PurchasesPage() {
	const dispatch = useDispatch();
	const allPurchases = useSelector((state) => state.purchases);

	const [currentPage, setCurrentPage] = useState(1);
	const [startIndex, setStartIndex] = useState();
	const [endIndex, setEndIndex] = useState();
	const [currentPurchases, setCurrentPurchases] = useState({});

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	useEffect(() => {
		setEndIndex(currentPage * 10);
		setStartIndex((currentPage - 1) * 10);

		setCurrentPurchases(allPurchases.slice(startIndex, endIndex));
	}, [allPurchases, currentPage, endIndex, startIndex]);

	function decreasePage() {
		setCurrentPage((currentPage) => currentPage - 1);
	}

	function increasePage() {
		setCurrentPage((currentPage) => currentPage + 1);
	}

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<PurchaseForm />
				{currentPurchases.length > 0 && (
					<div className="purchases-container">
						{currentPurchases.map((purchase) => {
							return <Purchase purchase={purchase} renderButtons={true} key={purchase._id} />;
						})}
					</div>
				)}
				<div className="pagination-btns-container">
					{startIndex > 0 && (
						<button className="pagination-btn" onClick={() => decreasePage()}>
							Previous
						</button>
					)}
					{endIndex < allPurchases.length && (
						<button className="pagination-btn" onClick={() => increasePage()}>
							Next
						</button>
					)}
				</div>
			</main>
		</>
	);
}
