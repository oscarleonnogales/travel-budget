const reducer = (transactions = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return transactions;
		case 'ADD':
			return transactions;
		default:
			return transactions;
	}
};

export default reducer;
