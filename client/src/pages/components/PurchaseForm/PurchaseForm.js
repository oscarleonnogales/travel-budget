import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase, updatePurchase } from '../../../actions/purchases';
import { setCurrentId } from '../../../actions/currentId';
import './PurchaseForm.css';

export default function PurchaseForm() {
	const [currentData, setCurrentData] = useState({
		date: '',
		description: '',
		category: '',
		amount: '',
		currency: '',
	});
	const currentId = useSelector((state) => state.currentId);
	const purchases = useSelector((state) => state.purchases);

	const dispatch = useDispatch();

	useEffect(() => {
		if (currentId) setCurrentData(purchases.find((p) => p._id === currentId));
	}, [currentId, purchases]);

	function handleChange(e) {
		setCurrentData({ ...currentData, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePurchase(currentId, currentData));
		} else {
			dispatch(addPurchase(currentData));
		}
		clearForm();
	}

	function clearForm() {
		dispatch(setCurrentId(null));
		setCurrentData({
			date: '',
			description: '',
			amount: '',
			currency: '',
			category: '',
		});
	}

	return (
		<form onSubmit={handleSubmit} className="transaction-form_container">
			<h3 className="transaction-form_title">{currentId ? 'Edit' : 'Add'} Purchase</h3>
			<div className="form-column">
				<div className="transaction-form-group">
					<label htmlFor="date" className="transaction-form-label">
						Date
					</label>
					<input
						type="date"
						name="date"
						value={currentData.date && dayjs(currentData.date).format('YYYY-MM-DD')}
						onChange={handleChange}
						required
						className="transaction-form-input"
					></input>
				</div>

				<div className="transaction-form-group">
					<label htmlFor="description" className="transaction-form-label">
						Description
					</label>
					<input
						type="text"
						name="description"
						value={currentData?.description}
						onChange={handleChange}
						required
						className="transaction-form-input"
					></input>
				</div>

				<div className="transaction-form-group">
					<label htmlFor="category" className="transaction-form-label">
						Category
					</label>
					<select
						htmlFor="category"
						name="category"
						value={currentData?.category}
						onChange={handleChange}
						required
						className="transaction-form-input form-select"
					>
						<option value="unselected" disabled>
							Choose an option
						</option>
						<option value="other">Other</option>
						<option value="housing">Housing</option>
						<option value="groceries">Groceries</option>
						<option value="food">Food</option>
						<option value="transportation">Transportation</option>
						<option value="luxuries">Luxuries</option>
					</select>
				</div>
			</div>

			<div className="form-column">
				<div className="transaction-form-group">
					<label htmlFor="amount" className="transaction-form-label">
						Amount
					</label>
					<input
						type="number"
						name="amount"
						step="0.01"
						value={currentData?.amount}
						onChange={handleChange}
						required
						className="transaction-form-input"
					></input>
				</div>

				<div className="transaction-form-group">
					<label htmlFor="currency" className="transaction-form-label">
						Currency
					</label>
					<input
						type="text"
						name="currency"
						value={currentData?.currency}
						onChange={handleChange}
						required
						className="transaction-form-input"
					></input>
				</div>
			</div>
			<div className="transaction-form-btn-container">
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
