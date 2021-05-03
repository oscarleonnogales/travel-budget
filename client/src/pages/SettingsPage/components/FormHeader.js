import React from 'react';

export default function FormHeader({ title, visible, changeVisibility }) {
	return (
		<div className="settings-group-header">
			<h3 className="settings-group-title">{title}</h3>
			<button type="button" className="dropdown-btn" onClick={changeVisibility}>
				DR
			</button>
		</div>
	);
}
