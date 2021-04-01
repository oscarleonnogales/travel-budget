import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URI;

export function fetchTransactions() {
	return axios.get(`${URL}/transactions`).then((res) => res.data);
}
