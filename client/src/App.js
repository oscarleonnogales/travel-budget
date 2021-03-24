import axios from 'axios';
import Transaction from './components/Transaction';
import { useEffect, useState } from 'react';

function App() {
	const [transactions, setTransactions] = useState([]);

	useEffect(fetchTransactions, []);

	function fetchTransactions() {
		axios.get('http://localhost:3001/transactions').then((res) => {
			setTransactions(res.data);
		});
	}

	return (
		<div className="App">
			{transactions.map((transaction) => {
				return <Transaction transaction={transaction} key={transaction._id} />;
			})}
		</div>
	);
}

export default App;
