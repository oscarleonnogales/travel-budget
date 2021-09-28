import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { loadCurrencyOptions } from './redux/actions/currencyOptions';
import './main.css';
import WebFont from 'webfontloader';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import PurchasesPage from './pages/PurchasesPage/PurchasesPage';
import MonthlyPage from './pages/MonthlyPage/MonthlyPage';
import YearlyPage from './pages/YearlyPage/YearlyPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import Page404 from './pages/Page404/Page404';

WebFont.load({
	google: {
		families: ['Source Sans Pro', 'Source Code Pro'],
	},
});

export const ViewPortContext = React.createContext();

function App() {
	const dispatch = useDispatch();
	const [isMobileDevice, setIsMobileDevice] = useState(window.innerWidth <= 600);

	useEffect(() => {
		window.addEventListener('resize', () => setIsMobileDevice(window.innerWidth <= 600));
	}, []);

	useEffect(() => {
		dispatch(loadCurrencyOptions());
	}, [dispatch]);

	const viewportContextValue = {
		isMobileDevice,
	};

	return (
		<ViewPortContext.Provider value={viewportContextValue}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/signup" component={SignupPage} />

					<ProtectedRoute exact path="/purchases" component={PurchasesPage} />
					<ProtectedRoute exact path="/search" component={SearchPage} />
					<ProtectedRoute exact path="/month-breakdown" component={MonthlyPage} />
					<ProtectedRoute exact path="/year-breakdown" component={YearlyPage} />
					<ProtectedRoute exact path="/settings" component={SettingsPage} />

					<Route component={Page404} />
				</Switch>
			</BrowserRouter>
		</ViewPortContext.Provider>
	);
}

export default App;
