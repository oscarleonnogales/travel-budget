import React from 'react';

export default function Category({ category, removeCategory }) {
	return (
		<li className="settings-category">
			<button type="button" className="save-btn purchase-btn">
				Edit
			</button>
			<button type="button" className="cancel-btn purchase-btn" onClick={() => removeCategory(category.categoryId)}>
				Remove
			</button>
			{category.categoryName}
		</li>
	);
}
