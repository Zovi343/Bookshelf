
const defaultState = [{
    name: 'Test',
    id: 56464,
    books: ['test']
}];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_SHELF':
            return [
                ...state,
                action.shelf
            ];
        default:
            return state;
    };
};