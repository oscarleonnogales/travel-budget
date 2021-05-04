import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormHeader from './FormHeader';

export default function CategoriesForm() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.authData?.user?.categories);

	const [categoriesFormVisible, setCategoriesFormVisible] = useState(false);
	const [newCategories, setNewCategories] = useState(categories);

	const changeVisibility = () => {
		setCategoriesFormVisible(!categoriesFormVisible);
	};

	return (
		<div className="settings-group">
			<FormHeader title={'Purchase Categories'} visible={categoriesFormVisible} changeVisibility={changeVisibility} />
			{categoriesFormVisible &&
				// <form onSubmit={handleSettingsSubmit} className="settings-group-form">
				// 	<div className="settings-form-group">
				// 		<label htmlFor="defaultCurrency">Home Currency</label>
				// 		<div className="custom-select">
				// 			<select
				// 				htmlFor="defaultCurrency"
				// 				name="defaultCurrency"
				// 				value={newUserSettings?.defaultCurrency}
				// 				onChange={handleSettingsChange}
				// 				required
				// 				className="purchase-form-input form-select"
				// 			>
				// 				<option value="unselected" disabled>
				// 					Choose an option
				// 				</option>
				// 				{currencyOptions?.map((currency) => (
				// 					<option value={currency} key={currency}>
				// 						{currency}
				// 					</option>
				// 				))}
				// 			</select>
				// 			<span className="custom-arrow"></span>
				// 		</div>
				// 	</div>
				// 	<div className="settings-form-group">
				// 		<label htmlFor="categories">Purchase Categories</label>
				// 	</div>
				// 	<button type="submit">Save Changes</button>
				// </form>
				categories.map((category) => <li key={category}>{category}</li>)}
		</div>
	);
}
