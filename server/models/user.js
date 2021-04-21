import mongoose from 'mongoose';

const defaultCategories = ['housing', 'groceries', 'food', 'transportation', 'luxuries'];

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
