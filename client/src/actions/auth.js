export function logIn(user, token) {
	return {
		type: 'auth/login',
		payload: { user, token },
	};
}

export function logOut() {
	return {
		type: 'auth/logout',
		payload: {},
	};
}
