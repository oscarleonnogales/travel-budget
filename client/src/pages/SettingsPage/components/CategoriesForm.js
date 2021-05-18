import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from './Category';
import FormHeader from './FormHeader';

export default function CategoriesForm() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.userSettings?.categories);

	const [categoriesFormVisible, setCategoriesFormVisible] = useState(false);
	const [newCategories, setNewCategories] = useState([...categories] || null);

	const removeCategory = (id) => {
		setNewCategories(newCategories.filter((category) => category.categoryId !== id));
	};

	const changeVisibility = () => {
		setCategoriesFormVisible(!categoriesFormVisible);
	};

	return (
		<div className="settings-group">
			<FormHeader title={'Purchase Categories'} visible={categoriesFormVisible} changeVisibility={changeVisibility} />
			{categoriesFormVisible &&
				newCategories?.map((category) => (
					<Category key={category.categoryId} category={category} removeCategory={removeCategory} />
				))}
		</div>
	);
}
