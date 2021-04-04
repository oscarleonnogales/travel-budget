import mongoose from 'mongoose';
// const User = require('./user');

const transactionSchema = new mongoose.Schema({
	// user: {
	//     type: mongoose.Schema.Types.ObjectId,
	//     required: true,
	//     ref: 'User',
	// },
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
