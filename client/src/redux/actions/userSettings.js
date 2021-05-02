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

export function updateUserSettings(settings) {
	return async (dispatch) => {
		try {
			const newSettings = await API.updateUserSettings(settings);
			dispatch({
				type: 'userSettings/update',
				payload: newSettings,
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
