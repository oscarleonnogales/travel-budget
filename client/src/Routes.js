import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Make these redirect if user is authenticated */}
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignupPage} />

				{/* Make this a protected route */}
				<Route exact path="/transactions" component={TransactionsPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
