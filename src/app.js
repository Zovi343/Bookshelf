import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/main.scss';

import Header from './components/Header';
import SearchArea from './components/SearchArea';
import SearchResults from './components/SearchResults';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <div>
            <Header />
            <SearchArea />
            <SearchResults />
        </div>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));