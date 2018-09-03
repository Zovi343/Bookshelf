
const defaultState = {
    searchValue: null,
    results: [],
    currentBookId: null,
    currentBook: null
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_SEARCH_VALUE':
            return Object.assign({}, state, { searchValue: action.value});
        case 'SET_SEARCH_RESULT':
            return Object.assign({}, state, {results: action.results});
        case 'GET_BOOK_ID': 
            return Object.assign({}, state, {currentBookId: action.bookId});
        case 'GET_BOOK': 
            return Object.assign({}, state, {currentBook: action.book});
        default: 
            return state;
    };
};