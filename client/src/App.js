import axios from 'axios';
import Transaction from './components/Transaction';
import { useEffect, useState } from 'react';

function App() {
	const [transactions, setTransactions] = useState([]);

	// useEffect(() => {
	// 	setTransactions
	// }, [])

	// const transactions = [
	// 	{
	// 		id: 1,
	// 		description: 'Rent',
	// 		date: new Date(),
	// 		amount: 850,
	// 		currency: 'USD',
	// 	},
	// 	{
	// 		id: 2,
	// 		description: 'Groceries',
	// 		date: new Date(),
	// 		amount: 140,
	// 		currency: 'USD',
	// 	},
	// 	{
	// 		id: 3,
	// 		description: 'Motorcycle Parts',
	// 		date: new Date(),
	// 		amount: 300,
	// 		currency: 'USD',
	// 	},
	// ];
	useEffect(async () => {
		// axios.get('http://localhost:3001/transactions').then((res) => {
		// 	setTransactions(res.data);
		// });
		const transactions = await fetch('http://localhost:3001/transactions');
	}, []);

	return (
		<div className="App">
			{transactions.map((transaction) => {
				return <Transaction transaction={transaction} key={transaction.id} />;
			})}
		</div>
	);
}

// async function getTransactions() {
// 	axios.get('http://localhost:3001/transactions').then((res) => {
// 		const transactions = res.data;
// 		return transactions;
// 	});
// }

export default App;
