import React, { useState, useEffect } from 'react';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getPurchases } from '../../redux/actions/purchases';
import PaginationButtons from '../../components/PaginationButtons';
import PurchasesContainer from '../../components/PurchasesContainer/PurchasesContainer';
import SearchForm from './components/SearchForm/SearchForm';
import './SearchPage.css';

export default function SearchPage() {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);
	const allPurchases = useSelector((state) => state.purchases);

	const [currentPage, setCurrentPage] = useState(1);
	const [startIndex, setStartIndex] = useState();
	const [endIndex, setEndIndex] = useState();
	const [filteredPurchases, setFilteredPurchases] = useState({});

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch, authData]);

	useEffect(() => {
		setEndIndex(currentPage * 10);
		setStartIndex((currentPage - 1) * 10);

		setFilteredPurchases(allPurchases.slice(startIndex, endIndex));
	}, [allPurchases, currentPage, endIndex, startIndex]);

	const decreasePage = () => {
		setCurrentPage((currentPage) => currentPage - 1);
	};

	const increasePage = () => {
		setCurrentPage((currentPage) => currentPage + 1);
	};
	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<ErrorMessage />
				{/* <PurchaseForm /> */}
				<SearchForm />
				{filteredPurchases?.length > 0 && <PurchasesContainer purchases={filteredPurchases} renderButtons={true} />}
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
