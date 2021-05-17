import User from '../models/user.js';
import GoogleUser from '../models/googleUser.js';
import bcrypt from 'bcrypt';
import Purchase from '../models/purchase.js';

export async function getUserSettings(req, res) {
	try {
		let user;
		if (req.userType === 'jwt') user = await User.findOne({ _id: req.userId });
		else if (req.userType === 'google') user = await GoogleUser.findOne({ googleId: req.userId });
		return res.status(200).json({
			defaultCurrency: user.defaultCurrency,
			categories: user.categories,
		});
	} catch (error) {
		res.status(400).json({ message: `Couldn't find user settings.` });
	}
}

export async function updateUserSettings(req, res) {
	const { defaultCurrency, categories } = req.body;
	try {
		let user;
		if (req.userType === 'jwt') user = await User.findOne({ _id: req.userId });
		else if (req.userType === 'google') user = await GoogleUser.findOne({ googleId: req.userId });
		user.defaultCurrency = defaultCurrency;
		user.categories = categories;
		await user.save();
		return res.status(200).json({
			defaultCurrency: user.defaultCurrency,
			categories: user.categories,
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong in the server' });
	}
}

export async function changeName(req, res) {
	const { firstName, lastName } = req.body;
	try {
		const user = await User.findOne({ _id: req.userId });
		user.firstName = firstName;
		user.lastName = lastName;
		await user.save();
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong in the server' });
	}
}

export async function changePassword(req, res) {
	const { oldPassword, newPassword, confirmPassword } = req.body;
	try {
		const user = await User.findOne({ _id: req.userId });
		if (!user) throw new Error(`Couldn't find user.`);
		if (!(await bcrypt.compare(oldPassword, user.password))) throw new Error(`Old password was entered incorrectly`);
		if (newPassword !== confirmPassword) throw new Error('Passwords do not match');

		const newHashedPassword = await bcrypt.hash(newPassword, 12);
		user.password = newHashedPassword;
		await user.save();
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function changeDefaultCurrency(req, res) {
	const { defaultCurrency } = req.body;
	try {
		let user;
		if (req.userType === 'jwt') {
			user = await User.findOne({ _id: req.userId });
		} else if (req.userType === 'google') user = await GoogleUser.findOne({ googleId: req.userId });
		user.defaultCurrency = defaultCurrency;
		await user.save();

		// Recalculate all purchases to the new currency
		const purchases = await Purchase.find({ user: req.userId });
		purchases.forEach(async (purchase) => {
			purchase.convertedPrice = await getConvertedPrice(purchase, defaultCurrency);
			await purchase.save();
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function getConvertedPrice(purchase, defaultCurrency) {
	if (purchase.currency === defaultCurrency) return purchase.amount;
	const REQUEST_URI = `${process.env.EXCHANGE_RATE_URI}/${process.env.EXCHANGE_RATE_API_KEY}`;
	const data = await axios
		.get(`${REQUEST_URI}/pair/${purchase.currency}/${defaultCurrency}/${purchase.amount}`)
		.then((res) => res.data);
	if (data.result === 'success') {
		return parseFloat(data.conversion_result).toFixed(2);
	} else return -1;
}
