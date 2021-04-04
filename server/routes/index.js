import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello from API');
});

router.get('*', (req, res) => {
	res.status(404);
	res.send('404');
});

export default router;
