import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
	// search parameters
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submitting form');
	};

	return (
		<div className="container search-form__container">
			<div className="search-form__title">Search Transactions</div>
			<form className="search-form__form" onSubmit={handleSubmit}></form>
		</div>
	);
}
