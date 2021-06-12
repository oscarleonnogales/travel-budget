import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthButtons from './components/AuthButtons';
import Footer from './components/Footer';
import MonthDemo from './components/MonthDemo';
import YearDemo from './components/YearDemo';
import CurrencyDemo from './components/CurrencyDemo';
import SettingsDemo from './components/SettingsDemo';

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
		<div className="landing-page">
			<AuthButtons />
			<div className="landing-page__title-container">
				<h1 className="landing-page__title">Borderless Expense Tracker</h1>
				<p className="landing-page__description">
					The perfect expense tracker for travelers and people living near an international border.
				</p>
			</div>
			<CurrencyDemo />
			<MonthDemo />
			<YearDemo />
			<SettingsDemo />
			<div className="landing-page__signup">
				<h3 className="landing-page__signup-title">Ready to join? Signup today!</h3>
				<a href="/signup" className="large-signup-btn">
					Signup
				</a>
			</div>
			<Footer />
		</div>
	);
}
