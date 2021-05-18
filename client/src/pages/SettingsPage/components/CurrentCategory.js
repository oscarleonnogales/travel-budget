import React from 'react';

export default function CurrentCategory(props) {
	const { selectedCategory, handleChange, cancelSelection, saveChanges, removeCurrentCategory } = props;

	return (
		<div>
			<label htmlFor="categoryName">Category Name</label>
			<input type="text" name="categoryName" value={selectedCategory?.categoryName || ''} onChange={handleChange} />
			<div className="category-btns">
				<button type="button" onClick={cancelSelection}>
					Cancel
				</button>
				<button type="button" onClick={saveChanges}>
					Save
				</button>
				<button type="button" onClick={removeCurrentCategory}>
					Remove
				</button>
			</div>
		</div>
	);
}
