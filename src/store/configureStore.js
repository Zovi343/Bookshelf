import { createStore, combineReducers,  applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import shelfReducer from '../reducers/shelfReducer';
import searchBookReducer from '../reducers/searchBookReducer';
import authReducer from '../reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            searchBook: searchBookReducer,
            shelfs: shelfReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};