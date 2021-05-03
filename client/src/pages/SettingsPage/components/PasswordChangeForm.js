import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PasswordInput from '../../../components/PasswordInput';
import FormHeader from './FormHeader';

export default function PasswordChangeForm() {
	const [newPassword, setNewPassword] = useState('');
	const [passwordFormVisible, setPasswordFormVisible] = useState(false);

	const [interacted, setInteracted] = useState({
		newPassword: false,
		confirmPassword: false,
	});

	const changeVisibility = () => {
		setPasswordFormVisible(!passwordFormVisible);
	};

	const handleNewPasswordChange = (e) => {
		setInteracted({ ...interacted, [e.target.name]: true });
		setNewPassword(e.target.value);
	};

	const handleNewPasswordSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="settings-group">
			<FormHeader title={'Change Your Password'} visible={passwordFormVisible} changeVisibility={changeVisibility} />
			{passwordFormVisible && (
				<form onSubmit={handleNewPasswordSubmit} className="settings-group-form">
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
			)}
		</div>
	);
}
