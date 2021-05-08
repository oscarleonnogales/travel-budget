import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
	user: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: {},
		required: true,
	},
	date: {
		type: Date,
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
	convertedPrice: {
		type: Number,
		required: true,
	},
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;
