import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URI;

export function fetchPurchases() {
	return axios.get(`${URL}/purchases`).then((res) => res.data);
}

export function createPurchase(purchase) {
	return axios.post(`${URL}/purchases`, purchase).then((res) => res.data);
}

export function deletePurchase(id) {
	axios.delete(`${URL}/purchases/${id}`);
}

export function updatePurchase(id, updatedPurchase) {
	return axios.put(`${URL}/purchases/${id}`, updatedPurchase).then((res) => res.data);
}
