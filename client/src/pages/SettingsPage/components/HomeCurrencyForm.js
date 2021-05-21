import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDefaultCurrency } from '../../../redux/actions/userSettings';
import FormHeader from './FormHeader';
import { MessageContext } from '../SettingsPage';

export default function HomeCurrencyForm() {
	const dispatch = useDispatch();
	const userSettings = useSelector((state) => state.userSettings);
	const currencyOptions = useSelector((state) => state.currencyOptions);
	const error = useSelector((state) => state.error);

	const [settingsFormVisible, setSettingsFormVisible] = useState(false);
	const [newCurrency, setNewCurrency] = useState(userSettings.defaultCurrency);

	const { changeMessage } = useContext(MessageContext);

	const changeVisibility = () => {
		setSettingsFormVisible(!settingsFormVisible);
	};

	const handleCurrencyChange = (e) => {
		setNewCurrency(e.target.value);
	};

	const handleSettingsSubmit = (e) => {
		e.preventDefault();
		if (currencyOptions.defaultCurrency === newCurrency) return;
		dispatch(changeDefaultCurrency(newCurrency));
		if (error === null) changeMessage(`Home currency set to ${newCurrency}`);
	};

	return (
		<div className="container settings-group">
			<FormHeader title={'Home Currency'} visible={settingsFormVisible} changeVisibility={changeVisibility} />
			{settingsFormVisible && (
				<form onSubmit={handleSettingsSubmit} className="settings-group-form">
					<div className="settings-form-group">
						<label htmlFor="defaultCurrency" className="settings-form-label">
							Home Currency
						</label>
						<div className="custom-select">
							<select
								htmlFor="defaultCurrency"
								name="defaultCurrency"
								value={newCurrency}
								onChange={handleCurrencyChange}
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
					<button type="submit" className="primary-btn settings-form-btn">
						Save Changes
					</button>
				</form>
			)}
		</div>
	);
}
