import React, { useState, useContext } from 'react';
import PasswordInput from '../../../components/PasswordInput';
import { changePassword } from '../../../API';
import FormHeader from './FormHeader';
import { MessageContext } from '../SettingsPage';
import { useDispatch, useSelector } from 'react-redux';
import { setError, clearError } from '../../../redux/actions/error';

export default function PasswordChangeForm() {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);
	const { changeMessage } = useContext(MessageContext);
	const [passwordForm, setPasswordForm] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [interacted, setInteracted] = useState({
		oldPassword: false,
		newPassword: false,
		confirmPassword: false,
	});
	const [passwordFormVisible, setPasswordFormVisible] = useState(false);

	const changeVisibility = () => {
		setPasswordFormVisible(!passwordFormVisible);
	};

	const handleChange = (e) => {
		setInteracted({ ...interacted, [e.target.name]: true });
		setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (passwordForm.oldPassword.length < 6 || passwordForm.newPassword.length < 6) {
			dispatch(setError('Please complete the password form'));
			return;
		}
		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			dispatch(setError('Passwords do not match'));
			return;
		}
		dispatch(clearError());
		const response = await changePassword(passwordForm);

		if (response.success) {
			if (error === null) changeMessage('Your password has been changed');
			setPasswordForm({
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
			});
		} else {
			dispatch(setError(response.message));
		}
	};

	return (
		<div className="container settings-group">
			<FormHeader title={'Change Your Password'} visible={passwordFormVisible} changeVisibility={changeVisibility} />
			{passwordFormVisible && (
				<form onSubmit={handleSubmit} className="settings-group-form">
					<div className="settings-form-group">
						<label htmlFor="oldPassword">Old Password</label>
						<input type="password" name="oldPassword" onChange={handleChange} required />
					</div>
					<div className="settings-form-group">
						<label htmlFor="newPassword">New Password</label>
						<PasswordInput
							name={'newPassword'}
							password={passwordForm.newPassword}
							interacted={interacted.newPassword}
							handleChange={handleChange}
						/>
					</div>
					<div className="settings-form-group">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input type="password" name="confirmPassword" onChange={handleChange} required />
					</div>
					<button type="submit">Save Changes</button>
				</form>
			)}
		</div>
	);
}
