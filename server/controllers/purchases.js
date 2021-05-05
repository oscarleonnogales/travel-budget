import Purchase from '../models/purchase.js';
import User from '../models/user.js';
import GoogleUser from '../models/googleUser.js';
import axios from 'axios';

export async function getPurchases(req, res) {
	try {
		const purchases = await Purchase.find({ user: req.userId });
		res.status(200).json(purchases);
	} catch (error) {
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
		getConvertedPrice(currency, amount, user.defaultCurrency);
		const newPurchase = new Purchase({
			description: description,
			amount: amount,
			currency: currency,
			date: date,
			category: category,
			user: req.userId,
			convertedPrice: getConvertedPrice(currency, amount, user.defaultCurrency),
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

		purchase.description = description;
		purchase.date = date;
		purchase.amount = amount;
		purchase.currency = currency;
		purchase.category = category;
		purchase.convertedPrice = getConvertedPrice(currency, amount, user.defaultCurrency);

		await purchase.save();
		res.status(201).json(purchase);
	} catch (error) {
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}

async function getConvertedPrice(currencyUsed, amount, homeCurrency) {
	if (currencyUsed === homeCurrency) return amount;
	const REQUEST_URI = `${process.env.EXCHANGE_RATE_URI}/${process.env.EXCHANGE_RATE_API_KEY}`;
	const response = await axios.get(`${REQUEST_URI}/pair/${currencyUsed}/${homeCurrency}/${amount}`);

	if (response.result === 'success') return response.conversion_result;
	else return -1;
}
