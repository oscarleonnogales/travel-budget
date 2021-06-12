import React from 'react';

export default function CurrencyDemo() {
	return (
		<div className="landing-page__demo-right currency-demo">
			<div className="exchange-image-container">
				<img
					src="https://www.exchangerate-api.com/img/hr-logo-2022-ldpi-rc.png"
					alt="Showing automatic currency"
					className="exchange-image"
				></img>
			</div>
			<div className="landing-page__section-text">
				<h3 className="landing-page__subtitle">Automatic Currency Conversion</h3>
				<p className="landing-page__section-description">
					Using real time, accurate data fetched from ExchangeRate-API allows you to input your expenses in over 160
					different currencies. We take care of the conversions for you.
				</p>
			</div>
		</div>
	);
}
