const purchasesReducer = (purchases = [], action) => {
	switch (action.type) {
		case 'purchases/fetch_all':
			return action.payload;
		case 'purchases/clear':
			return [];
		case 'purchases/add':
			return [...purchases, action.payload];
		case 'purchases/delete':
			return purchases.filter((purchase) => purchase._id !== action.payload);
		case 'purchases/update':
			return purchases.map((purchase) => (purchase._id === action.payload._id ? action.payload : purchase));
		default:
			return purchases;
	}
};

export default purchasesReducer;
