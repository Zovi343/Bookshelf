
const defaultState = {
    searchValue: null,
    searchValueBefore: null,
    results: [],
    currentBookId: null,
    currentBook: {},
    apiErr: null
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_SEARCH_VALUE':
            return Object.assign({}, state, { searchValue: action.value});
        case 'SET_SEARCH_VALUE_BEFORE':
            return Object.assign({}, state, { searchValueBefore: action.value});
        case 'UNSET_SEARCH_VALUE':
            return Object.assign({}, state, { searchValue: null});
        case 'UNSET_SEARCH_VALUE_BEFORE':
            return Object.assign({}, state, { searchValueBefore: null});
        case 'SET_SEARCH_RESULT':
            return Object.assign({}, state, {results: action.results});
        case 'UNSET_SEARCH_RESULT':
            return Object.assign({}, state, {results: []});
        case 'GET_BOOK_ID': 
            return Object.assign({}, state, {currentBookId: action.bookId});
        case 'GET_BOOK': 
            return Object.assign({}, state, {currentBook: action.book});
        case 'UNSET_BOOK_ID': 
            return Object.assign({}, state, {currentBookId: null});
        case 'UNSET_BOOK': 
            return Object.assign({}, state, {currentBook: {}});
        case 'API_ERR': 
            return Object.assign({}, state, {apiErr: 'We are sorry, but Goodreads services are not responding. Please try to reconnect later.'});
        default: 
            return state;
    };
};