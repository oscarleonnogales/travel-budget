import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase, updatePurchase } from '../../redux/actions/purchases';
import { setError, clearError } from '../../redux/actions/error';
import { setCurrentId } from '../../redux/actions/currentId';
import './PurchaseForm.css';

export default function PurchaseForm() {
	const currentId = useSelector((state) => state.currentId);
	const purchases = useSelector((state) => state.purchases);
	const currencyOptions = useSelector((state) => state.currencyOptions);
	const userSettings = useSelector((state) => state.userSettings);
	const dispatch = useDispatch();

	const [currentData, setCurrentData] = useState({
		date: '',
		description: '',
		categoryId: '',
		amount: '',
		currency: userSettings?.defaultCurrency,
	});

	useEffect(() => {
		const selectedPurchase = purchases.find((p) => p._id === currentId);
		if (currentId) setCurrentData({ ...selectedPurchase, categoryId: selectedPurchase.category.categoryId });
	}, [currentId, purchases]);

	const handleChange = (e) => {
		setCurrentData({ ...currentData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!currentData.date ||
			!currentData.description ||
			!currentData.categoryId ||
			!currentData.amount ||
			!currentData.currency
		) {
			dispatch(setError('Please complete the form'));
			return;
		}
		if (currentId) {
			dispatch(updatePurchase(currentId, currentData));
		} else {
			dispatch(addPurchase(currentData));
		}
		dispatch(clearError());
		clearForm();
	};

	const clearForm = () => {
		dispatch(setCurrentId(null));
		dispatch(clearError());
		setCurrentData({
			date: '',
			description: '',
			amount: '',
			currency: userSettings?.defaultCurrency,
			categoryId: '',
		});
	};

	return (
		<form onSubmit={handleSubmit} className="purchase-form_container">
			<h3 className="purchase-form_title">{currentId ? 'Edit' : 'Add'} Purchase</h3>
			<div className="form-column">
				<div className="purchase-form-group">
					<label htmlFor="date" className="purchase-form-label">
						Date
					</label>
					<input
						type="date"
						name="date"
						value={currentData.date && dayjs(currentData.date).format('YYYY-MM-DD')}
						onChange={handleChange}
						required
						className="purchase-form-input"
					></input>
				</div>
				<div className="purchase-form-group">
					<label htmlFor="description" className="purchase-form-label">
						Description
					</label>
					<input
						type="text"
						name="description"
						value={currentData?.description}
						onChange={handleChange}
						required
						className="purchase-form-input"
					></input>
				</div>
				<div className="purchase-form-group">
					<label htmlFor="category" className="purchase-form-label">
						Category
					</label>
					<div className="custom-select">
						<select
							htmlFor="categoryId"
							name="categoryId"
							value={currentData?.categoryId || 'unselected'}
							onChange={handleChange}
							required
							className="purchase-form-input form-select"
						>
							<option value="unselected" disabled>
								Choose an option
							</option>
							{userSettings?.categories?.map((category) => (
								<option key={category.categoryId} value={category.categoryId}>
									{category.categoryName}
								</option>
							))}
						</select>
						<span className="custom-arrow"></span>
					</div>
				</div>
			</div>
			<div className="form-column">
				<div className="purchase-form-group">
					<label htmlFor="currency" className="purchase-form-label">
						Currency
					</label>
					<div className="custom-select">
						<select
							htmlFor="currency"
							name="currency"
							value={currentData?.currency}
							onChange={handleChange}
							required
							className="purchase-form-input form-select"
						>
							<option value="unselected" disabled>
								Choose an option
							</option>
							{currencyOptions?.map((currency) => (
								<option value={currency} key={currency}>
									{currency}
								</option>
							))}
						</select>
						<span className="custom-arrow"></span>
					</div>
				</div>
				<div className="purchase-form-group">
					<label htmlFor="amount" className="purchase-form-label">
						Amount
					</label>
					<input
						type="number"
						name="amount"
						step="0.01"
						value={currentData?.amount}
						onChange={handleChange}
						min="0"
						required
						className="purchase-form-input"
					></input>
				</div>
			</div>
			<div className="purchase-form-btn-container">
				<button type="submit" className="save-btn form-btn">
					{currentId ? 'Save Changes' : 'Add Purchase'}
				</button>
				<button onClick={clearForm} className="cancel-btn form-btn">
					{currentId ? 'Cancel' : 'Clear Form'}
				</button>
			</div>
		</form>
	);
}
