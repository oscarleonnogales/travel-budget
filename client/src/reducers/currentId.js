const currentIdReducer = (currentId = null, action) => {
	switch (action.type) {
		case 'currentId/set':
			return action.payload;
		default:
			return currentId;
	}
};

export default currentIdReducer;
