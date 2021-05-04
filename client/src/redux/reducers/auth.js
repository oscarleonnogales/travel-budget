const authReducer = (authData = {}, action) => {
	switch (action.type) {
		case 'auth/googleLogin':
			return action.payload;
		case 'auth/login':
			return action.payload;
		case 'auth/signup':
			return action.payload;
		case 'auth/logout':
			return action.payload;
		case 'auth/change-name':
			return { ...authData, ...action.payload };
		default:
			return authData;
	}
};

export default authReducer;
