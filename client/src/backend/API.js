import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URI });

// Purchases
export function fetchPurchases() {
	return API.get('/purchases').then((res) => res.data);
}

export function createPurchase(purchase) {
	return API.post('/purchases', purchase).then((res) => res.data);
}

export function deletePurchase(id) {
	return API.delete(`/purchases/${id}`).then((res) => res.data);
}

export function updatePurchase(id, updatedPurchase) {
	return API.put(`/purchases/${id}`, updatedPurchase).then((res) => res.data);
}

// Users
export function signup(formData) {
	return API.post('/users/signup', formData).then((res) => res.data);
}

export function login(formData) {
	return API.post('/users/login', formData).then((res) => res.data);
}
