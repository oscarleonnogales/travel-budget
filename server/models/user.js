import mongoose from 'mongoose';

const defaultCategories = ['Housing', 'Groceries', 'Food', 'Transportation', 'Luxuries'];

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
	homeCurrency: {
		type: String,
		required: true,
		default: 'USD',
	},
	categories: {
		type: [String],
		default: defaultCategories,
	},
});

export default mongoose.model('User', userSchema);
