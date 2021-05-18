import React from 'react';

export default function Category({ category, changeSelected }) {
	return (
		<li className="settings-category">
			<button type="button" className="save-btn purchase-btn" onClick={() => changeSelected(category.categoryId)}>
				Edit
			</button>
			{category.categoryName}
		</li>
	);
}
