import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategories } from '../../../redux/actions/userSettings';
import { MessageContext } from '../SettingsPage';
import Category from './Category';
import FormHeader from './FormHeader';
import CurrentCategory from '../components/CurrentCategory';

export default function CategoriesForm() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.userSettings?.categories);
	const error = useSelector((state) => state.error);
	const { changeMessage } = useContext(MessageContext);

	const [categoriesFormVisible, setCategoriesFormVisible] = useState(false);
	const [newCategories, setNewCategories] = useState([...categories] || null);
	const [selectedID, setSelectedID] = useState();
	const [selectedCategory, setSelectedCategory] = useState(
		newCategories.find((category) => category.categoryId === selectedID)
	);

	useEffect(() => {
		setSelectedCategory(newCategories.find((category) => category.categoryId === selectedID));
	}, [newCategories, selectedID]);

	useEffect(() => {
		console.log(newCategories);
	}, [newCategories]);

	const removeCurrentCategory = () => {
		setNewCategories(newCategories.filter((category) => category.categoryId !== selectedID));
		setSelectedID(null);
	};

	const handleChange = (e) => {
		if (!selectedCategory) return;
		setSelectedCategory({ ...selectedCategory, [e.target.name]: e.target.value });
	};

	const changeVisibility = () => {
		setCategoriesFormVisible(!categoriesFormVisible);
	};

	const changeSelected = (id) => {
		setSelectedID(id);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(changeCategories(newCategories));
		if (error === null) changeMessage('Updated your purchase categories');
	};

	const saveChanges = () => {
		setNewCategories([...newCategories.filter((category) => category.categoryId !== selectedID), selectedCategory]);
		setSelectedID(null);
	};

	const cancelSelection = () => {
		setSelectedID(null);
	};

	const addNewCategory = () => {
		const newCategory = {
			categoryId: uuid(),
			categoryName: '',
		};
		setNewCategories([...newCategories, newCategory]);
		setSelectedID(newCategory.categoryId);
	};

	return (
		<div className="container settings-group">
			<FormHeader title={'Purchase Categories'} visible={categoriesFormVisible} changeVisibility={changeVisibility} />
			{categoriesFormVisible && (
				<form onSubmit={handleSubmit}>
					{newCategories?.map((category) => (
						<Category key={category.categoryId} category={category} changeSelected={changeSelected} />
					))}
					<button type="button" onClick={addNewCategory}>
						Add Category
					</button>
					{selectedCategory && (
						<CurrentCategory
							selectedCategory={selectedCategory}
							handleChange={handleChange}
							cancelSelection={cancelSelection}
							saveChanges={saveChanges}
							removeCurrentCategory={removeCurrentCategory}
						/>
					)}
					<button type="submit">Submit Changes</button>
				</form>
			)}
		</div>
	);
}
