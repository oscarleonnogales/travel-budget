import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const defaultCategories = [
	{
		categoryId: uuid(),
		categoryName: 'Housing',
	},
	{
		categoryId: uuid(),
		categoryName: 'Groceries',
	},
	{
		categoryId: uuid(),
		categoryName: 'Restaurants/Takeout',
	},
	{
		categoryId: uuid(),
		categoryName: 'Transportation',
	},
	{
		categoryId: uuid(),
		categoryName: 'Entertainment',
	},
	{
		categoryId: uuid(),
		categoryName: 'Luxuries',
	},
	{
		categoryId: uuid(),
		categoryName: 'Personal Care',
	},
	{
		categoryId: uuid(),
		categoryName: 'Other',
	},
];

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	defaultCurrency: {
		type: String,
		required: true,
		default: 'USD',
	},
	categories: {
		type: {},
		default: defaultCategories,
	},
});

export default mongoose.model('User', userSchema);
