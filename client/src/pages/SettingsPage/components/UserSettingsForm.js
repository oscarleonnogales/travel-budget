import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function UserSettingsForm() {
	const dispatch = useDispatch();
	const userSettings = useSelector((state) => state.userSettings);
	const currencyOptions = useSelector((state) => state.currencyOptions);

	const [settingsFormVisible, setSettingsFormVisible] = useState(false);
	const [newUserSettings, setNewUserSettings] = useState(userSettings);

	const handleSettingsChange = (e) => {
		setNewUserSettings({ ...newUserSettings, [e.target.name]: e.target.value });
	};

	const handleSettingsSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="settings-group">
			<h3 className="settings-group-title">Organizing Your Purchases</h3>
			<form onSubmit={handleSettingsSubmit} className="settings-group-form">
				<div className="settings-form-group">
					<label htmlFor="defaultCurrency">Home Currency</label>
					<div className="custom-select">
						<select
							htmlFor="defaultCurrency"
							name="defaultCurrency"
							value={newUserSettings?.defaultCurrency}
							onChange={handleSettingsChange}
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
				<div className="settings-form-group">
					<label htmlFor="categories">Purchase Categories</label>
				</div>
				<button type="submit">Save Changes</button>
			</form>
		</div>
	);
}
