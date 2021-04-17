import { combineReducers } from 'redux';

import purchasesReducer from './purchases';
import currentIdReducer from './currentId';

export default combineReducers({
	purchases: purchasesReducer,
	currentId: currentIdReducer,
});
