import User from '../models/user.js';
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
		newUser.save();

		const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SESSION_SECRET, {
			expiresIn: '1h',
		});
		res.status(200).json({ user: newUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong in the server' });
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
