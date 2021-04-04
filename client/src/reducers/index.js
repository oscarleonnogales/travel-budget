import { combineReducers } from 'redux';

import transactionsReducer from './transactions';
import currentIdReducer from './currentId';

export default combineReducers({
	transactions: transactionsReducer,
	currentId: currentIdReducer,
});
