import React, { useState, useEffect } from 'react';
import './SettingsPage.css';
import Navbar from '../../components/Navbar/Navbar';
import { updateUserSettings } from '../../redux/actions/userSettings';
import { useSelector, useDispatch } from 'react-redux';
import PasswordInput from '../../components/PasswordInput';

export default function SettingsPage() {
	const dispatch = useDispatch();
	const userSettings = useSelector((state) => state.userSettings);
	const authData = useSelector((state) => state.authData);
	const currencyOptions = useSelector((state) => state.currencyOptions);

	const [personalInformation, setPersonalInformation] = useState({
		firstName: authData?.user?.firstName || authData?.user?.givenName,
		lastName: authData?.user?.lastName || authData?.user?.familyName,
	});

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	const [newUserSettings, setNewUserSettings] = useState(userSettings);
	const [newPassword, setNewPassword] = useState('');

	const [interacted, setInteracted] = useState({
		newPassword: false,
		confirmPassword: false,
	});

	useEffect(() => {
		console.log(newPassword);
	}, [newPassword]);

	const handleShowPassword = () => {
		setPasswordIsVisible(!passwordIsVisible);
	};

	const handlePersonalInfoChange = (e) => {
		setPersonalInformation({ ...personalInformation, [e.target.name]: e.target.value });
	};

	const handleSettingsChange = (e) => {
		setNewUserSettings({ ...newUserSettings, [e.target.name]: e.target.value });
	};

	const handleNewPasswordChange = (e) => {
		setInteracted({ ...interacted, [e.target.name]: true });
		setNewPassword(e.target.value);
	};

	const handlePersonalInfoSubmit = (e) => {
		e.preventDefault();
	};

	const handleSettingsSubmit = (e) => {
		e.preventDefault();
	};

	const handleNewPasswordSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<div className="settings-group">
					<h3 className="settings-group-title">Personal Information</h3>
					<form onSubmit={handlePersonalInfoSubmit}>
						<div className="settings-form-group">
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								name="firstName"
								onChange={handlePersonalInfoChange}
								value={personalInformation.firstName}
							></input>
						</div>
						<div className="settings-form-group">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								name="lastName"
								onChange={handlePersonalInfoChange}
								value={personalInformation.lastName}
							></input>
						</div>
						<button type="submit">Save Changes</button>
					</form>
				</div>
				<div className="settings-group">
					<h3 className="settings-group-title">Organizing Your Purchases</h3>
					<form onSubmit={handleSettingsSubmit}>
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
				{/* Only show this option to JWT users */}
				{authData?.user?.givenName && (
					<div className="settings-group">
						<h3 className="settings-group-title">Change Your Password</h3>
						<form onSubmit={handleNewPasswordSubmit}>
							<div className="settings-form-group">
								<label htmlFor="oldPassword">Old Password</label>
								<input type="password" name="oldPassword" />
							</div>
							<div className="settings-form-group">
								<label htmlFor="newPassword">New Password</label>
								<PasswordInput
									name={'newPassword'}
									password={newPassword}
									interacted={interacted.newPassword}
									handleChange={handleNewPasswordChange}
								/>
							</div>
							<div className="settings-form-group">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input type="password" name="confirmPassword" />
							</div>
							<button type="submit">Save Changes</button>
						</form>
					</div>
				)}
			</main>
		</>
	);
}
