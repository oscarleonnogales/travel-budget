import Purchase from '../models/purchase.js';

export async function getPurchases(req, res) {
	try {
		const purchases = await Purchase.find();
		res.status(200).json(purchases);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function createNewPurchase(req, res) {
	// console.log(req.userId);
	// if (!req.userId) return res.status(401).json({ message: 'User is unauthenticated' });
	try {
		const newPurchase = new Purchase({
			description: req.body.description,
			amount: req.body.amount,
			currency: req.body.currency,
			date: req.body.date,
			category: req.body.category,
		});
		await newPurchase.save();
		res.status(201).json(newPurchase);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function deletePurchase(req, res) {
	if (!req.userId) return res.status(401).json({ message: 'User is unauthenticated' });
	try {
		const purchase = await Purchase.findById(req.params.id);
		if (!purchase) return res.status(404).send(`No purchase with id: ${id}`);
		await purchase.deleteOne({ id: purchase.id });
		res.json({ message: 'Purchase successfully deleted.' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updatePurchase(req, res) {
	if (!req.userId) return res.status(401).json({ message: 'User is unauthenticated' });
	try {
		const purchase = await Purchase.findById(req.params.id);
		if (!purchase) return res.status(404).send(`No purchase with id: ${id}`);

		purchase.description = req.body.description;
		purchase.date = req.body.date;
		purchase.amount = req.body.amount;
		purchase.currency = req.body.currency;
		purchase.category = req.body.category;

		await purchase.save();
		res.status(201).json(purchase);
	} catch (error) {
		res.status(500).json({ message: 'Server Error. Try again later.' });
	}
}
