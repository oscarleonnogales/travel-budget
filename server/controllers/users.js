import User from '../models/user.js';
import GoogleUser from '../models/googleUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createNewUser(req, res) {
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser)
			return res.status(400).json({ message: "There's already an account associated with that email address." });
		if (password != confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		await newUser.save();

		const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SESSION_SECRET, {
			expiresIn: '1h',
		});
		res.status(200).json({ user: newUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong in the server' });
	}
}

export async function createGoogleUser(req, res) {
	const { email } = req.body;
	try {
		if (req.userType !== 'google') throw new Error('User is not authenticated through Google');

		const existingUser = await GoogleUser.findOne({ googleId: req.userId });
		if (existingUser) return res.status(400).json({ message: 'Google User is already in the database' });

		const newGoogleUser = await new GoogleUser({
			googleId: req.userId,
			email,
		});
		await newGoogleUser.save();
		return res.status(201).json({ created: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
}

export async function authenticateUser(req, res) {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });
		if (!existingUser) return res.status(200).json({ message: "Can't find account. Try a different email." });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Password' });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SESSION_SECRET, {
			expiresIn: '1000d',
		});

		res.status(200).json({ user: existingUser, token });
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

export async function validateEmail(req, res) {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email: email });
		const googleUser = await GoogleUser.findOne({ email: email });
		if (user || googleUser) return res.status(200).send(false);
		else return res.status(200).send(true);
	} catch (error) {
		console.log(error);
	}
}
