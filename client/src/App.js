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
import { useDispatch } from 'react-redux';
import { loadCurrencyOptions } from './redux/actions/currencyOptions';
import './main.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadCurrencyOptions());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignupPage} />

				<ProtectedRoute exact path="/purchases" component={PurchasesPage} />
				<ProtectedRoute exact path="/month-breakdown" component={MonthlyPage} />
				<ProtectedRoute exact path="/year-breakdown" component={YearlyPage} />
				<ProtectedRoute exact path="/settings" component={SettingsPage} />

				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
