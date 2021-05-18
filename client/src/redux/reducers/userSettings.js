const userSettingsReducer = (userSettings = {}, action) => {
	switch (action.type) {
		case 'userSettings/fetch':
			return action.payload;
		case 'userSettings/currencyChange':
			return { ...userSettings, defaultCurrency: action.payload };
		case 'userSettings/categoriesChange':
			return { ...userSettings, categories: action.payload };
		case 'userSettings/clear':
			return {};
		default:
			return userSettings;
	}
};

export default userSettingsReducer;
