import React from 'react';

export default function AuthButtons() {
	return (
		<div className="landing-page__auth-buttons">
			<a href="/signup" className="landing-page__btn signup-btn">
				Signup
			</a>
			<a href="/login" className="landing-page__btn login-btn">
				Login
			</a>
		</div>
	);
}
