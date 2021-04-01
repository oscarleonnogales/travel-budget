import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Routes />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
