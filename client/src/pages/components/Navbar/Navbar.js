import React from 'react';
import './Navbar.css';

export default function Navbar() {
	return (
		<nav className="navbar">
			<li>
				<a href="/transactions" className="navbar__link">
					Transactions
				</a>
			</li>
			<li>
				<a href="/reports" className="navbar__link">
					Reports
				</a>
			</li>
			<li>
				<a href="/settings" className="navbar__link">
					Settings
				</a>
			</li>
		</nav>
	);
}
