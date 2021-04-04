import * as API from '../backend/API';

export function getTransactions() {
	return async (dispatch) => {
		try {
			const transactions = await API.fetchTransactions();
			dispatch({
				type: 'transactions/fetch_all',
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
				type: 'transactions/add',
				payload: newTransaction,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}

export function deleteTransaction(id) {
	return async (dispatch) => {
		try {
			await API.deleteTransaction(id);
			dispatch({
				type: 'transactions/delete',
				payload: id,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function updateTransaction(id, updatedTransaction) {
	return async (dispatch) => {
		try {
			const updatedTransaction = await API.updateTransaction(id, updateTransaction);
			dispatch({
				type: 'transactions/update',
				payload: updatedTransaction,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}
