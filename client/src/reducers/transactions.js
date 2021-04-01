const reducer = (transactions = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'ADD':
			return transactions;
		default:
			return transactions;
	}
};

export default reducer;
