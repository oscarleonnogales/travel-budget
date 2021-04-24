import * as API from '../backend/API';

export function signUp(formData, history) {
	return async (dispatch) => {
		try {
			const authData = await API.signup(formData);
			console.log(authData);
			dispatch({
				type: 'auth/signup',
				payload: authData,
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
			const authData = await API.login(formData);
			dispatch({
				type: 'auth/login',
				payload: authData,
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
