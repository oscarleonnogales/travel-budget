import mongoose from 'mongoose';

const defaultCategories = ['housing', 'groceries', 'food', 'transportation', 'luxuries'];

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
		type: [String],
		default: defaultCategories,
	},
});

export default mongoose.model('GoogleUser', googleUserSchema);
