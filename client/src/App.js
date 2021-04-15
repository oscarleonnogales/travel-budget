import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTransactions } from './actions/transactions';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/AuthPages/LoginPage/LoginPage';
import SignupPage from './pages/AuthPages/SignupPage/SignupPage';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import './main.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTransactions());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Switch>
				{/* Make these redirect if user is authenticated */}
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignupPage} />

				{/* Make these a protected route */}
				<Route exact path="/transactions" component={TransactionsPage} />
				<Route exact path="/reports" component={ReportsPage} />
				<Route exact path="/settings" component={SettingsPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
