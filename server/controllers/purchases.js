import Purchase from '../models/purchase.js';
import User from '../models/user.js';
import GoogleUser from '../models/googleUser.js';
import axios from 'axios';

// req.query = searchParameters
const getFilteredPurchases = async (req) => {
	/*
		Won't always have these parameters defined. Sometimes only some of them will be used
		These parameters will be returned as strings, convert before use
	*/
	const { limit, currency, description, fromDate, toDate } = req.query;
	console.log(limit);

	try {
		// Loop through req.query, if value is not null then add it to the searchParameters

		// const searchParameters = Object.assign(
		// 	{},
		// 	// currency === undefined ? null : { currency },
		// 	description === undefined ? null : description
		// 	// fromDate === undefined ? null : { fromDate },
		// 	// toDate === undefined ? null : { toDate }
		// // );
		// const searchParameters = {
		// 	currency: currency === null ? undefined : currency,
		// };
		// console.log(searchParameters);

		let purchases;
		// if (limit) {
		// 	purchases = await Purchase.find({ user: req.userId }).limit(Number(limit)).sort({ date: -1 });
		// } else {
		// }
		purchases = await Purchase.find({ user: req.userId }).sort({ date: -1 });
		// console.log(purchases);
		return purchases;
	} catch (error) {
		console.log(error);
	}
};

export async function getPurchases(req, res) {
	try {
		const purchases = await getFilteredPurchases(req);
		res.status(200).json(purchases);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}

export async function createNewPurchase(req, res) {
	const { description, date, amount, currency, categoryId } = req.body;
	try {
		let user;
		if (req.userType === 'google') user = await GoogleUser.findOne({ googleId: req.userId });
		else if (req.userType === 'jwt') user = await User.findOne({ _id: req.userId });

		const category = [...user.categories].find((category) => category.categoryId === categoryId);
		const newPurchase = new Purchase({
			description: description,
			amount: parseFloat(amount).toFixed(2),
			currency: currency,
			date: date,
			category: category,
			user: req.userId,
			convertedPrice: await getConvertedPrice(currency, amount, user.defaultCurrency),
		});
		await newPurchase.save();
		res.status(201).json(newPurchase);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function deletePurchase(req, res) {
	try {
		const purchase = await Purchase.findById(req.params.id);
		if (!purchase) return res.status(404).send(`No purchase with id: ${id}`);

		if (purchase.user != req.userId) {
			res.status(403).json({ message: 'You are not the creator of this purchase.' });
		} else {
			await purchase.deleteOne({ id: purchase.id });
			res.status(204).json({ message: 'Purchase successfully deleted.' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}

export async function updatePurchase(req, res) {
	const { description, date, amount, currency, categoryId } = req.body;
	try {
		const purchase = await Purchase.findById(req.params.id);
		if (!purchase) return res.status(404).send(`No purchase with id: ${id}`);
		if (purchase.user != req.userId)
			return res.status(403).json({ message: 'You are not the creator of this purchase.' });

		let user;
		if (req.userType === 'google') user = await GoogleUser.findOne({ googleId: req.userId });
		else if (req.userType === 'jwt') user = await User.findOne({ _id: req.userId });

		const category = [...user.categories].find((category) => category.categoryId === categoryId);

		if (purchase.amount !== amount)
			purchase.convertedPrice = await getConvertedPrice(currency, amount, user.defaultCurrency);
		purchase.description = description;
		purchase.date = date;
		purchase.amount = amount;
		purchase.currency = currency;
		purchase.category = category;

		await purchase.save();
		res.status(201).json(purchase);
	} catch (error) {
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}

async function getConvertedPrice(currencyUsed, amount, homeCurrency) {
	if (currencyUsed === homeCurrency) return amount;
	const REQUEST_URI = `${process.env.EXCHANGE_RATE_URI}/${process.env.EXCHANGE_RATE_API_KEY}`;
	const data = await axios.get(`${REQUEST_URI}/pair/${currencyUsed}/${homeCurrency}/${amount}`).then((res) => res.data);
	if (data.result === 'success') {
		return parseFloat(data.conversion_result).toFixed(2);
	} else return -1;
}
