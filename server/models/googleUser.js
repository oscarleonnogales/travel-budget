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
