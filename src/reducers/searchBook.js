
const defaultState = {
    searchValue: null,
    results: []
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_SEARCH_VALUE':
            return Object.assign({}, state, { searchValue: action.value});
        case 'SET_SEARCH_RESULT':
            return Object.assign({}, state, {results: action.results});
        default: 
            return state;
    };
};