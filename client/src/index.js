import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingPage from '../src/pages/LoadingPage/LoadingPage';

const persistConfig = {
	key: 'budget-app.state',
	storage,
	whitelist: ['authData'],
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducers, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={<LoadingPage />} persistor={persistor}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
