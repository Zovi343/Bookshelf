import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/main.scss';

import AppRouter from './routes/appRouter';
import { startSetShelfs } from './actions/shelfActions';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

store.dispatch(startSetShelfs()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});