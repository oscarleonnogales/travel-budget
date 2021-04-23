export function signUp(formData, history) {
	return async (dispatch) => {
		try {
			//sign up the user in the backend
			dispatch({
				type: 'auth/signup',
				payload: null,
			});

			history.push('/purchases');
		} catch (error) {
			console.log(error);
		}
	};
}

export function logIn(formData, history) {
	return async (dispatch) => {
		try {
			//log in the user in the backend
			//If there's an error (wrong password), have the server return null payload
			dispatch({
				type: 'auth/login',
				payload: null,
			});

			history.push('/purchases');
		} catch (error) {
			console.log(error);
		}
	};
}

export function googleLogIn(user, token) {
	return {
		type: 'auth/googleLogin',
		payload: { user, token },
	};
}

export function logOut() {
	return {
		type: 'auth/logout',
		payload: {},
	};
}
