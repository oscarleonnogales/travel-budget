export function setError(message) {
	return {
		type: 'error/set',
		payload: message,
	};
}

export function clearError() {
	return {
		type: 'error/clear',
		payload: null,
	};
}
