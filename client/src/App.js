import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useDispatch } from 'react-redux';
import { getPurchases } from './actions/purchases';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/AuthPages/LoginPage/LoginPage';
import SignupPage from './pages/AuthPages/SignupPage/SignupPage';

import PurchasesPage from './pages/PurchasesPage/PurchasesPage';
import MonthlyPage from './pages/MonthlyPage/MonthlyPage';
import YearlyPage from './pages/YearlyPage/YearlyPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Page404 from './pages/Page404/Page404';
import './main.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPurchases());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Switch>
				{/* Make these redirect if user is authenticated */}
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignupPage} />

				{/* Make these a protected route */}
				<Route exact path="/purchases" component={PurchasesPage} />
				<Route exact path="/month-breakdown" component={MonthlyPage} />
				<Route exact path="/year-breakdown" component={YearlyPage} />
				<Route exact path="/settings" component={SettingsPage} />

				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
