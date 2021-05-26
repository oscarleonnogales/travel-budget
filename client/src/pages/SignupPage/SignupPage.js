import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { googleLogIn, signUp } from '../../redux/actions/auth';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { setError, clearError } from '../../redux/actions/error';
import { checkEmailUniqueness, createGoogleUser } from '../../API';
import { fetchUserSettings } from '../../redux/actions/userSettings';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import './SignupPage.css';
import PasswordInput from '../../components/PasswordInput';

export default function SignupPage() {
	const dispatch = useDispatch();
	const history = useHistory();

	const userSettings = useSelector((state) => state.userSettings);
	const authData = useSelector((state) => state.authData);
	const error = useSelector((state) => state.error);
	const currencyOptions = useSelector((state) => state.currencyOptions);

	const [isLoading, setIsLoading] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		currency: 'USD',
		password: '',
		confirmPassword: '',
	});
	const [interacted, setInteracted] = useState({
		firstName: false,
		lastName: false,
		email: false,
		currency: false,
		password: false,
		confirmPassword: false,
	});

	const emailTakenErrorMessage = `There's already an account associated with that email address.`;
	const googleErrorMessage = `It's not recommended to sign up manually with a Google account. Please click the Google button to continue instead.`;

	useEffect(() => {
		const emailErrorMessage = `There's already an account associated with that email address.`;
		if (
			formData.password === formData.confirmPassword &&
			formData.confirmPassword.length > 0 &&
			!error &&
			formData.password.length > 6 &&
			validateEmail(formData.email) &&
			error !== emailErrorMessage &&
			formData.lastName.length > 0 &&
			formData.firstName.length > 0
		)
			setIsFormValid(true);
		else setIsFormValid(false);
	}, [formData, error]);

	useEffect(() => {
		if (authData?.token?.length >= 500) {
			async function fetchGoogleUserPreferences() {
				let email = authData?.user?.email;
				if (await checkEmailUniqueness(email)) await createGoogleUser(email);
				dispatch(fetchUserSettings());
			}
			fetchGoogleUserPreferences();
		} else if (authData?.user) {
			dispatch(fetchUserSettings());
		}
		dispatch(clearError());
	}, [authData, dispatch]);

	useEffect(() => {
		if (userSettings?.defaultCurrency) {
			setIsLoading(false);
			history.push('/purchases');
		}
	}, [userSettings, history]);

	const onSuccess = async (res) => {
		setIsLoading(true);
		const user = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch(googleLogIn(user, token));
		} catch (error) {
			console.log(error);
		}
	};

	const onFailure = () => {
		setIsLoading(false);
		dispatch(setError('Error with Google login. Please try again later.'));
	};

	const handleChange = (e) => {
		setInteracted({ ...interacted, [e.target.name]: true });
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (isFormValid) {
			dispatch(clearError());
			dispatch(signUp(formData));
		} else {
			setIsLoading(false);
			dispatch(setError('Please fill out all the necessary information.'));
		}
	};

	const validateEmail = (email) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(String(email).toLowerCase());
	};

	const ensureEmailIsUnique = async (email) => {
		const errorMessage = `There's already an account associated with that email address.`;
		if (!(await checkEmailUniqueness(email))) {
			dispatch(setError(errorMessage));
		} else {
			if (error === errorMessage) dispatch(clearError());
		}
	};

	const ensureEmailIsNotGoogle = (email) => {
		const regex = /^[\w.+-]+@g(oogle)?mail\.com$/;
		if (regex.test(String(email).toLocaleLowerCase())) {
			dispatch(setError(googleErrorMessage));
		} else {
			if (error === googleErrorMessage) dispatch(clearError());
		}
	};

	const handleEmailChange = (e) => {
		handleChange(e);
		if (validateEmail(e.target.value)) {
			ensureEmailIsUnique(e.target.value);
			ensureEmailIsNotGoogle(e.target.value);
		}
	};

	if (isLoading) return <LoadingAnimation />;

	return (
		<div className="signup-page-container">
			{/* <LoadingAnimation /> */}
			<ErrorMessage renderCloseButton={false} />
			<h1 className="page-header">Sign up Today</h1>
			<form className="signup-form-container" onSubmit={handleSubmit}>
				<div className="auth-form-group">
					<label htmlFor="firstName" className="auth-form-label">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						className={`auth-form-input ${formData.firstName.length === 0 && interacted.firstName ? 'invalid' : ''} ${
							formData.firstName.length > 0 ? 'valid' : ''
						}`}
						required
						value={formData.firstName}
						onChange={handleChange}
					></input>
					<div className="auth-form-error">Please fill out your first name</div>
				</div>
				<div className="auth-form-group">
					<label htmlFor="lastName" className="auth-form-label">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						className={`auth-form-input ${formData.lastName.length === 0 && interacted.lastName ? 'invalid' : ''} ${
							formData.lastName.length > 0 ? 'valid' : ''
						}`}
						required
						value={formData.lastName}
						onChange={handleChange}
					></input>
					<div className="auth-form-error">Please fill out your last name</div>
				</div>
				<div className="auth-form-group">
					<label htmlFor="email" className="auth-form-label">
						Email
					</label>
					<input
						type="email"
						name="email"
						className={`auth-form-input ${
							(formData.email.length === 0 && interacted.email) ||
							(formData.email.length > 0 && !validateEmail(formData.email)) ||
							error === googleErrorMessage ||
							error === emailTakenErrorMessage
								? 'invalid'
								: ''
						} ${validateEmail(formData.email) ? 'valid' : ''}`}
						required
						value={formData.email}
						onChange={handleEmailChange}
					></input>
					<div className="auth-form-error">Invalid email address</div>
				</div>
				<div className="auth-form-group">
					<label htmlFor="currency" className="auth-form-label">
						Home Currency
					</label>
					<div className="custom-select">
						<select
							htmlFor="currency"
							name="currency"
							value={formData.currency || 'USD'}
							onChange={handleChange}
							className="purchase-form-input form-select"
						>
							<option value="unselected" disabled>
								Choose an option
							</option>
							{currencyOptions?.map((currency) => (
								<option key={currency} value={currency}>
									{currency}
								</option>
							))}
						</select>
						<span className="custom-arrow"></span>
					</div>
				</div>
				<div className="auth-form-group">
					<label htmlFor="password" className="auth-form-label">
						Password
					</label>
					<PasswordInput
						name={'password'}
						password={formData.password}
						interacted={interacted.password}
						handleChange={handleChange}
					/>
				</div>
				<div className="auth-form-group">
					<label htmlFor="confirmPassword" className="auth-form-label">
						Confirm Password
					</label>
					<input
						type="password"
						name="confirmPassword"
						className={`auth-form-input ${
							(formData.confirmPassword.length === 0 && interacted.confirmPassword) ||
							(formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password)
								? 'invalid'
								: ''
						} ${formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword ? 'valid' : ''}`}
						required
						value={formData.confirmPassword}
						onChange={handleChange}
					></input>
					<div className="auth-form-error">Passwords do not match</div>
				</div>
				<div className="submit-btn-container">
					<button type="submit" className="signup-submit-btn" disabled={!isFormValid}>
						<svg xmlns="http://www.w3.org/2000/svg" className="bi bi-lock" viewBox="0 0 16 16">
							<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
						</svg>
						Create Account
					</button>
				</div>
				<hr className="hr-or-text" data-content="or"></hr>
				<div className="submit-btn-container">
					<GoogleLogin
						onClick={() => console.log('onclick wokring')}
						clientId="137264865979-46uqmfrfqekug4el4n71mt2ulpmmd5t7.apps.googleusercontent.com"
						buttonText="Continue with Google"
						onSuccess={onSuccess}
						onFailure={onFailure}
						render={(renderProps) => (
							<button
								className="custom-google-btn"
								onClick={() => {
									setIsLoading(true);
									renderProps.onClick();
								}}
								disabled={renderProps.disabled}
							>
								This is my custom Google button
							</button>
						)}
						cookiePolicy={'single_host_origin'}
						isSignedIn={true}
						className="w-100 d-flex justify-content-center"
					/>
				</div>
			</form>
			<div className="btn-container">
				<a href="/login" className="auth-link">
					Already a member? Log in
				</a>
			</div>
		</div>
	);
}
