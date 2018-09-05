
const defaultState = [
    {
        name: 'Test',
        id: '56464',
        books: [
            {
                id: "11506107",
                title: "Loki",
                author: "Mike Vasich"
            },{
                id: "30165203",
                title: "American Gods",
                author: "Neil Gaiman"
            }
        ]
    },{
        name: 'Some',
        id: '5646468468',
        books: []
    }
];



export default (state = defaultState, action) => {
    switch (action.type) {
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
            let index = state.findIndex((shelf) => shelf.name === action.shelf);
            let newArr = [];
            // This needs to be done so objects in the array are not passed as a refrence and therefore component will rerender properly when the sate changes
            for(let i = 0; i < state.length; i++) {
                let newObj = Object.assign({}, state[i]);
                newArr.push(newObj);
            }
            newArr[index].books.push(action.book);
            return newArr;
        };
        case 'REMOVE_BOOK':{
            let index = state.findIndex((shelf) => shelf.name === action.shelf);
            let newArr = [];
            // This needs to be done so objects in the array are not passed as a refrence and therefore component will rerender properly when the sate changes
            for(let i = 0; i < state.length; i++) {
                let newObj = Object.assign({}, state[i]);
                newArr.push(newObj);
            }
            newArr[index].books = newArr[index].books.filter((book) => book.id !== action.id);
            return newArr;
        };
        default:
            return state;
    };
};