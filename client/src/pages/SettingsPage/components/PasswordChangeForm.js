import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PasswordInput from '../../../components/PasswordInput';

export default function PasswordChangeForm() {
	const [newPassword, setNewPassword] = useState('');
	const [passwordFormVisible, setPasswordFormVisible] = useState(false);

	const [interacted, setInteracted] = useState({
		newPassword: false,
		confirmPassword: false,
	});

	const handleNewPasswordChange = (e) => {
		setInteracted({ ...interacted, [e.target.name]: true });
		setNewPassword(e.target.value);
	};

	const handleNewPasswordSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="settings-group">
			<h3 className="settings-group-title">Change Your Password</h3>
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
		</div>
	);
}
