const reducer = (transactions = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'ADD':
			console.table([...transactions, action.payload]);
			return [...transactions, action.payload];
		default:
			return transactions;
	}
};

export default reducer;
