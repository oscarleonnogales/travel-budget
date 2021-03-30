import mongoose from 'mongoose';

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
	// location: {
	// 	type: String,
	// 	default: 'Milky Way Galaxy',
	// 	required: true,
	// },
	password: {
		type: String,
		required: true,
	},
	baseCurrency: {
		type: String,
		required: true,
		default: 'USD',
	},
});

export default mongoose.model('User', userSchema);
