const userSettingsReducer = (userSettings = {}, action) => {
	switch (action.type) {
		case 'userSettings/fetch':
			return action.payload;
		case 'userSettings/update':
			return action.payload;
		case 'userSettings/clear':
			return {};
		default:
			return userSettings;
	}
};

export default userSettingsReducer;
