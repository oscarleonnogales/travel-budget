import React from 'react';
import settingsImage from '../../../images/settings.png';

export default function SettingsDemo() {
	return (
		<div className="landing-page__demo-left settings-demo">
			<div className="landing-page__section-text">
				<h3 className="landing-page__subtitle">Customize Your Categories</h3>
				<p className="landing-page__section-description">
					Remove, rename, and add your own purchase categories to track your expenses the way you want to.
				</p>
			</div>
			<div className="image-container">
				<img src={settingsImage} alt="Settings" className="actual-image"></img>
			</div>
		</div>
	);
}
