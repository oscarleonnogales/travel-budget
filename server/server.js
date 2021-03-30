import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

// Requiring all dependencies
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';

import User from './models/user.js';
import Transaction from './models/transaction.js';
import indexRouter from './routes/index.js';
import transactionsRouter from './routes/transactions.js';
import usersRouter from './routes/users.js';

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
app.use(cors()); // Set to only allow requests from client during production

// Route handling
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 3001);
