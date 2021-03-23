if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Requiring all dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const User = require('./models/user');
const Transaction = require('./models/transation');
const indexRouter = require('./routes/index');
const transactionsRouter = require('./routes/transactions');
const usersRouter = require('./routes/users');

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

// Route handling
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 3001);
