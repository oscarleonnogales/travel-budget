import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

import PurchasesPage from './pages/PurchasesPage/PurchasesPage';
import MonthlyPage from './pages/MonthlyPage/MonthlyPage';
import YearlyPage from './pages/YearlyPage/YearlyPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Page404 from './pages/Page404/Page404';
import { createGoogleUser, checkEmailUniqueness } from './API';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrencyOptions } from './redux/actions/currencyOptions';
import { fetchUserSettings } from './redux/actions/userSettings';
import { clearError } from './redux/actions/error';
import './main.css';

function App() {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);

	useEffect(() => {
		dispatch(loadCurrencyOptions());
	}, [dispatch]);

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

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignupPage} />

				<ProtectedRoute exact path="/purchases" component={PurchasesPage} />
				<ProtectedRoute exact path="/month-breakdown" component={MonthlyPage} />
				<ProtectedRoute exact path="/year-breakdown" component={YearlyPage} />
				<Route exact path="/settings" component={SettingsPage} />

				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
