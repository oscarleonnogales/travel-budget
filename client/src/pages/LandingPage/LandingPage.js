import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';

export default function LandingPage() {
	const history = useHistory();
	const userSettings = useSelector((state) => state.userSettings);

	useEffect(() => {
		if (userSettings?.defaultCurrency) {
			history.push('/purchases');
		}
	}, [userSettings, history]);

	return (
		<div>
			<h1>Landing Page</h1>
		</div>
	);
}
