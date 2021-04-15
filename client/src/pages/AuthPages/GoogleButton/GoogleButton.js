import React from 'react';
import './GoogleButton.css';

export default function GoogleButton() {
	return (
		<button className="google-btn">
			<img
				className="bi-google"
				src="https://ynab-evergreen-assets.youneedabudget.com/ynab-api-production/v1.62414/assets/google-logo-54e60c3db3a805b0cdd5ace5c871f691ebe85248f6685f663c0e007ace582b72.svg"
				alt="Google Logo"
			/>
			Continue with Google
		</button>
	);
}
