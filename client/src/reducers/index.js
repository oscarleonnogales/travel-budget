import { combineReducers } from 'redux';

import purchasesReducer from './purchases';
import currentIdReducer from './currentId';
import authReducer from './auth';

export default combineReducers({
	purchases: purchasesReducer,
	currentId: currentIdReducer,
	authData: authReducer,
});
