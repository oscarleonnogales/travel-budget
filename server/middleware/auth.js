import jwt from 'jsonwebtoken';

export async function authorize(req, res, next) {
	if (!req.headers.authorization) res.status(401).json({ message: 'User is not logged in' });
	else {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const isCustomToken = token.length < 500;
			let decodedData;

			if (token && isCustomToken) {
				decodedData = jwt.verify(token, process.env.SESSION_SECRET);
				req.userId = decodedData?.id;
			} else {
				decodedData = jwt.decode(token);
				req.userId = decodedData?.sub;
			}
			next();
		} catch (error) {
			console.log(error);
		}
	}
}
