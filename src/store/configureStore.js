import {createStore, combineReducers } from 'redux';

import shelfReducer from '../reducers/shelfReducer';
import searchBookReducer from '../reducers/searchBookReducer';

export default () => {
    const store = createStore(
        combineReducers({
            searchBook: searchBookReducer,
            shelfs: shelfReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};