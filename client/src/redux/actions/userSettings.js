import * as API from '../../API';

export function fetchUserSettings() {
	return async (dispatch) => {
		try {
			const settings = await API.getUserSettings();
			dispatch({
				type: 'userSettings/fetch',
				payload: settings,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}

export function clearUserSettings() {
	return {
		type: 'userSettings/clear',
		payload: null,
	};
}

export function changeDefaultCurrency(currency) {
	return async (dispatch) => {
		try {
			const response = await API.changeDefaultCurrency(currency);
			if (response.success) {
				dispatch({
					type: 'userSettings/currencyChange',
					payload: response.newCurrency,
				});
			} else {
				dispatch({
					type: 'error/set',
					payload: response.message,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};
}

export function changeCategories(newCategories) {
	return async (dispatch) => {
		try {
			const response = await API.setPurchaseCategories(newCategories);
			if (response.success) {
				dispatch({
					type: 'userSettings/categoriesChange',
					payload: response.categories,
				});
			} else {
				dispatch({
					type: 'error/set',
					payload: response.message,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};
}
