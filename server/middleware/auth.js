import jwt from 'jsonwebtoken';

export async function authorize(req, res, next) {
	try {
		const token = req?.headers?.authorization?.split(' ')[1];
		if (!token) return next();
		const isCustomToken = token.length < 500;

		let decodedData;

		if (token && isCustomToken) {
			decodedData = jwt.verify(token, process.env.SESSION_SECRET);
			console.log(decodedData);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			console.log(decodedData);

			req.userId = decodedData?.sub;
		}
		next();
	} catch (error) {
		console.log(error);
	}
}
