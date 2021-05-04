import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const defaultCategories = [
	{
		categoryId: uuid(),
		categoryName: 'housing',
	},
	{
		categoryId: uuid(),
		categoryName: 'groceries',
	},
	{
		categoryId: uuid(),
		categoryName: 'food',
	},
	{
		categoryId: uuid(),
		categoryName: 'transportation',
	},
	{
		categoryId: uuid(),
		categoryName: 'luxuries',
	},
	{
		categoryId: uuid(),
		categoryName: 'other',
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
