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

const googleUserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	googleId: {
		type: String,
		required: true,
		unique: true,
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

export default mongoose.model('GoogleUser', googleUserSchema);
