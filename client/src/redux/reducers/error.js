const errorReducer = (error = null, action) => {
	switch (action.type) {
		case 'error/set':
			return action.payload;
		case 'error/clear':
			return null;
		default:
			return error;
	}
};

export default errorReducer;
