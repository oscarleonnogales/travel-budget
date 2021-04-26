import Purchase from '../models/purchase.js';

export async function getPurchases(req, res) {
	try {
		const purchases = await Purchase.find({ user: req.userId });
		res.status(200).json(purchases);
	} catch (error) {
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}

export async function createNewPurchase(req, res) {
	try {
		const newPurchase = new Purchase({
			description: req.body.description,
			amount: req.body.amount,
			currency: req.body.currency,
			date: req.body.date,
			category: req.body.category,
			user: req.userId,
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
	try {
		const purchase = await Purchase.findById(req.params.id);
		if (!purchase) return res.status(404).send(`No purchase with id: ${id}`);

		if (purchase.user != req.userId) {
			res.status(403).json({ message: 'You are not the creator of this purchase.' });
		} else {
			purchase.description = req.body.description;
			purchase.date = req.body.date;
			purchase.amount = req.body.amount;
			purchase.currency = req.body.currency;
			purchase.category = req.body.category;

			await purchase.save();
			res.status(201).json(purchase);
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}
