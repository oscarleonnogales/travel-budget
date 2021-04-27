import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, ...rest }) {
	const authData = useSelector((state) => state.authData);

	return authData?.user ? <Route component={Component} /> : <Redirect to="/login" />;
}
