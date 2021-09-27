import React, { useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logOut } from '../../redux/actions/auth';
import { clearPurchases } from '../../redux/actions/purchases';
import { clearUserSettings } from '../../redux/actions/userSettings';
import decode from 'jwt-decode';
import './Navbar.css';

export default function Navbar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const authData = useSelector((state) => state.authData);

	useEffect(() => {
		const token = authData?.user?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				dispatch(clearPurchases());
				dispatch(clearUserSettings());
				dispatch(logOut());
			}
		}
	}, [authData?.user?.token, dispatch, location]);

	const onLogoutSuccess = async () => {
		try {
			dispatch(logOut());
			dispatch(clearPurchases());
			dispatch(clearUserSettings());
			history.push('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="navbar">
			<ul className="navbar_nav">
				<li className="logo navbar_nav-item">
					<span className="navbar_link">
						<span className="navbar_link-text logo-text">
							Hi, {authData?.user?.givenName || authData?.user?.firstName}
						</span>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fad"
							data-icon="angle-double-right"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
						>
							<g className="fa-group">
								<path
									d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
									className="fa-secondary"
								></path>
								<path
									d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
									className="fa-primary"
								></path>
							</g>
						</svg>
					</span>
				</li>

				<li className="navbar_nav-item">
					<a href="/purchases" className="navbar_link">
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="credit-card"
							className="svg-inline--fa fa-credit-card fa-w-18"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 576 512"
						>
							<path d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"></path>
						</svg>
						<span className="navbar_link-text">Edit Your Purchases</span>
					</a>
				</li>
				<li className="navbar_nav-item">
					<a href="/search" className="navbar_link">
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="search"
							className="svg-inline--fa fa-search fa-w-16"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
						</svg>

						<span className="navbar_link-text">Search Purchases</span>
					</a>
				</li>
				<li className="navbar_nav-item">
					<a href="/month-breakdown" className="navbar_link">
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="chart-pie"
							className="svg-inline--fa fa-chart-pie fa-w-17"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 544 512"
						>
							<path d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path>
						</svg>
						<span className="navbar_link-text">Monthly Analysis</span>
					</a>
				</li>
				<li className="navbar_nav-item">
					<a href="/year-breakdown" className="navbar_link">
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="chart-bar"
							className="svg-inline--fa fa-chart-bar fa-w-16"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
						</svg>
						<span className="navbar_link-text">Year To Date</span>
					</a>
				</li>
				<li className="navbar_nav-item">
					<a href="/settings" className="navbar_link">
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="sliders-h"
							className="svg-inline--fa fa-sliders-h fa-w-16"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"></path>
						</svg>
						<span className="navbar_link-text">Settings</span>
					</a>
				</li>
				<li className="navbar_nav-item">
					<GoogleLogout
						clientId="137264865979-46uqmfrfqekug4el4n71mt2ulpmmd5t7.apps.googleusercontent.com"
						onLogoutSuccess={onLogoutSuccess}
						render={(renderProps) => (
							<button className="navbar_link logout-nav-button" onClick={renderProps.onClick}>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="sign-out-alt"
									className="svg-inline--fa fa-sign-out-alt fa-w-16"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
								</svg>
								<span className="navbar_link-text logout-text">Sign Out</span>
							</button>
						)}
					/>
				</li>
			</ul>
		</nav>
	);
}
