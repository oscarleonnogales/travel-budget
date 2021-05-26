import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogIn, logIn } from '../../redux/actions/auth';
import { setError, clearError } from '../../redux/actions/error';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { checkEmailUniqueness, createGoogleUser } from '../../API';
import { fetchUserSettings } from '../../redux/actions/userSettings';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import './LoginPage.css';

export default function LoginPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const userSettings = useSelector((state) => state.userSettings);
	const error = useSelector((state) => state.error);
	const authData = useSelector((state) => state.authData);
	const googleErrorMessage = `Please click the Google button to continue instead.`;
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (error !== null) setIsLoading(false);
	}, [error]);

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
		refreshTokenSetup(res);
		const user = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch(googleLogIn(user, token));
		} catch (error) {
			console.log(error);
		}
	};

	const refreshTokenSetup = (res) => {
		let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
		const refreshToken = async () => {
			const newAuthResponse = await res.reloadAuthResponse();
			refreshTiming = (newAuthResponse.expires_in || 3600 - 5 * 60) * 1000;
			setTimeout(refreshToken, refreshTiming);
		};
		setTimeout(refreshToken, refreshTiming);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(logIn(formData));
	};

	const onFailure = () => {
		setIsLoading(false);
		dispatch(setError('Error with Google login. Please try again later.'));
	};

	const handleEmailChange = (e) => {
		handleChange(e);
		ensureEmailIsNotGoogle(e.target.value);
	};

	const ensureEmailIsNotGoogle = (email) => {
		const regex = /^[\w.+-]+@g(oogle)?mail\.com$/;
		if (regex.test(String(email).toLocaleLowerCase())) {
			dispatch(setError(googleErrorMessage));
		} else {
			if (error === googleErrorMessage) dispatch(clearError());
		}
	};

	if (isLoading) return <LoadingAnimation />;

	return (
		<div className="login-page-container">
			<ErrorMessage renderCloseButton={false} />
			<h1 className="page-header">Login</h1>
			<form className="login-form-container" onSubmit={handleSubmit}>
				<div className="auth-form-group">
					<label htmlFor="email" className="auth-form-label">
						Email
					</label>
					<input
						type="email"
						name="email"
						className="auth-form-input"
						required
						value={formData.email}
						onChange={handleEmailChange}
					></input>
				</div>

				<div className="auth-form-group">
					<label htmlFor="password" className="auth-form-label">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="auth-form-input"
						required
						value={formData.password}
						onChange={handleChange}
					></input>
				</div>

				<div className="submit-btn-container">
					<button type="submit" className="signup-submit-btn" disabled={error === googleErrorMessage}>
						Log In
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
						render={(renderProps) => (
							<button
								className="custom-google-btn"
								onClick={() => {
									setIsLoading(true);
									renderProps.onClick();
								}}
								disabled={renderProps.disabled}
							>
								<img
									src="https://ynab-evergreen-assets.youneedabudget.com/ynab-api-production/v1.63491/assets/google-logo-54e60c3db3a805b0cdd5ace5c871f691ebe85248f6685f663c0e007ace582b72.svg"
									className="provider-logo"
									alt="google logo"
								></img>
								Continue with Google
							</button>
						)}
						isSignedIn={true}
						className="w-100 d-flex justify-content-center"
					/>
				</div>
			</form>
			<div className="btn-container">
				<a href="/signup" className="auth-link">
					Don't have an account? Sign up today
				</a>
			</div>
		</div>
	);
}
