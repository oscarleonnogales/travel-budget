import * as API from '../backend/API';

export function getTransactions() {
	return async (dispatch) => {
		try {
			const transactions = await API.fetchTransactions();
			dispatch({
				type: 'FETCH_ALL',
				payload: transactions,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}

export function addTransaction(transaction) {
	return async (dispatch) => {
		try {
			const newTransaction = await API.createTransaction(transaction);
			dispatch({
				type: 'ADD',
				paylod: newTransaction,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}
