import React from 'react';

export default function CurrentCategory(props) {
	const { selectedCategory, handleChange, cancelSelection, saveChanges, removeCurrentCategory } = props;

	return (
		<div className="current-category-container">
			<label htmlFor="categoryName" className="category-form__label">
				Category Name
			</label>
			<input
				className="category-form__input"
				type="text"
				name="categoryName"
				value={selectedCategory?.categoryName || ''}
				onChange={handleChange}
			/>
			<div className="category-form__btns-container">
				<button type="button" className="category-form__btn category-form__done-btn" onClick={saveChanges}>
					Done
				</button>
				<button type="button" className="category-form__btn category-form__cancel-btn" onClick={cancelSelection}>
					Cancel
				</button>
				<button type="button" className="category-form__btn category-form__remove-btn" onClick={removeCurrentCategory}>
					Remove
				</button>
			</div>
		</div>
	);
}
