import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeName } from '../../../redux/actions/auth';
import { MessageContext } from '../SettingsPage';

import FormHeader from './FormHeader';

export default function PersonInformationForm() {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);
	const error = useSelector((state) => state.error);
	const { changeMessage } = useContext(MessageContext);

	const [personalInfoFormVisible, setPersonalInfoFormVisible] = useState(false);
	const [personalInformation, setPersonalInformation] = useState({
		firstName: authData?.user?.firstName || authData?.user?.givenName,
		lastName: authData?.user?.lastName || authData?.user?.familyName,
	});

	const changeVisibility = () => {
		setPersonalInfoFormVisible(!personalInfoFormVisible);
	};

	const handlePersonalInfoSubmit = async (e) => {
		e.preventDefault();
		dispatch(changeName(personalInformation));
		if (error === null) changeMessage('Your name has been changed successfully');
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
							required
						/>
					</div>
					<div className="settings-form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							name="lastName"
							onChange={handlePersonalInfoChange}
							value={personalInformation.lastName}
							required
						/>
					</div>
					<button type="submit">Save Changes</button>
				</form>
			)}
		</div>
	);
}
