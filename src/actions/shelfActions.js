
export const createShelf = (shelf) => ({
    type: 'CREATE_SHELF',
    shelf
});

export const deleteShelf = (id) => ({
    type: 'DELETE_SHELF',
    id
});

export const editShelf = (id, name) => ({
    type: 'EDIT_SHELF',
    id,
    name
});

export const addBook = (shelf, book) => ({
    type: 'ADD_BOOK',
    shelf,
    book
});

export const removeBook = (shelf, id) => ({
    type: 'REMOVE_BOOK',
    shelf,
    id
});