import * as API from '../../API';

export function getPurchases(searchParams) {
	return async (dispatch) => {
		try {
			const purchases = await API.fetchPurchases(searchParams);
			dispatch({
				type: 'purchases/fetch_all',
				payload: purchases,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}

export function clearPurchases() {
	return {
		type: 'purchases/clear',
		payload: null,
	};
}

export function addPurchase(purchase) {
	return async (dispatch) => {
		try {
			const newPurchase = await API.createPurchase(purchase);
			dispatch({
				type: 'purchases/add',
				payload: newPurchase,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}

export function deletePurchase(id) {
	return async (dispatch) => {
		try {
			await API.deletePurchase(id);
			dispatch({
				type: 'purchases/delete',
				payload: id,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function updatePurchase(id, newData) {
	return async (dispatch) => {
		try {
			const updatedPurchase = await API.updatePurchase(id, newData);
			dispatch({
				type: 'purchases/update',
				payload: updatedPurchase,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
}
