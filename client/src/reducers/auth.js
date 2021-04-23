const authReducer = (authData = {}, action) => {
	switch (action.type) {
		case 'auth/googleLogin':
			localStorage.setItem('budget-app.authData', JSON.stringify(action.payload));
			return action.payload;
		case 'auth/login':
			localStorage.setItem('budget-app.authData', JSON.stringify(action.payload));
			return action.payload;
		case 'auth/signup':
			localStorage.setItem('budget-app.authData', JSON.stringify(action.payload));
			return action.payload;
		case 'auth/logout':
			localStorage.setItem('budget-app.authData', JSON.stringify(action.payload));
			return action.payload;
		default:
			return authData;
	}
};

export default authReducer;
