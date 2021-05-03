import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormHeader from './FormHeader';

export default function PersonInformationForm() {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);

	const [personalInfoFormVisible, setPersonalInfoFormVisible] = useState(false);
	const [personalInformation, setPersonalInformation] = useState({
		firstName: authData?.user?.firstName || authData?.user?.givenName,
		lastName: authData?.user?.lastName || authData?.user?.familyName,
	});

	const changeVisibility = () => {
		setPersonalInfoFormVisible(!personalInfoFormVisible);
	};

	const handlePersonalInfoSubmit = (e) => {
		e.preventDefault();
	};

	const handlePersonalInfoChange = (e) => {
		setPersonalInformation({ ...personalInformation, [e.target.name]: e.target.value });
	};

	return (
		<div className="settings-group">
			<FormHeader
				title={'Personal Information'}
				visible={personalInfoFormVisible}
				changeVisibility={changeVisibility}
			/>
			{personalInfoFormVisible && (
				<form onSubmit={handlePersonalInfoSubmit} className="settings-group-form">
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
			)}
		</div>
	);
}
