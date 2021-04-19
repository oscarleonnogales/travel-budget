import React from 'react';
import Purchase from '../components/Purchase/Purchase';
import PurchaseForm from '../components/PurchaseForm/PurchaseForm';
import Navbar from '../components/Navbar/Navbar';

import { useSelector } from 'react-redux';
import './PurchasesPage.css';

export default function PurchasesPage() {
	const purchases = useSelector((state) => state.purchases);

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<PurchaseForm />
				{purchases.length > 0 && (
					<div className="transactions-container">
						{purchases.map((purchase) => {
							return <Purchase purchase={purchase} key={purchase._id} />;
						})}
					</div>
				)}
			</main>
		</>
	);
}
