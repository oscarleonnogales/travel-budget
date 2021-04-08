import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTransactions } from './actions/transactions';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';

function Routes() {
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
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
