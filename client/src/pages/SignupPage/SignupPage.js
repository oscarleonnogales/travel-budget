import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { googleLogIn, signUp } from '../../redux/actions/auth';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { setError, clearError } from '../../redux/actions/error';
import { checkEmailUniqueness, createGoogleUser } from '../../API';
import { fetchUserSettings } from '../../redux/actions/userSettings';
import './SignupPage.css';
import PasswordInput from '../../components/PasswordInput';

export default function SignupPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const userSettings = useSelector((state) => state.userSettings);
	const authData = useSelector((state) => state.authData);
	const error = useSelector((state) => state.error);
	const googleErrorMessage = `It's not recommended to sign up manually with a Google account. Please click the Google button to continue instead.`;

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [interacted, setInteracted] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		confirmPassword: false,
	});

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
			history.push('/purchases');
		}
	}, [userSettings, history]);

	const onSuccess = async (res) => {
		const user = res?.profileObj;
		const token = res?.tokenId;
		console.log(res);

		try {
			dispatch(googleLogIn(user, token));
		} catch (error) {
			console.log(error);
		}
	};

	const onFailure = () => {
		dispatch(setError('Error with Google login. Please try again later.'));
	};

	const handleChange = (e) => {
		setInteracted({ ...interacted, [e.target.name]: true });
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid) {
			dispatch(clearError());
			dispatch(signUp(formData));
		} else {
			dispatch(setError('Please fill out all the necessary information.'));
		}
	};

	const validateEmail = (email) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

	const handleShowPassword = () => {
		setPasswordIsVisible(!passwordIsVisible);
	};

	return (
		<div className="signup-page-container">
			<ErrorMessage renderCloseButton={false} />
			<h1 className="page-header">Sign up for Budget App</h1>
			<div className="signup-logo-container">
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fab"
					data-icon="accusoft"
					className="svg-inline--fa fa-accusoft fa-w-20"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 640 512"
				>
					<path
						fill="currentColor"
						d="M322.1 252v-1l-51.2-65.8s-12 1.6-25 15.1c-9 9.3-242.1 239.1-243.4 240.9-7 10 1.6 6.8 15.7 1.7.8 0 114.5-36.6 114.5-36.6.5-.6-.1-.1.6-.6-.4-5.1-.8-26.2-1-27.7-.6-5.2 2.2-6.9 7-8.9l92.6-33.8c.6-.8 88.5-81.7 90.2-83.3zm160.1 120.1c13.3 16.1 20.7 13.3 30.8 9.3 3.2-1.2 115.4-47.6 117.8-48.9 8-4.3-1.7-16.7-7.2-23.4-2.1-2.5-205.1-245.6-207.2-248.3-9.7-12.2-14.3-12.9-38.4-12.8-10.2 0-106.8.5-116.5.6-19.2.1-32.9-.3-19.2 16.9C250 75 476.5 365.2 482.2 372.1zm152.7 1.6c-2.3-.3-24.6-4.7-38-7.2 0 0-115 50.4-117.5 51.6-16 7.3-26.9-3.2-36.7-14.6l-57.1-74c-5.4-.9-60.4-9.6-65.3-9.3-3.1.2-9.6.8-14.4 2.9-4.9 2.1-145.2 52.8-150.2 54.7-5.1 2-11.4 3.6-11.1 7.6.2 2.5 2 2.6 4.6 3.5 2.7.8 300.9 67.6 308 69.1 15.6 3.3 38.5 10.5 53.6 1.7 2.1-1.2 123.8-76.4 125.8-77.8 5.4-4 4.3-6.8-1.7-8.2z"
					></path>
				</svg>
			</div>
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
							error === googleErrorMessage
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
						clientId="137264865979-46uqmfrfqekug4el4n71mt2ulpmmd5t7.apps.googleusercontent.com"
						buttonText="Continue with Google"
						onSuccess={onSuccess}
						onFailure={onFailure}
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
