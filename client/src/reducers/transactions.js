const transactionsReducer = (transactions = [], action) => {
	switch (action.type) {
		case 'transactions/fetch_all':
			return action.payload;
		case 'transactions/add':
			return [...transactions, action.payload];
		case 'transactions/delete':
			return transactions.filter((transaction) => transaction._id !== action.payload);
		case 'transactions/update':
			return transactions.map((transaction) => (transaction._id === action.payload._id ? action.payload : transaction));
		default:
			return transactions;
	}
};

export default transactionsReducer;
