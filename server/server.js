import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

// Requiring all dependencies
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';

import indexRouter from './routes/index.js';
import purchasesRouter from './routes/purchases.js';
import usersRouter from './routes/users.js';
import settingsRouter from './routes/settings.js';

// Setting up dependencies
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('open', () => console.log('Connected to database'));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(
	cors({
		origin: process.env.ORIGIN_URL,
	})
);

// Route handling
app.use('/users', usersRouter);
app.use('/purchases', purchasesRouter);
app.use('/settings', settingsRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 3001);
