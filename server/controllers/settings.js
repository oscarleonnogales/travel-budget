import User from '../models/user.js';
import GoogleUser from '../models/googleUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
