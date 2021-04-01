import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URI;

export function fetchTransactions() {
	axios.get('http://localhost:3001/transactions').then((res) => {
		return res.data;
	});
}
