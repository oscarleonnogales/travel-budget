import * as API from '../../API';

export function signUp(formData, history) {
	return async (dispatch) => {
		try {
			const response = await API.signup(formData);
			if (response.token) {
				dispatch({
					type: 'auth/signup',
					payload: response,
				});
				history.push('/purchases');
			} else {
				dispatch({
					type: 'error/set',
					payload: response.message,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export function logIn(formData, history) {
	return async (dispatch) => {
		try {
			const response = await API.login(formData);
			if (response.token) {
				dispatch({
					type: 'auth/login',
					payload: response,
				});
				history.push('/purchases');
			} else {
				dispatch({
					type: 'error/set',
					payload: response.message,
				});
			}
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
