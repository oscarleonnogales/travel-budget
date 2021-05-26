import express from 'express';
const router = express.Router();
import Purchase from '../models/purchase.js';

router.get('/', (req, res) => {
	res.send('Hello from API');
});

router.get('/test-db-connection', async (req, res) => {
	const randomPurchase = await Purchase.find().limit(1);
	res.send(randomPurchase);
});

router.get('*', (req, res) => {
	res.status(404);
	res.send('404');
});

export default router;
