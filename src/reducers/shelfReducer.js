
const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_SHELFS':
            return action.shelfs
        case 'CREATE_SHELF':
            return [
                ...state,
                action.shelf
            ];
        case 'DELETE_SHELF':
            return state.filter((shelf) => shelf.id !== action.id);
        case 'EDIT_SHELF':{
            let index = state.findIndex((shelf) => shelf.id === action.id);
            let newArr = [];
            // This needs to be done so objects in the array are not passed as a refrence and therefore component will rerender properly when the sate changes
            for(let i = 0; i < state.length; i++) {
                let newObj = Object.assign({}, state[i]);
                newArr.push(newObj);
            }
            newArr[index].name = action.name;
            return newArr;
        };
        case 'ADD_BOOK':{
            let index = state.findIndex((shelf) => shelf.id === action.id);
            let newArr = [];
            for(let i = 0; i < state.length; i++) {
                let newObj = Object.assign({}, state[i]);
                newArr.push(newObj);
            }
            newArr[index].books.push(action.book);
            return newArr;
        };
        case 'REMOVE_BOOK':{
            let index = state.findIndex((shelf) => shelf.id === action.shelfId);
            let newArr = [];
            for(let i = 0; i < state.length; i++) {
                let newObj = Object.assign({}, state[i]);
                newArr.push(newObj);
            };
            newArr[index].books = newArr[index].books.filter((book) => book.id !== action.bookId);
            return newArr;
        };
        default:
            return state;
    };
};