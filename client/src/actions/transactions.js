import * as API from '../backend/API';

export const getTransactions = () => async (dispatch) => {
	try {
		const transactions = await API.fetchTransactions();
		console.log(transactions);
		dispatch({
			type: 'FETCH_ALL',
			payload: transactions,
		});
	} catch (error) {
		console.log(error.message);
	}
};
