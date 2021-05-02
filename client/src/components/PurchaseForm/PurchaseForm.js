import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase, updatePurchase } from '../../redux/actions/purchases';
import { setCurrentId } from '../../redux/actions/currentId';
import './PurchaseForm.css';

export default function PurchaseForm() {
	const [currentData, setCurrentData] = useState({
		date: '',
		description: '',
		category: 'other',
		amount: '',
		currency: 'USD',
	});
	const currentId = useSelector((state) => state.currentId);
	const purchases = useSelector((state) => state.purchases);
	const currencyOptions = useSelector((state) => state.currencyOptions);

	const dispatch = useDispatch();

	useEffect(() => {
		if (currentId) setCurrentData(purchases.find((p) => p._id === currentId));
	}, [currentId, purchases]);

	const handleChange = (e) => {
		setCurrentData({ ...currentData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePurchase(currentId, currentData));
		} else {
			dispatch(addPurchase(currentData));
		}
		clearForm();
	};

	const clearForm = () => {
		dispatch(setCurrentId(null));
		setCurrentData({
			date: '',
			description: '',
			amount: '',
			currency: 'USD',
			category: 'other',
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
							htmlFor="category"
							name="category"
							value={currentData?.category}
							onChange={handleChange}
							required
							className="purchase-form-input form-select"
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
						<span className="custom-arrow"></span>
					</div>
				</div>
			</div>

			<div className="form-column">
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
