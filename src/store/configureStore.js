import {createStore, combineReducers } from 'redux';

import searchBookReducer from '../reducers/searchBook';

export default () => {
    const store = createStore(
        combineReducers({
            searchBook: searchBookReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}