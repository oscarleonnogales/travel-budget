import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URI;

export function fetchTransactions() {
	return axios.get(`${URL}/transactions`).then((res) => res.data);
}

export function createTransaction(transaction) {
	console.log(transaction);
	return axios.post(`${URL}/transactions`, transaction).then((res) => res.data);
}

export function deleteTransaction(id) {
	axios.delete(`${URL}/transactions/${id}`);
}

export function updateTransaction(id, updatedTransaction) {
	return axios.put(`${URL}/transactions/${id}`, updatedTransaction).then((res) => res.data);
}
