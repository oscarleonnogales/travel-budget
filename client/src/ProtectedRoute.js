import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, ...rest }) {
	const authData = useSelector((state) => state.authData);

	if (authData.user) {
		console.log('printing the component');
	} else console.log('redirecting to the login screen');
	return authData.user ? <Route component={Component} /> : <Redirect to="/login" />;
}
