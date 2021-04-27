export function setCurrentId(id) {
	return {
		type: 'currentId/set',
		payload: id,
	};
}
