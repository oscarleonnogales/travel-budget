import React, { useState, useEffect } from 'react';
import PurchaseForm from './components/PurchaseForm/PurchaseForm';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getPurchases } from '../../redux/actions/purchases';
import './PurchasesPage.css';
import PaginationButtons from './components/PaginationButtons';
import PurchasesContainer from './components/Purchase/PurchasesContainer/PurchasesContainer';

export default function PurchasesPage() {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);
	const allPurchases = useSelector((state) => state.purchases);

	const [currentPage, setCurrentPage] = useState(1);
	const [startIndex, setStartIndex] = useState();
	const [endIndex, setEndIndex] = useState();
	const [currentPurchases, setCurrentPurchases] = useState({});

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch, authData]);

	useEffect(() => {
		allPurchases.sort((a, b) => {
			return a.date < b.date; //GOOD
		});
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
				<ErrorMessage />
				<PurchaseForm />
				{currentPurchases?.length > 0 && <PurchasesContainer purchases={currentPurchases} renderButtons={true} />}
				<PaginationButtons
					startIndex={startIndex}
					endIndex={endIndex}
					allPurchases={allPurchases}
					increasePage={increasePage}
					decreasePage={decreasePage}
				/>
			</main>
		</>
	);
}
