
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
        case 'ADD_BOOK':
            const index = state.findIndex((shelf) => shelf.name === action.shelf);
            const newArr = [ ...state ];
            newArr[index].books.push(action.book);
            return newArr;
        default:
            return state;
    };
};