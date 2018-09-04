
export const createShelf = (shelf) => ({
    type: 'CREATE_SHELF',
    shelf
});

export const addBook = (shelf, book) => ({
    type: 'ADD_BOOK',
    shelf,
    book
});