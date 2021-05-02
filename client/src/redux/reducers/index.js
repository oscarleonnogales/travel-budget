import { combineReducers } from 'redux';

import purchasesReducer from './purchases';
import currentIdReducer from './currentId';
import authReducer from './auth';
import errorReducer from './error';
import currencyOptionsReducer from './currencyOptions';
import userSettingsReducer from './userSettings';

export default combineReducers({
	purchases: purchasesReducer,
	currentId: currentIdReducer,
	authData: authReducer,
	error: errorReducer,
	currencyOptions: currencyOptionsReducer,
	userSettings: userSettingsReducer,
});
