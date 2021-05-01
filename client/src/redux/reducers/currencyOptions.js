const currencyOptionsReducer = (currencyOptions = null, action) => {
	switch (action.type) {
		case 'currencyOptions/load':
			return action.payload;
		default:
			return currencyOptions;
	}
};

export default currencyOptionsReducer;
